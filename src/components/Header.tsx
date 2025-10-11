import { AppBar, Toolbar, Typography } from "@mui/material";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ mr: 2 }}>
      <Toolbar>
        <PriceChangeIcon fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          JB Price Checker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};