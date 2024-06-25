import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: null,
  error: null,
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
  checkedColors: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email } = action.payload;
      state.userInfo = { uid, email };
    },
    setError: (state, action) => {
      state.error = action.payload;
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
      toast.success("Product added to cart");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
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
      toast.error("Product removed from cart");
    },
    resetCart: (state) => {
      state.products = [];
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    toggleColor: (state, action) => {
      const color = action.payload;
      const isColorChecked = state.checkedColors.some(
        (b) => b._id === color._id
      );

      if (isColorChecked) {
        state.checkedColors = state.checkedColors.filter(
          (b) => b._id !== color._id
        );
      } else {
        state.checkedColors.push(color);
      }
    },
  },
});

export const {
  setUser,
  setError,
  clearUser,
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
  toggleColor,
} = orebiSlice.actions;
export default orebiSlice.reducer;
