import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productReducer, { productFetch } from './features/ProductSlice';
import { productsApi } from './features/productsApi.js';
import cartReducer, { cartTotal } from './features/cartSlice.js';
import authReducer, { loadUser } from './features/authSlice.js';

const arkStore = configureStore({
  reducer:{
    products:productReducer,
    cart:cartReducer,
    auth:authReducer,
    [productsApi.reducerPath]:productsApi.reducer,
    
  },
  middleware:(getDefaultMiddleware)=>(
    getDefaultMiddleware().concat(productsApi.middleware)
  )
})

arkStore.dispatch(productFetch());
arkStore.dispatch(cartTotal());
arkStore.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={arkStore}>
    <App />
  </Provider>
  </React.StrictMode>,
);


