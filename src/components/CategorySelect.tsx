import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FacetsCategory } from "../types/categories-search-types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  categoryData: FacetsCategory;
  setCategory: Dispatch<SetStateAction<{ name: string; total: number } | null>>;
};

export const CategorySelect = ({ categoryData, setCategory }: Props) => {
  const categories = Object.keys(categoryData).sort();

  const handleChange = (event: SelectChangeEvent<"">) => {
    const categoryName = event.target.value
    console.log(categoryName)
    const total = categoryData[categoryName]
    setCategory({ name: categoryName, total });
  };

  return (
    <div>
      <FormControl sx={{ mb: "10px", minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Category"
          onChange={handleChange}
          variant="standard"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
