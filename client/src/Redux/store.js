//  import {createSlice,configureStore } from '@reduxjs/toolkit';
//  const slice =  createSlice({
//     name :'auth',
//     initialState:{
//         isLogin :false,
//     },
//     reducers:{
//         login(state){
//             state.isLogin=true;
//         },
//         logout(state){
//             state.isLogin =false;
//         },
//     },
//  });
//  export const  authActions = slice.actions;
//  export const store = configureStore({
//     reducer: slice.reducer,
//  });

import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});
export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});