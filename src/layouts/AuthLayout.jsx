import { Navigate, Outlet } from "react-router";
import { getActiveUser } from "../services/storage";
import { Paper } from "@mui/material";
import Appbar from "../components/Appbar";

export default function AuthLayout() {
  const user = getActiveUser();

  if (!user) return <Navigate to="/" replace />;

  return (
    <Paper sx={{ minHeight: "inherit", borderRadius: 0 }}>
      <Appbar />
      <Outlet />
    </Paper>
  );
}
