import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortFirst: {
    title: "Популярности",
    sort: "rating",
  },
  searchValue: "",
  paginate: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    changeSortType(state, action) {
      state.sortFirst = action.payload;
    },
    changeSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    paginate(state, action) {
      state.paginate = action.payload;
    },
    setFiltersParams(state, action) {
      state.paginate = Number(action.payload.paginate);
      state.categoryId = Number(action.payload.filter);
      state.sortFirst = action.payload.sorting;
    },
  },
});

export const {
  changeCategory,
  changeSortType,
  changeSearchValue,
  paginate,
  setFiltersParams,
} = filterSlice.actions;

export default filterSlice.reducer;
