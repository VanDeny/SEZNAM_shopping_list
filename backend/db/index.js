import mongoose from 'mongoose';
import ShoppingListModel from "./model/shopping-list.model.js";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/nakupni-seznam');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

export async function initializeDefaultDB() {
    if (await ShoppingListModel.countDocuments() === 0) {
        await ShoppingListModel.create({
            name: 'Default shopping list',
            items: []
        });
        console.log('Created default shopping list');
    } else {
        console.log('Shopping list detected, skipped creating Default shopping list');
    }
}