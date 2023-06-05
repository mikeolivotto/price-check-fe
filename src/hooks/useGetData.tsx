import { useEffect, useState } from "react";
import { Hit, Response } from "../types/product-search-types";
import { replaceAmpersand } from "../helpers/string-helpers";

export const useGetData = (category: {
  name: string;
  total: number;
}): [Hit[] | null, boolean] => {

  const categoryName = replaceAmpersand(category.name, "%20%26%20");
  const pagesOfData = Math.ceil(category.total / 1000);
  // TO DO - max 12 pages of results returned from algolia, handle case when results exceed 12 pages
  const pagesToFetch = pagesOfData > 12 ? 12 : pagesOfData;

  const [returnedData, setReturnedData] = useState<Hit[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url =
      "https://vtvkm5urpx-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1);%20Browser%20(lite);%20instantsearch.js%202.10.5;%20JS%20Helper%20(2.28.0)&x-algolia-application-id=VTVKM5URPX&x-algolia-api-key=a0c0108d737ad5ab54a0e2da900bf040";

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

          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data: Response = await response.json();

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
