import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getProducts = (params?: object) =>
  API.get("/products", { params });
export const getProductById = (id: string) => API.get(`/products/${id}`);
export const getCategories = () => API.get("/products/categories");

export const getCart = (sessionId: string) => API.get(`/cart/${sessionId}`);
export const addToCart = (data: {
  sessionId: string;
  productId: string;
  quantity: number;
}) => API.post("/cart", data);
export const updateCartItem = (
  sessionId: string,
  productId: string,
  quantity: number,
) => API.put(`/cart/${sessionId}/item/${productId}`, { quantity });
export const removeCartItem = (sessionId: string, productId: string) =>
  API.delete(`/cart/${sessionId}/item/${productId}`);

export const checkout = (sessionId: string) =>
  API.post("/checkout", { sessionId });
