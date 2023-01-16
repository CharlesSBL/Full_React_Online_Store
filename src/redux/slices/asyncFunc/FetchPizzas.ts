import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type FetchPizzasArgs = Record<string, string>;
export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
// klucz - znaczenie
// klucz pisze sie uppercase gdy znaczenie z malej
export enum Status {
  LOADING = "loading",
  ERROR = "error",
  SUCCES = "success",
}
export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
export const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs, thunkApi) => {
    const { category, order, sortBy, search, currentPage } = params;

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    // ukzujemy zeby zwracal data jako (CartItem[])
    const { data } = await axios.get<Pizza[]>(URL);

    if (data.length == 0) {
      return thunkApi.rejectWithValue("Pizzas are empty");
    }

    return thunkApi.fulfillWithValue(data);
  }
);
