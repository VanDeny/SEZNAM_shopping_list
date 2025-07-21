import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: String,
    // quantity: Number,
    // bought: Boolean,
});

const ShoppingListSchema = new mongoose.Schema({
    name: {type: String, required: true},
    items: [ItemSchema],
})

const ShoppingList = mongoose.model('ShopppingList', ShoppingListSchema);
export default ShoppingList;