import { useState, useEffect } from "react";
import "./App.css";
// import { data } from "./test-object";
import { Response } from "./types/types";
import { ResultsGrid } from "./components/ResultsGrid";

function App() {
  const [returnedData, setReturnedData] = useState<Response | null>(null);

  useEffect(() => {
    const url =
      "https://vtvkm5urpx-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1);%20Browser%20(lite);%20instantsearch.js%202.10.5;%20JS%20Helper%20(2.28.0)&x-algolia-application-id=VTVKM5URPX&x-algolia-api-key=a0c0108d737ad5ab54a0e2da900bf040";

    const data = {
      requests: [
        {
          indexName: "shopify_products_price_asc",
          params: `hitsPerPage=1000&page=1&filters="facets.Category": "Vinyl" AND ("facets.Primary Format - Movies/TV": "Blu-Ray" OR "facets.Primary Format - Movies/TV": "3D Blu-Ray") AND (price > 0 AND product_published = 1 AND availability.displayProduct = 1)&facets=["facets.Price","facets.Category","facets.Brand"]&tagFilters=`,
        },
      ],
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Response) => {
        setReturnedData(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [])

  const loading = !returnedData;

  return (
    <div className="App">
      {loading && <p>loading...</p>}
      {!loading && <ResultsGrid data={returnedData} />}
    </div>
  );
}

export default App;
