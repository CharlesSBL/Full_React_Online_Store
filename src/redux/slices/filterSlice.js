import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortName: {
    name: "Popularity",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
