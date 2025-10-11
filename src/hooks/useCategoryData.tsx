import { create } from "zustand";
import { FacetsCategory, Hit } from "../types/product-search-types";
import { CategorySearchResponse } from "../types/categories-search-types";
import { SEARCH_URL } from "../constants";

export const fetchCategoryData = async () => {
  const requestBody = {
    requests: [
      {
        indexName: "shopify_products_families_price_asc",
        params: `hitsPerPage=0&facets=["facets.Category"]&filters=(price > 0 AND product_published = 1 AND availability.displayProduct = 1)`,
      },
    ],
  };

  const response = await fetch(SEARCH_URL, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Something went wrong (Status: ${response.status})`);
  }

  const data: CategorySearchResponse = await response.json();
  const categories = data.results[0].facets["facets.Category"];
  return categories;
};

export type SelectedCategory = {
  name: string;
  total: number;
};

interface CategoriesState {
  categories: FacetsCategory | undefined;
  selectedCategory?: SelectedCategory;
  selectedCategoryProducts: Hit[] | null;
  error: string | null;
  fetchCategories: () => void;
  setSelectedCategory: (categoryName: string, total: number) => void;
}

export const useCategoryData = create<CategoriesState>((set) => ({
  categories: undefined,
  selectedCategory: undefined,
  selectedCategoryProducts: null,
  error: null,
  fetchCategories: async () => {
    try {
      set({ error: null });
      const response = await fetchCategoryData();
      set({ categories: response });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({
        error: "An unexpected error occurred while fetching categories.",
        categories: undefined,
      });
    }
  },
  setSelectedCategory: (categoryName: string, total: number) => {
    const category = {
      name: categoryName,
      total,
    };
    set({ selectedCategory: category });
  },
}));
