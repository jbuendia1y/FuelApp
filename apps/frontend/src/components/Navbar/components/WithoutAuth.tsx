import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function WithoutAuth() {
  return (
    <>
      <Link to="/login">
        <MenuItem>Iniciar Sessión</MenuItem>
      </Link>
    </>
  );
}
