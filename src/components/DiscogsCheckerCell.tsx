import React, { useState } from "react";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  value: string;
};

export const DiscogsCheckerCell = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popperData, setPopperData] = useState<string | null>(null);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://www.discogs.com/search/ac?searchType=all&q=4050538770438&type=a_m_r_13",
  //         {
  //           headers: {
  //             "User-Agent": "Mozilla/5.0", // Add a user agent header
  //             Accept: "application/json", // Specify the accepted response format
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       if (data.length > 0) {
  //         return setPopperData(data[0].title);
  //       }
  //       return setPopperData("nothing found");
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    console.log(popperData);
    if (!popperData) {
      //   fetchData();
      setTimeout(() => {
        setPopperData("Release info: [data]");
      }, 1000);
    }
    console.log(value);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {value}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={"right"}
      >
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          {popperData ? (
            <div>{popperData}</div>
          ) : (
            <CircularProgress size={20} />
          )}
        </Box>
      </Popper>
    </div>
  );
};
