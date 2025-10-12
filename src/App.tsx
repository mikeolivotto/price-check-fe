import "./App.css";

import { ResultsGrid } from "./components/ResultsGrid";
import { Header } from "./components/Header";
import { CategorySelect } from "./components/CategorySelect";
import { useCategoryData } from "./hooks/useCategoryData";
import { Stack } from "@mui/material";

function App() {
  const { selectedCategory } = useCategoryData();
  return (
    <Stack
      className="App"
      sx={{
        height: "100dvh",
        width: "100%",
      }}
    >
      <Header />

      <CategorySelect isExpanded={!selectedCategory} />

      {selectedCategory && (
        <Stack sx={{ flex: 1, overflow: "hidden" }}>
          <ResultsGrid category={selectedCategory} />
        </Stack>
      )}
    </Stack>
  );
}

export default App;
