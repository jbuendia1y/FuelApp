import { css } from "@emotion/react";
import ReactIcon from "@/components/Icons/ReactIcon";
import Navbar from "../Navbar";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { toUpperCaseFirstLetter } from "@/utils/stringFunctions";

const headerLogoStyles = css`
  width: 40px;
`;

export default function Header() {
  const { location } = useHistory();

  console.log(location);

  return (
    <header>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton>
            <ReactIcon css={headerLogoStyles} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {toUpperCaseFirstLetter(
              location.pathname.split("/")[1].replaceAll("-", " ")
            )}
          </Typography>
          <Navbar />
        </Toolbar>
      </AppBar>
    </header>
  );
}
