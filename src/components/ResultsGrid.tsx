import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { priceComparator } from "../helpers/string-helpers";
import { useGetData } from "../hooks/useGetData";
import Link from "@mui/material/Link";
import { MUSIC_CATEGORIES } from "../variables";
// import { DiscogsCheckerCell } from "./DiscogsCheckerCell";

type Props = {
  category: { name: string; total: number };
};

export const ResultsGrid = ({ category }: Props) => {
  const [data, loading] = useGetData(category);
  const { name } = category;
  const isMusicCategory = MUSIC_CATEGORIES.includes(name.toLocaleLowerCase());

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    const cellValue = params.row[params.field];
    navigator.clipboard
      .writeText(cellValue)
      .then(() => {
        console.log("Cell contents copied to clipboard:", cellValue);
      })
      .catch((error) => {
        console.error("Error copying cell contents:", error);
      });
  };

  const columns: GridColDef[] = [
    {
      field: "product",
      headerName: isMusicCategory ? "Release" : "Product",
      width: 300,
      resizable: false,
      renderCell: (params) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          {params.value.slug ? (
            <Link
              href={`https://www.jbhifi.com.au/products/${params.value.slug}`}
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              {params.value.title}
            </Link>
          ) : (
            params.value.title
          )}
        </div>
      ),
    },
    {
      field: "artist",
      headerName: isMusicCategory ? "Band/Artist" : "Model name",
      width: 300,
      resizable: false,
    },
    {
      field: "current",
      headerName: "Price",
      sortComparator: priceComparator,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toFixed(2)}` : "-",
    },
    {
      field: "full",
      headerName: "Full Price",
      sortComparator: priceComparator,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toFixed(2)}` : "-",
    },
    {
      field: "diffPercent",
      headerName: "Diff. (%)",
      valueFormatter: (params) =>
        isNaN(params.value) ? "-" : `${Math.round(params.value)}%`,
    },
    {
      field: "diffDollar",
      headerName: "Diff. ($)",
      sortComparator: priceComparator,
      valueFormatter: (params) =>
        isNaN(params.value) ? "-" : `$${params.value}`,
    },
    {
      field: "ean",
      headerName: "EAN",
      width: 150,
      renderCell: (params) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          {params.value}
          {/* <DiscogsCheckerCell value={params.value} /> */}
        </div>
      ),
    },
    {
      field: "model",
      headerName: isMusicCategory ? "Cat. No." : "Model No.",
      renderCell: (params) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          {params.value}
        </div>
      ),
    },
    { field: "availableOnline", headerName: "Available online" },
  ];

  const rows: GridRowsProp = data
    ? data.map((hit, index: any) => {
        const { pricing, product, handle } = hit;
        const { coreTicketPrice, displayPriceInc } = pricing;
        const { ean13, model } = product;
        const diffPercent = Math.round(
          ((coreTicketPrice - displayPriceInc) / coreTicketPrice) * 100
        );
        const diffDollar = (coreTicketPrice - displayPriceInc).toFixed(2);
        return {
          id: index,
          product: { title: hit.title, slug: handle },
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
      loading={loading}
      rows={loading ? [] : rows}
      columns={columns}
      density="compact"
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 50 },
        },
      }}
      pageSizeOptions={[50, 100, 150, 200]}
    />
  );
};
