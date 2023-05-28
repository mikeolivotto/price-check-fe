import { useState, useEffect } from "react";
import "./App.css";
import { Hit, Response } from "./types/types";
import { ResultsGrid } from "./components/ResultsGrid";

function App() {
  const [returnedData, setReturnedData] = useState<Hit[] | null>(null);

  useEffect(() => {
    const url =
      "https://vtvkm5urpx-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1);%20Browser%20(lite);%20instantsearch.js%202.10.5;%20JS%20Helper%20(2.28.0)&x-algolia-application-id=VTVKM5URPX&x-algolia-api-key=a0c0108d737ad5ab54a0e2da900bf040";

    const fetchData = async () => {
      try {
        const responseData: Hit[] = [];

        // max 12 pages of results returned from algolia
        for (let i = 0; i <= 12; i++) {
          const requestBody = {
            requests: [
              {
                indexName: "shopify_products_price_asc",
                params: `hitsPerPage=1000&page=${i}&filters="category_hierarchy":"Vinyl" AND (price > 0 AND product_published = 1 AND availability.displayProduct = 1)&facets=["facets.Price","facets.Category","facets.Brand"]&tagFilters=`,
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

        console.log(responseData);
        setReturnedData(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App" style={{ height: "85vh", width: "100%" }}>
      <h1>JB Price checker</h1>
      <ResultsGrid data={returnedData} />
    </div>
  );
}

export default App;
