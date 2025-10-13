import "./App.css";

import { ResultsGrid } from "./components/ResultsGrid";
import { Header } from "./components/Header";
import { CategorySelect } from "./components/CategorySelect";
import { useCategoryData } from "./hooks/useCategoryData";
import { Stack } from "@mui/material";

function App() {
  const { selectedCategory } = useCategoryData();
  return (
    <Stack className="App" style={{ height: "100dvh", width: "100%" }}>
      <Header />

      <CategorySelect isExpanded={!selectedCategory} />

      {selectedCategory && <ResultsGrid category={selectedCategory} />}
    </Stack>
  );
}

export default App;
