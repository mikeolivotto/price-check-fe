import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useCategoryData } from "./hooks/useCategoryData";
import { useEffect } from "react";

function App() {
  const { fetchCategories } = useCategoryData();
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Home />}>
        <Route path=":categoryName" element={<Home />} />
      </Route>
      <Route path="contact" element={"howdy"} />
    </Routes>
  );
}

export default App;

// FEATURE IDEA + IMPROVEMENTS
// set up a zustand store so selected categories and fetched data can be stored
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
