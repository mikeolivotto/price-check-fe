import { Box, Typography } from "@mui/material";
import { CategoryDropdown } from "./CategoryDropdown";
import { useCategoryData } from "../../hooks/useCategoryData";
import { useEffect } from "react";

export const CategorySelect = () => {
  const { categories, error, fetchCategories } = useCategoryData();
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box border={1} sx={{ flexShrink: 0 }}>
      {categories && (
        <>
          <Typography component="p" sx={{ mt: "10px" }}>
            Select a product category and discover savings
          </Typography>
          <CategoryDropdown />
        </>
      )}
      {error && (
        <Typography component="p" sx={{ mt: "10px" }} color="secondary">
          Oops! Something went wrong!
        </Typography>
      )}
    </Box>
  );
};
