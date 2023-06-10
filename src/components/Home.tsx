import { useState } from "react";
import { ResultsGrid } from "./ResultsGrid";
import { useGetCategories } from "../hooks/useGetCategories";
import { CategorySelect } from "./CategorySelect";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const [category, setCategory] = useState<{
    name: string;
    total: number;
  } | null>(null);
  const [categoryData] = useGetCategories();

  return (
    <div className="App" style={{ height: "75vh", width: "100%" }}>
      <Typography
        component="h1"
        variant="h2"
        noWrap
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        Price checker
      </Typography>
      <Typography component="p">
        Select a product category and discover savings
      </Typography>
      <CategorySelect categoryData={categoryData} setCategory={setCategory} />

      {category && <ResultsGrid category={category} />}
    </div>
  );
};

export default Home;

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