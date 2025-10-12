import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { priceComparator } from "../../helpers/string-helpers";
import { useGetProductData } from "../../hooks/useGetProductData";
import { MUSIC_CATEGORIES } from "../../constants";
import { DiscogsCheckerCell } from "../DiscogsCheckerCell";
import { GridToolbar } from "../GridToolbar";
import { CustomNoRowsOverlay } from "../NoRowsOverlay";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ProductLink } from "./ProductLink";

type Props = {
  category: {
    name: string;
    total: number;
  };
};

export const ResultsGrid = ({ category }: Props) => {
  const [data, loading, error] = useGetProductData(category);
  const { name } = category;

  const { section } = useParams();

  const isMusicCategory = MUSIC_CATEGORIES.includes(name.toLocaleLowerCase());

  const handleCellClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
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

  const availabilityOptions = data
    ? Array.from(
        new Set(data.map((hit) => hit.availability.availabilityStatement)),
      )
    : [];

  const colDefs: GridColDef[] = [
    {
      field: "product",
      headerName: isMusicCategory ? "Release" : "Product",
      width: 300,
      resizable: false,
      renderCell: (params) => (
        <Box
          maxWidth="100%"
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            "&:hover .launch-icon": {
              opacity: 1,
            },
          }}
        >
          {params.row.slug ? (
            <ProductLink
              href={`https://www.jbhifi.com.au/products/${params.row.slug}`}
              name={params.row.product}
            />
          ) : (
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {params.row.product}
            </Box>
          )}
        </Box>
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
      type: "number",
      sortComparator: priceComparator,
      // valueFormatter: (params) =>
      //   params.value ? `$${params.value.toFixed(2)}` : "-",
      renderCell: (params) => {
        return (
          <Link to={`/ean/${params.row.ean}`}>${params.value.toFixed(2)}</Link>
        );
      },
    },
    {
      field: "full",
      headerName: "Full Price",
      type: "number",
      sortComparator: priceComparator,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toFixed(2)}` : "-",
    },
    {
      field: "savePercent",
      headerName: "Save (%)",
      type: "number",
      valueFormatter: (params) =>
        isNaN(params.value) ? "-" : `${Math.round(params.value)}%`,
    },
    {
      field: "saveDollar",
      headerName: "Save ($)",
      type: "number",
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
          <DiscogsCheckerCell value={params.value} />
        </div>
      ),
    },
    {
      field: "model",
      headerName: isMusicCategory ? "Cat. No." : "Model No.",
      renderCell: (params) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          <DiscogsCheckerCell value={params.value} />
        </div>
      ),
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 250,
      // type: "singleSelect",
      valueOptions: availabilityOptions,
    },
  ];

  const columns =
    section !== "secret"
      ? colDefs.filter((col) => !(col.field === "ean" || col.field === "model"))
      : colDefs;

  const rows: GridRowsProp = data
    ? data.map((hit, index: any) => {
        const { availability, display, pricing, product, handle, title } = hit;
        const { coreTicketPrice, displayPriceInc } = pricing;
        const { ean13, model } = product;
        const savePercent = Math.round(
          ((coreTicketPrice - displayPriceInc) / coreTicketPrice) * 100,
        );
        const saveDollar = (coreTicketPrice - displayPriceInc).toFixed(2);

        const rowData = {
          id: index,
          product: title,
          slug: handle,
          artist: display.artist,
          current: displayPriceInc,
          full: coreTicketPrice,
          savePercent: savePercent,
          saveDollar: saveDollar,
          availability: availability.availabilityStatement,
        };

        if (section === "secret") {
          return {
            ...rowData,
            ean: ean13,
            model: model,
          };
        }
        return rowData;
      })
    : [];

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center", color: "error.main" }}>
        <strong>Error loading products:</strong> {error}
      </Box>
    );
  }

  return (
    <Stack p={2} sx={{ flex: 1, overflow: "hidden" }}>
      <DataGrid
        loading={loading}
        rows={loading ? [] : rows}
        columns={columns}
        density="compact"
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[50, 100, 150, 200]}
      />
    </Stack>
  );
};
