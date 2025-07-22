import {connectDB, initializeDefaultDB} from '../db/index.js'
import express from 'express';
import shoppingListModel from "../db/model/shopping-list.model.js";
import mongoose from 'mongoose'
import isIdValid from "./routine/idValidation.routine.js";
import cors from 'cors';

const app = express()
const port = 8080

app.use(express.json());
app.use(cors());

connectDB().then(async () => {
    await initializeDefaultDB()
});


//Shopping list
app.get('/shopping-list', async (req, res) => {
    const lists = await shoppingListModel.find({}, 'name _id');
    console.log(lists);
    res.send(lists);
})

app.get('/shopping-list/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    const list = await shoppingListModel.findById(req.params.id);
    if (list) {
        res.send(list);
    } else {
        res.status(404).json({error: 'Shopping list not found'});
    }
});

app.post('/shopping-list', async (req, res) => {
    const exists = await shoppingListModel.findOne({ name: req.body.name });
    if (exists) return res.status(400).json({ error: 'Name already exists' });

    const list = await shoppingListModel.create({
        name: req.body.name,
        items: []
    });
    if (list) {
        res.status(201).send('Shopping list created');
    } else {
        res.status(500).json({error: 'Shopping list not created, internal error'});
    }
});

app.patch('/shopping-list/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    if (!req.body) {
        res.status(400).json({error: 'Invalid body'});
    }

    const list = await shoppingListModel.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});
    if (list) {
        res.status(204).send('Shopping list updated');
    } else {
        res.status(404).json({error: 'Shopping list not found'});
    }
});

app.delete('/shopping-list/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    const list = await shoppingListModel.findByIdAndDelete(req.params.id);
    if (list) {
        res.status(204).send('Shopping list deleted');
    } else {
        res.status(404).json({error: 'Shopping list not found'});
    }
});


//Items

app.get('/shopping-list/:id/items', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    const list = await shoppingListModel.findById(req.params.id);
    if (list) {
        res.send(list.items);
    } else {
        res.status(404).json({error: 'Shopping list not found'});
    }
});

app.post('/shopping-list/:id/items', async (req, res) => {
    if (!isIdValid(req.params.id, res)) {
        return res.status(404).json({ error: 'Wrong ID' });
    }

    const item = req.body.item;

    if (!item || typeof item.name !== 'string') {
        return res.status(400).json({ error: 'Invalid item format' });
    }

    const duplicate = await shoppingListModel.findOne({
        _id: req.params.id,
        'items.name': item.name,
    });

    if (duplicate) {
        return res.status(400).json({ error: 'Item already exists' });
    }

    const result = await shoppingListModel.updateOne(
        { _id: req.params.id },
        { $addToSet: { items: item } }
    );

    if (result.modifiedCount > 0) {
        return res.status(201).send('Item added to shopping list');
    } else {
        return res.status(404).json({ error: 'Shopping list not found' });
    }
});


app.delete('/shopping-list/:id/items/:item_id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.item_id)) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    await shoppingListModel.updateOne(
        {_id: req.params.id},
        {$pull: {items: {_id: req.params.item_id}}}
    ).then(result => {
        if (result.modifiedCount > 0) {
            res.status(204).send('Shopping item deleted');
            console.log('Shopping item deleted');
        } else {
            res.status(404).json({error: 'Shopping item not found'});
        }
    });
});
/*
app.patch('/shopping-list/:id/items/:item_id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.item_id) ) {
        res.status(400).json({error: 'Invalid ID format'});
        return;
    }
    if (!req.body) {
        res.status(400).json({error: 'Invalid body'});
    }

    const list = await shoppingListModel.findById(req.params.id);


    const updated = await list.items.updateOne({_id: req.params.id}, {$set: {name: req.body.name}});
    if (list) {
        res.status(204).send('Shopping list updated');
    } else {
        res.status(404).json({error: 'Shopping list not found'});
    }
});
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
