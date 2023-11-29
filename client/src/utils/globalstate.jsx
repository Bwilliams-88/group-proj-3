//src/utils/global.jsx
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const CartContext = createContext();
const { Provider } = CartContext;

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}

const EventProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { EventProvider, useCartContext };