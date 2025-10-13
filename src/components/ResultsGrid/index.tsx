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
import { CustomNoRowsOverlay } from "../NoRowsOverlay";
import { useParams } from "react-router-dom";
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
      renderCell: (params: GridRenderCellParams) => (
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
    },
    {
      field: "current",
      headerName: "Price",
      type: "number",
      sortComparator: priceComparator,
      valueFormatter: (value: number) => (value ? `$${value.toFixed(2)}` : "-"),
      // renderCell: (params: GridRenderCellParams) => {
      //   return (
      //     <Link to={`/ean/${params.row.ean}`}>${params.value.toFixed(2)}</Link>
      //   );
      // },
    },
    {
      field: "full",
      headerName: "Full Price",
      type: "number",
      sortComparator: priceComparator,
      valueFormatter: (value: number) => (value ? `$${value.toFixed(2)}` : "-"),
    },
    {
      field: "savePercent",
      headerName: "Save (%)",
      type: "number",
      valueFormatter: (value: number) =>
        isNaN(value) ? "-" : `${Math.round(value)}%`,
    },
    {
      field: "saveDollar",
      headerName: "Save ($)",
      type: "number",
      sortComparator: priceComparator,
      valueFormatter: (value: number) => (isNaN(value) ? "-" : `$${value}`),
    },
    {
      field: "ean",
      headerName: "EAN",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          <DiscogsCheckerCell value={params.value} />
        </div>
      ),
    },
    {
      field: "model",
      headerName: isMusicCategory ? "Cat. No." : "Model No.",
      renderCell: (params: GridRenderCellParams) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          <DiscogsCheckerCell value={params.value} />
        </div>
      ),
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 250,
      type: "singleSelect",
      valueOptions: availabilityOptions,
    },
  ];

  const columns =
    section !== "secret"
      ? colDefs.filter((col) => !(col.field === "ean" || col.field === "model"))
      : colDefs;

  const rows: GridRowsProp = data
    ? data.map((hit, index: any) => {
        const { availability, display, pricing, product, handle, title, barcode } = hit;
        const { coreTicketPrice, displayPriceInc } = pricing;
        const { ean13, model } = product;
        const eanCode = barcode || ean13;
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
          ean: eanCode,
          model: model,
        };

        if (section === "secret") {
          return {
            ...rowData,
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
    <Stack sx={{ flex: 1, overflow: "hidden", minHeight: "70vh" }}>
      <Stack alignItems="center" p={2} sx={{ flex: 1, overflow: "hidden" }}>
        <DataGrid
          key={name}
          loading={loading}
          rows={loading ? [] : rows}
          columns={columns}
          density="compact"
          showToolbar
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[50, 100, 150, 200]}
          sx={{
            width: rows.length === 0 ? "100%" : "fit-content",
            maxWidth: "100%",
            height: "100%",
          }}
        />
      </Stack>
    </Stack>
  );
};
