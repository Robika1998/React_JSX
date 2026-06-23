import axios from "axios";

const API_BASE = "https://dummyjson.com";

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_BASE}/products`, {
    params: { limit: 24 },
  });
  return data.products;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/products/${id}`);
  return data;
};
