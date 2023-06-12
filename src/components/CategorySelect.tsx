import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCategoryData } from "../hooks/useCategoryData";

export const CategorySelect = () => {
  const {
    categories: categoryData,
    selectedCategory,
    setSelectedCategory,
  } = useCategoryData();

  const categories = categoryData ? Object.keys(categoryData).sort() : [];

  const handleChange = (event: SelectChangeEvent) => {
    const categoryName = event.target.value;
    const total = categoryData ? categoryData[categoryName] : 0;
    setSelectedCategory(categoryName, total);
  };

  return (
    <FormControl sx={{ m: "10px", minWidth: 200 }} size="small">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory?.name || ""}
        label="Category"
        onChange={handleChange}
        displayEmpty
        size="small"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
