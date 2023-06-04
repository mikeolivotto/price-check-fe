import { useState } from "react";
import "./App.css";
import { ResultsGrid } from "./components/ResultsGrid";
import { useGetCategories } from "./hooks/useGetCategories";
import { CategorySelect } from "./components/CategorySelect";

function App() {
  const [category, setCategory] = useState<{name: string, total: number} | null>(null);


  const [categoryData] = useGetCategories();

  return (
    <div className="App" style={{ height: "85vh", width: "100%" }}>
      <h1>JB Price checker</h1>
      <CategorySelect categoryData={categoryData} setCategory={setCategory} />
      {category && <ResultsGrid category={category} />}
    </div>
  );
}

export default App;
