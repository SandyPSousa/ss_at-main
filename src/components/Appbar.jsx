import { Adb as AdbIcon } from "@mui/icons-material";
import { AppBar as MUIAppBar, Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { signOutUser } from "../services/storage";

export default function Appbar() {
  const { t } = useTranslation("translation");

  const navigate = useNavigate();

  const redirectDash = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const signOutAndRedirect = () => {
    signOutUser();
    navigate("/");
  };

  return (
    <Box>
      <MUIAppBar position="static">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
              onClick={redirectDash}
            >
              {t("Logo")}
            </Typography>
            <Button
              variant="text"
              color="textPrimary"
              onClick={(e) => navigate("/diapers")}
            >
              {t("➡️ Diapers ")}
            </Button>
            <Button
              variant="text"
              color="textPrimary"
              onClick={(e) => navigate("/sleep")}
            >
              {t("➡️ Sleep")}
            </Button>
            <Button
              variant="text"
              color="textPrimary"
              onClick={(e) => navigate("/food")}
            >
              {t("➡️ Food")}
            </Button>
          </Box>
          <Box>
            <Button
              variant="text"
              color="textPrimary"
              onClick={(e) => navigate("/settings")}
            >
              {t("⚙️ Settings")}
            </Button>
            <Button
              variant="text"
              color="textPrimary"
              onClick={signOutAndRedirect}
            >
              {t("🚪 Log out")}
            </Button>
          </Box>
        </Box>
      </MUIAppBar>
    </Box>
  );
}
