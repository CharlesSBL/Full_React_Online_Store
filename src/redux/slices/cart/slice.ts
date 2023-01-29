import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { RootState } from "../../store";
import { CartItem, CartSliceState } from "./types";

// wyciaga objekty z localStorage
const { items, totalPrice } = getCartFromLS();

// Realizacja koszyka
// wsadza z pamieci danne
const initialState: CartSliceState = {
  totalPrice,
  items,
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

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => {
        return obj.id != action.payload;
      });

      const allSum = state.items.reduce((acc, obj) => {
        return obj.price * obj.count + acc;
      }, 0);

      state.totalPrice = allSum;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => {
        return obj.id == action.payload;
      });
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
