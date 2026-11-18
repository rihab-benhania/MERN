import { createSlice } from '@reduxjs/toolkit';

/*const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
};*/
// 1. Chargement des articles sauvegardés depuis le localStorage au démarrage
const savedItems = JSON.parse(localStorage.getItem('techstore_cart')) || [];

const initialState = {
  items: savedItems,
  totalCount: savedItems.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: savedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  // Ajout du pourcentage de remise dans l'état initial
  discountPercent: 0,
};

// 2. Recalcul des totaux et sauvegarde systématique dans le localStorage
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  localStorage.setItem('techstore_cart', JSON.stringify(state.items));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // Grâce à Immer, la mutation directe produit un snapshot immuable
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
    },

    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      recalculateTotals(state);
    },

    // Nouveau reducer pour vérifier et appliquer le code promo
    applyPromoCode: (state, action) => {
      if (action.payload === 'POLY2027') {
        state.discountPercent = 20;
      } else {
        state.discountPercent = 0;
      }
    },
    // 3. Synchronisation du localStorage lors du vidage complet du panier
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      // Réinitialisation de la remise si le panier est vidé
      state.discountPercent = 0;
      localStorage.setItem('techstore_cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;