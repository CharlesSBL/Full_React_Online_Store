import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "./cart/types";
import {
  fetchPizzas,
  initialState,
  Pizza,
  Status,
} from "./asyncFunc/FetchPizzas";

// {// Jesli mamy np wszystkie pola takie same mozna uzyc takiego sposobu
// // ukazujemy ze nazwa pola to (string) i jego value tez jest (string)
// type FetchPizzasArgs = Record<string, string>;

// type Pizza = {
//   id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   sizes: number[];
//   types: number[];
// };

// // klucz - znaczenie
// // klucz pisze sie uppercase gdy znaczenie z malej
// export enum Status {
//   LOADING = "loading",
//   ERROR = "error",
//   SUCCES = "success",
// }

// interface PizzaSliceState {
//   items: Pizza[];
//   status: Status;
// }

// const initialState: PizzaSliceState = {
//   items: [],
//   status: Status.LOADING,
// };

// // pozwala uzywac asynchronne actions
// // ukazujemy w (<>) typy dannych ktore beda przyjmowane i zwracane
// export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
//   "pizza/fetchPizzasStatus",
//   async (params: FetchPizzasArgs, thunkApi) => {
//     const { category, order, sortBy, search, currentPage } = params;

//     const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

//     // ukzujemy zeby zwracal data jako (CartItem[])
//     const { data } = await axios.get<Pizza[]>(URL);

//     if (data.length == 0) {
//       return thunkApi.rejectWithValue("Pizzas are empty");
//     }

//     return thunkApi.fulfillWithValue(data);
//   }
// );}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
