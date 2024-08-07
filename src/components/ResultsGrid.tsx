import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { priceComparator } from "../helpers/string-helpers";
import { useGetProductData } from "../hooks/useGetProductData";
import ExternalLink from "@mui/material/Link";
import { MUSIC_CATEGORIES } from "../variables";
import { DiscogsCheckerCell } from "./DiscogsCheckerCell";
import { GridToolbar } from "./GridToolbar";
import { CustomNoRowsOverlay } from "./NoRowsOverlay";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

type Props = {
  category: {
    name: string;
    total: number;
  };
};

export const ResultsGrid = ({ category }: Props) => {
  const [data, loading] = useGetProductData(category);
  const { name } = category;

  const { section } = useParams();

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

  const availabilityOptions = data
    ? Array.from(
        new Set(data.map((hit) => hit.availability.availabilityStatement))
      )
    : [];

  const colDefs: GridColDef[] = [
    {
      field: "product",
      headerName: isMusicCategory ? "Release" : "Product",
      width: 300,
      resizable: false,
      renderCell: (params) => (
        <div onClick={(event) => handleCellClick(event, params)}>
          {params.row.slug ? (
            <ExternalLink
              href={`https://www.jbhifi.com.au/products/${params.row.slug}`}
              underline="hover"
              target="_blank"
              rel="noreferrer"
              color="secondary"
            >
              {params.row.product}
            </ExternalLink>
          ) : (
            params.row.product
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
      type: "number",
      sortComparator: priceComparator,
      // valueFormatter: (params) =>
      //   params.value ? `$${params.value.toFixed(2)}` : "-",
      renderCell: (params) => {
        return <Link to={`/ean/${params.row.ean}`} >${params.value.toFixed(2)}</Link>
      }
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
        const { availability, display, pricing, product, handle, title } = hit;
        const { coreTicketPrice, displayPriceInc } = pricing;
        const { ean13, model } = product;
        const savePercent = Math.round(
          ((coreTicketPrice - displayPriceInc) / coreTicketPrice) * 100
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

  return (
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
  );
};
