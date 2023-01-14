import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Sort = {
  name: string;
  // ukazujemy ze w tym miejscu moze byc jedynie 1dno z tych znaczen
  sort: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortName: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sortName: {
    name: "Popularity",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sortName = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    //tutaj beda podawane wszystkie danne z kontyneru dlatego jego typ uzywamy
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortName = action.payload.sortName;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sortName;
export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
