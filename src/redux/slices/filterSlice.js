import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 55,
  sort: {
    name: "Popularity",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId } = counterSlice.actions;

export default counterSlice.reducer;

// 12:45
