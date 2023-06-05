import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction, useState } from "react";
import { FacetsCategory } from "../types/product-search-types";

type Props = {
  categoryData: FacetsCategory;
  setCategory: Dispatch<SetStateAction<{ name: string; total: number } | null>>;
};

export const CategorySelect = ({ categoryData, setCategory }: Props) => {
  const [value, setValue] = useState("");
  const categories = Object.keys(categoryData).sort();

  const handleChange = (event: SelectChangeEvent) => {
    const categoryName = event.target.value;
    setValue(categoryName as string);
    const total = categoryData[categoryName];
    setCategory({ name: categoryName, total });
  };

  return (
    <FormControl sx={{ m: "10px", minWidth: 200 }} size="small">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
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
