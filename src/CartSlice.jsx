import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        // Runtime validation
        if (
            !action.payload ||
            typeof action.payload !== 'object' ||
            !('name' in action.payload) ||
            !('cost' in action.payload)
        ) {
            console.error('Invalid payload for addItem:', action.payload);
            return state; // Skip update if invalid
        }

        const itemToAdd = action.payload;
        const existingItem = state.items.find(item => item.name === itemToAdd.name);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
            state.items.push({
                ...itemToAdd,
                quantity: 1, // Default quantity
            });
        }

    },
    removeItem: (state, action) => {
        // Runtime validation
        if (
            !action.payload ||
            typeof action.payload !== 'object' ||
            !('name' in action.payload) ||
            !('cost' in action.payload)
        ) {
            console.error('Invalid payload for RemoveItem:', action.payload);
            return state; // Skip update if invalid
        }

        const itemToRemoveName =action.payload.name;
        state.items = state.items.filter(item => item.name !== itemToRemoveName );
        
    },
    updateQuantity: (state, action) => {
        if (
            !action.payload ||
            typeof action.payload !== 'object' ||
            !('name' in action.payload) ||
            !('quantity' in action.payload)
        ) {
            console.error('Invalid payload for updateQuantity:', action.payload);
            return state; // Skip update if invalid
        }

        const {name: itemName, quantity: newQuantity} = action.payload;
        const itemToUpdate = state.items.find(item => item.name ===itemName);
        if(itemToUpdate && newQuantity >= 0){
            itemToUpdate.quantity = newQuantity;
        }
        
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Memoized selector (re-runs ONLY if dependencies change)
export const selectCartItemByName = createSelector(
  [state => state.cart.items, (state, name) => name],
  (items, name) => items.find(item => item.name === name)
);

// Selector to calculate total items
export const selectTotalItems = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default CartSlice.reducer;
