import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Itemu ktore wsadzamy, pizze
export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

// Koszyk w ktorym je wsadzamy i liczymy summe
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

// Realizacja koszyka
const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return obj.id == action.payload.id;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => {
        return obj.id != action.payload;
      });
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id == action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Dostaje z "globalnego kontynera" jakis "kontyner"
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id == id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
