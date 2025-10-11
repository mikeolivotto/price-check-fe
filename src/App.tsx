import "./App.css";

import { ResultsGrid } from "./components/ResultsGrid";
import { Header } from "./components/Header";
import { CategorySelect } from "./components/CategorySelect";
import { useCategoryData } from "./hooks/useCategoryData";
import { Stack } from "@mui/material";

function App() {
  const { selectedCategory } = useCategoryData();
  return (
    <Stack className="App" height="100vh" style={{ width: "100%" }}>
      <Header />

      <CategorySelect />

      {selectedCategory && (
        <Stack sx={{ flex: 1, overflow: "hidden" }}>
          <ResultsGrid category={selectedCategory} />
        </Stack>
      )}
    </Stack>
  );
}

export default App;

// FEATURE IDEA + IMPROVEMENTS
// progess bar on fetches?
// not all categories are showing (eg electric bikes). Figure out why
// onPromotion facet allows to show current specials
// - Hook into Amazon API to compare price
// - multi-select categories
// - download as csv
// - Prevent re-fetching data if switching between categories and back again
// - handle case when results exceed 12 pages

// CATEGORIES
// when going into a top-level category page, the network request shows a range of subcategories (can be seen in the filter at the top left of the results)
