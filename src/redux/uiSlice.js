import { createSlice } from '@reduxjs/toolkit';

// 1. État initial des notifications
const initialState = {
  message: '',
  visible: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 2. Action pour afficher la notification avec un texte dynamique
    showToast: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    // 3. Action pour masquer la notification
    hideToast: (state) => {
      state.visible = false;
      state.message = '';
    },
  },
});

// 4. Exportation des actions et du reducer
export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
