import { createSlice } from '@reduxjs/toolkit';

//! Initial State
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('')) || null,
  },

  //! 1. Reducers
  reducers: {
    //! Login Actions
    loginActions: (state, action) => {
      state.user = action.payload;
    },
    //! Logout Actions
    logoutActions: (state, action) => {
      state.user = null;
    },
  },
});

//! Generate Actions
export const { loginActions, logoutActions } = authSlice.actions;

//! Generate The Reducers
const authReducer = authSlice.reducer;
export default authReducer;
