import { Stack, Typography } from "@mui/material";
import { CategoryDropdown } from "./CategoryDropdown";
import { useCategoryData } from "../../hooks/useCategoryData";
import { useEffect } from "react";

interface CategorySelectProps {
  isExpanded?: boolean;
}

export const CategorySelect = ({ isExpanded = false }: CategorySelectProps) => {
  const { categories, error, fetchCategories } = useCategoryData();
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Stack
      sx={{
        flexShrink: 0,
        padding: 2,
        flex: isExpanded ? 1 : 0,
        justifyContent: "center" ,
        alignItems: "center",
        transition: "all 0.3s ease",
      }}
    >
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
    </Stack>
  );
};
