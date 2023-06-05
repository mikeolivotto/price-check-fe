import { useEffect, useState } from "react";
import { Hit, ProductSearchResponse } from "../types/product-search-types";
import { replaceAmpersand } from "../helpers/string-helpers";
import { SEARCH_URL } from "../variables";

export const useGetData = (category: {
  name: string;
  total: number;
}): [Hit[] | null, boolean] => {
  const [returnedData, setReturnedData] = useState<Hit[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoryName = replaceAmpersand(category.name, "%20%26%20");
    const pagesOfData = Math.ceil(category.total / 1000);
    // TO DO - max 12 pages of results returned from algolia, handle case when results exceed 12 pages
    const pagesToFetch = pagesOfData > 12 ? 12 : pagesOfData;

    setLoading(true);

    const fetchData = async () => {
      try {
        const responseData: Hit[] = [];

        for (let i = 0; i <= pagesToFetch; i++) {
          const requestBody = {
            requests: [
              {
                indexName: "shopify_products_price_asc",
                params: `hitsPerPage=1000&page=${i}&filters="category_hierarchy":"${categoryName}" AND (price > 0 AND product_published = 1 AND availability.displayProduct = 1)&facets=["facets.Price","facets.Category","facets.Brand"]&tagFilters=`,
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

          const data: ProductSearchResponse = await response.json();

          data.results.forEach((result) => {
            result.hits.forEach((hit) => {
              responseData.push(hit);
            });
          });
        }
        setReturnedData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [category]);

  return [returnedData, loading];
};
