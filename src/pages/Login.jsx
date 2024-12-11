import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { signInUser } from "../services/storage";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const { t } = useTranslation("translation");

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const updateForm = (input, value) => {
    setForm((state) => ({ ...state, [input]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = signInUser(form?.email, form?.password);
    if (!user) {
      e.target.reset();
      Swal.fire({
        title: t("Error"),
        text: t("Failed to log in"),
        icon: "error",
        confirmButtonText: t("Continue"),
      });
      return;
    }
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "inherit",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: "360px" }}>
        <CardHeader title={t("Log in")} />
        <CardContent>
          <Box
            id="login"
            component="form"
            sx={{ display: "grid", gap: "8px" }}
            onSubmit={handleLogin}
          >
            <TextField
              variant="standard"
              label={t("E-mail")}
              onChange={(e) => updateForm("email", e.target.value)}
            />
            <TextField
              variant="standard"
              label={t("Password")}
              type="password"
              onChange={(e) => updateForm("password", e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingTop: "24px",
              width: "100%",
            }}
          >
            <Button variant="contained" type="submit" form="login">
              {t("Log in")}
            </Button>
            <Button variant="text" onClick={(e) => navigate("/register")}>
              {t("Register")}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
