import "./App.css";
import { useCategoryData } from "./hooks/useCategoryData";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { CategorySelect } from "./components/CategorySelect";
import { ResultsGrid } from "./components/ResultsGrid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

function App() {
  const { selectedCategory, categories, fetchCategories } = useCategoryData();
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const params = useParams();
  return (
    <div className="App" style={{ height: "75vh", width: "100%" }}>
      <AppBar position="static" sx={{ mr: 2}}>
        <Toolbar variant="dense">
          <PriceChangeIcon fontSize="large" sx={{ mr: 2}} />
          <Typography variant="h6" component="div">
            Price Checker
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography component="p" sx={{ mt: "10px" }} color="secondary">
        Select a product category and discover savings
      </Typography>
      {categories && <CategorySelect />}

      {selectedCategory && <ResultsGrid category={selectedCategory} />}
    </div>
  );
}

export default App;

// FEATURE IDEA + IMPROVEMENTS
// progess bar on fetches?
// not all categories are showing (eg electric bikes). Figure out why
// onPromotion facet allows to show current specials
// - Hook into Amazon API to compare price
// - Discogs auto search on hover EAN/Cat No.: `https://www.discogs.com/search/ac?searchType=all&q=%{EAN}&type=a_m_r_13`
//   ^ need to run in an express server due to CORS
// - React router - allow URL params (eg to direct link to a category type)
// - multi-select categories
// - download as csv
// - Prevent re-fetching data if switching between categories and back again
// - Do not display EAN + Model by default, only with search params or selecting some secret spot
// - handle case when results exceed 12 pages

// CATEGORIES
// when going into a top-level category page, the network request shows a range of subcategories (can be seen in the filter at the top left of the results)
