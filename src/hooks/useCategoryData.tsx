import { create } from "zustand";
import { FacetsCategory, Hit } from "../types/product-search-types";
import { CategorySearchResponse } from "../types/categories-search-types";
import { SEARCH_URL } from "../variables";

export const fetchCategoryData = async () => {
  try {
    const requestBody = {
      requests: [
        {
          indexName: "shopify_products_price_asc",
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

    const data: CategorySearchResponse = await response.json();
    const categories = data.results[0].facets["facets.Category"];
    return categories;

  } catch (error) {
    console.error("Error:", error);
    return undefined;
  }
};

export type SelectedCategory = {
  name: string;
  total: number;
}

interface State {
  categories: FacetsCategory | undefined;
  selectedCategory?: SelectedCategory
  selectedCategoryProducts: Hit[] | null;
  fetchCategories: () => void;
  setSelectedCategory: (categoryName: string, total: number) => void;
}

export const useCategoryData = create<State>((set, get) => ({
  categories: undefined,
  selectedCategory: undefined,
  selectedCategoryProducts: null,
  fetchCategories: async () => {
    const response = await fetchCategoryData();
    set({ categories: response });
  },
  setSelectedCategory: (categoryName: string, total: number) => {
    const category = {
      name: categoryName,
      total,
    };
    set({ selectedCategory: category });
  },
}));
