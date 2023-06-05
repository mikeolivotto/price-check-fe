import { useEffect, useState } from "react";
import { CategorySearchResponse } from "../types/categories-search-types";
import { SEARCH_URL } from "../variables";
import { FacetsCategory } from "../types/product-search-types";

export const useGetCategories = () => {
  const [returnedData, setReturnedData] = useState<FacetsCategory>({});

  useEffect(() => {

    const fetchData = async () => {
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

        setReturnedData(categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };
     fetchData();
  }, []);

  return [returnedData];
};
