import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Stack } from "@mui/material";
import { useGetPrices } from "../hooks/useGetPrices";
import "chartjs-adapter-date-fns";

import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = (labels: string[], prices: number[]) => {
  return {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: prices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        stepped: "middle",
        spanGaps: true,
        pointRadius: 1,
      },
    ],
  } satisfies ChartData<"line", (number | undefined)[], string>;
};

const options = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        // offset: false,
        type: "time" as const,
        // time: {
        //   // unit: "month",

        //   displayFormats: {
        //     // year: "yy",
        //     // month: "MMM", // Format for displaying month labels
        //   },
        // },
        // ticks: {
        //   color: "red",
        // },
      },
    },
  };
};

export const SteppedLineChart = () => {
  const [returnedData, loading] = useGetPrices(); // runs twice?

  if (loading) return <>Loading...</>;
  if (!returnedData) return <>Something went wrong!</>;

  const dates: string[] = [];
  const prices: number[] = [];
  returnedData.prices.forEach((priceObject) => {
    dates.push(priceObject.date);
    prices.push(parseFloat(priceObject.price));
  });

  const formattedDates = dates.map((date) => format(date, "yyyy-MM-dd"));
  const { name, artist } = returnedData;
  const chartTitle = `${name} - ${artist}`;

  return (
    <Stack direction="row" justifyContent="center">
      <Box width={"90%"}>
        <Line
          options={options(chartTitle)}
          data={data(formattedDates, prices)}
        />
      </Box>
    </Stack>
  );
};
