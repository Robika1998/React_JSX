import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "all",
  sort: "featured",
  page: 1,
  perPage: 8,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setSort(state, action) {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.category = "all";
      state.sort = "featured";
      state.page = 1;
    },
  },
});

export const { setSearch, setCategory, setSort, setPage, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
