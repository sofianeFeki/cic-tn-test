import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  userInfo: null,
  error: null,
  products: [],
  filters: {
    brand: [],
    category: [],
    color: [],
    subCategory: [],
  },
  viewMode: 'grid', // default view mode
};

export const orebiSlice = createSlice({
  name: 'orebi',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email } = action.payload;
      state.userInfo = { uid, email };
    },
    setError: (state, action) => {
      state.error = action.payload;
      toast.error(action.payload);
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      toast.success('Product added to cart');
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      toast.error('Product removed from cart');
    },
    resetCart: (state) => {
      state.products = [];
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    toggleFilter: (state, action) => {
      const { filterType, filterValue } = action.payload;
      const filterList = state.filters[filterType];

      if (filterList.includes(filterValue)) {
        state.filters[filterType] = filterList.filter(
          (value) => value !== filterValue
        );
      } else {
        state.filters[filterType].push(filterValue);
      }
    },
    setFilter: (state) => {
      state.filters = initialState.filters;
    },
    removeFilter: (state, action) => {
      const { filterType, filterValue } = action.payload;
      state.filters[filterType] = state.filters[filterType].filter(
        (value) => value !== filterValue
      );
    },
  },
});

export const {
  setUser,
  setError,
  clearUser,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  toggleViewMode,
  setViewMode,
  toggleFilter,
  setFilter,
  removeFilter,
} = orebiSlice.actions;

export default orebiSlice.reducer;
