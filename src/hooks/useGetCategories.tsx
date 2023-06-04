import { useEffect, useState } from "react";
import { FacetsCategory, Root } from "../types/categories-search-types";

export const useGetCategories = () => {
  const [returnedData, setReturnedData] = useState<FacetsCategory>({});

  useEffect(() => {
    const url =
      "https://vtvkm5urpx-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1);%20Browser%20(lite);%20instantsearch.js%202.10.5;%20JS%20Helper%20(2.28.0)&x-algolia-application-id=VTVKM5URPX&x-algolia-api-key=a0c0108d737ad5ab54a0e2da900bf040";

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

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data: Root = await response.json();

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
