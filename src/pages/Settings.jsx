import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createResource, createSettings } from "../services/storage";
import Swal from "sweetalert2";
import { useAppContext } from "../contexts/AppContext";

export default function Settings() {
  const { t } = useTranslation();

  const [theme, setTheme] = useAppContext() || [null, null];

  const [formKey, setFormKey] = useState(0);

  const [form, setForm] = useState({
    babyName: undefined,
    babyAge: undefined,
    babyWeight: undefined,
    theme: undefined,
  });

  const updateForm = (input, value) => {
    setForm((state) => ({ ...state, [input]: value }));
  };

  const clearForm = () => {
    setForm({
      babyName: undefined,
      babyAge: undefined,
      babyWeight: undefined,
      theme: undefined,
    });
    setFormKey((state) => state++);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resourceFormated = { ...form, theme };
    const resource = createSettings(resourceFormated);
    if (resource) {
      Swal.fire({
        title: t("Success"),
        text: t("Item created with success"),
        icon: "success",
        confirmButtonText: t("OK"),
      });
    }
    clearForm();
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Card sx={{ padding: "8px" }}>
        <CardHeader title={t("Settings")} />
        <CardContent>
          <Box
            id="resource-form"
            component="form"
            sx={{ display: "grid", gap: "32px" }}
            onSubmit={handleSubmit}
          >
            <TextField
              key={`babyName-${formKey}`}
              label={t("Baby Name")}
              value={form.babyName || ""}
              onChange={(e) => updateForm("babyName", e.target.value)}
              required
            />

            <TextField
              key={`babyAge-${formKey}`}
              type="number"
              label={t("Baby Age")}
              value={form.babyAge || ""}
              onChange={(e) => updateForm("babyAge", e.target.value)}
              required
            />

            <TextField
              key={`babyWeight-${formKey}`}
              type="number"
              label={t("Baby Weight")}
              value={form.babyWeight || ""}
              onChange={(e) => updateForm("babyWeight", e.target.value)}
              required
            />

            <Box>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
              >
                <Button onClick={(e) => setTheme("light")}>{t("Light")}</Button>
                <Button onClick={(e) => setTheme("dark")}>{t("Dark")}</Button>
              </ButtonGroup>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "8px",
              width: "100%",
              marginTop: "24px",
            }}
          >
            <Button
              variant="text"
              type="reset"
              form="resource-form"
              onClick={clearForm}
            >
              {t("Clear")}
            </Button>
            <Button variant="contained" type="submit" form="resource-form">
              {t("Submit")}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
