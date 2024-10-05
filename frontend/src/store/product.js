import { create } from "zustand"; // zusand is a state management library

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  //Create product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },

  //fetchProduct
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  //delete product
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //update ui immediately
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: data.message };
  },

  //update product
  updateProduct: async (id, updateProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    //update ui immediately
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
