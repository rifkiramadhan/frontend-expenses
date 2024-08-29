import { createSlice } from '@reduxjs/toolkit';

//! Initial State
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
  },

  //! 1. Reducers
  reducers: {
    //! Login Action
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //! Logout Action
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//! Generate Actions
export const { loginAction, logoutAction } = authSlice.actions;

//! Generate The Reducers
const authReducer = authSlice.reducer;
export default authReducer;
