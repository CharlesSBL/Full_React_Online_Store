import { RootState } from "../../store";

// Dostaje z "globalnego kontynera" jakis "kontyner"
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id == id);
