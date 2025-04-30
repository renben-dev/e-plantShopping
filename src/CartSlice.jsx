import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const itemToAdd = action.payload;
        const existingItem = state.items.find(item => item.name === itemToAdd.name);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
            state.items.push({
                ...itemToAddm,
                quantity: 1, // Default quantity
            });
        }

    },
    removeItem: (state, action) => {
    },
    updateQuantity: (state, action) => {

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
