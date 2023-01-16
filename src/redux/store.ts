import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filter/slice";
import cart from "./slices/cart/slice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

// tworzy typ danncyh dla naszego calego "chraniliszia"
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
