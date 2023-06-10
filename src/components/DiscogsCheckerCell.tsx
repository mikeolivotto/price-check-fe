import React, { useState } from "react";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
type Props = {
  value: string;
};

export const DiscogsCheckerCell = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [displayData, setDisplayData] = useState<[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/${value}`, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return setDisplayData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    fetchData();
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  // remove results that don't include price/quantity data
  const filteredData = displayData?.filter((hit: any) => hit.marketplace);

  const showThis = () => {
    if (!displayData) {
      return <CircularProgress size={20} />
    }
    if (!!filteredData && filteredData.length > 0) {
      return filteredData.map((hit: any) => (
        <div>{`${hit.marketplace.quantity} copies from $${hit.marketplace.min.toFixed(2)}`}</div>
      ))
    }
    return "No data available"
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {value}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement={"right"}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          {showThis()}
        </Box>
      </Popper>
    </div>
  );
};
