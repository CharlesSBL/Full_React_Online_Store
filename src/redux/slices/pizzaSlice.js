import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// pozwala uzywac asynchronne actions
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { category, order, sortBy, search, currentPage } = params;

    const URL = `https://639f1d625eb8889197f4b7be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    const { data } = await axios.get(URL);

    if (data.length == 0) {
      return thunkApi.rejectWithValue("Pizzas are empty");
    }

    return thunkApi.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // podczas wypelniania kodu
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    // ukazujemy ze jesli sie wypelni kod dobrze (.fulfilled) to ma wypelnic nestepujacy kod
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    // jesli sie nie wypelni
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza;

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
