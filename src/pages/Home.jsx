import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Home() {
  const { t, i18n } = useTranslation("translation");

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ width: "520px" }}>
              {t("CallToAction")}
            </Typography>
            <Divider sx={{ marginY: "16px" }} />
            <Typography variant="subtitle1">{t("CallToActionSub")}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" onClick={(e) => navigate("/login")}>
              {t("Log in")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
