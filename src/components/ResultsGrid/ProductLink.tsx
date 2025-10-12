import MuiLink, { LinkProps } from "@mui/material/Link";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box } from "@mui/material";

const BaseLink = (props: LinkProps) => {
  return (
    <MuiLink
      underline="hover"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {props.children}
    </MuiLink>
  );
};

export const ProductLink = ({ href, name }: { href: string; name: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <BaseLink
        href={href}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          minWidth: 0,
        }}
      >
        {name}
      </BaseLink>
      <BaseLink
        href={href}
        className="launch-icon"
        sx={{
          ml: 0.5,
          flexShrink: 0,
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      >
        <LaunchIcon sx={{ fontSize: "1rem" }} />
      </BaseLink>
    </Box>
  );
};
