import { useState } from "react";
import "./App.css";
import { ResultsGrid } from "./components/ResultsGrid";
import { useGetCategories } from "./hooks/useGetCategories";
import { CategorySelect } from "./components/CategorySelect";

function App() {
  const [category, setCategory] = useState<{name: string, total: number} | null>(null);
  const [categoryData] = useGetCategories();

  return (
    <div className="App" style={{ height: "75vh", width: "100%" }}>
      <h1>JB Price checker</h1>
      <CategorySelect categoryData={categoryData} setCategory={setCategory} />
      {category && <ResultsGrid category={category} />}
    </div>
  );
}

export default App;

// FEATURE IDEA + IMPROVEMENTS:
// - Styling
// - download as csv
// - Prevent re-fetching data if switching between categories and back again
// - Do not display EAN + Model by default, only with search params or selecting some secret spot
// - handle case when results exceed 12 pages