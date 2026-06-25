import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../../api/productsApi";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProducts();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load products");
    }
  },
);

export const loadProductById = createAsyncThunk(
  "products/loadProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchProductById(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load product");
    }
  },
);
