import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

export const GridToolbar = () => {
  const { section } = useParams();
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
      }}
    >
      <div>
        <GridToolbarColumnsButton  color="secondary" />
        <GridToolbarFilterButton  color="secondary" />
        {section === "secret" && <GridToolbarExport  color="secondary" />}
      </div>
      <div>
        <GridToolbarQuickFilter />
      </div>
    </GridToolbarContainer>
  );
};
