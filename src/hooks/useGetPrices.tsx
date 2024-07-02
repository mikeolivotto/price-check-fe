import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type PriceData = {
  id: string;
  ean: string;
  price: string;
  date: string;
};

type ReturnedData = { artist: string; name: string; prices: PriceData[] };

export const useGetPrices = () => {
  const { ean } = useParams();

  const [returnedData, setReturnedData] = useState<ReturnedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestUrl = `http://localhost:3000/${ean}`;
        const response = await fetch(requestUrl, {
          method: "GET",
        });

        const data: [ReturnedData] = await response.json();

        const { artist, name, prices } = data[0];

        const pricesWithDateFormatted = prices.map((record) => {
          return { ...record, date: `${new Date(record.date)}` };
        });

        const formattedData = {
          artist,
          name,
          prices: pricesWithDateFormatted,
        };

        setReturnedData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ean]);

  return [returnedData, loading] as const;
};
