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
