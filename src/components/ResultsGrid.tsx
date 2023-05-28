import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Hit } from "../types/types";

const priceComparator = (a: string, b: string) => {
  const priceA = parseInt(a);
  const priceB = parseInt(b);

  if (priceA < priceB) {
    return -1;
  }
  if (priceA > priceB) {
    return 1;
  }
  return 0;
};

type Props = {
  data: Hit[] | null;
};

export const ResultsGrid = ({ data }: Props) => {
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300, resizable: false },
    {
      field: "artist",
      headerName: "Brand/Artist",
      width: 300,
      resizable: false,
    },
    { field: "current", headerName: "Price", sortComparator: priceComparator, valueFormatter: (params) => `$${params.value}`  },
    { field: "full", headerName: "Full Price", sortComparator: priceComparator, valueFormatter: (params) => `$${params.value}` },
    { field: "diffPercent", headerName: "Diff. (%)", valueFormatter: (params) => `${params.value}%` },
    { field: "diffDollar", headerName: "Diff. ($)", sortComparator: priceComparator, valueFormatter: (params) => `$${params.value}`  },
    { field: "ean", headerName: "EAN", width: 150 },
    { field: "model", headerName: "Model" },
    { field: "availableOnline", headerName: "Available online" },
  ];

  const rows: GridRowsProp = data
    ? data.map((hit, index: any) => {
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
          current: displayPriceInc,
          full: coreTicketPrice,
          diffPercent: diffPercent,
          diffDollar: diffDollar,
          ean: ean13,
          model: model,
          availableOnline: hit.availability.canBuyOnline,
        };
      })
    : [];

  return (
    <DataGrid
      loading={!data}
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
