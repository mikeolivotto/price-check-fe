import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Response } from "./types/types";
// import { data } from "./test-object";

type Props = {
  data: Response | null;
};

export const ResultsGrid = ({ data }: Props) => {
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300, resizable: false },
    { field: "artist", headerName: "Artist", width: 300, resizable: false },
    { field: "current", headerName: "Price" },
    { field: "full", headerName: "Full Price" },
    { field: "diffPercent", headerName: "Diff. (%)" },
    { field: "diffDollar", headerName: "Diff. ($)" },
    { field: "ean", headerName: "EAN", width: 150 },
    { field: "model", headerName: "Model" },
    { field: "availableOnline", headerName: "Available online" },
  ];

  const rows: GridRowsProp = data
    ? data.results[0].hits.map((hit: any, index: any) => {
        const { pricing, product } = hit;
        const { coreTicketPrice, displayPriceInc } = pricing;
        const { ean13, model } = product;
        const diffPercent = Math.round(
          ((coreTicketPrice - displayPriceInc) / coreTicketPrice) * 100
        );
        const diffDollar = (coreTicketPrice - displayPriceInc).toFixed(2);
        return {
          id: index,
          title: hit.title,
          artist: hit.display.artist,
          current: `$${displayPriceInc}`,
          full: `$${coreTicketPrice}`,
          diffPercent: `${diffPercent}%`,
          diffDollar: `$${diffDollar}`,
          ean: ean13,
          model: model,
          availableOnline: hit.availability.canBuyOnline,
        };
      })
    : [];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 50 },
        },
      }}
      pageSizeOptions={[50, 100]}
    />
  );
};
