import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createResource } from "../services/storage";
import Swal from "sweetalert2";

export default function Diapers() {
  const { t } = useTranslation();

  const [formKey, setFormKey] = useState(0);

  const [form, setForm] = useState({
    status: undefined,
    timeOfChange: undefined,
    observation: undefined,
  });

  const updateForm = (input, value) => {
    setForm((state) => ({ ...state, [input]: value }));
  };

  const clearForm = () => {
    setForm({
      status: undefined,
      timeOfChange: undefined,
      observation: undefined,
    });
    setFormKey((state) => state++);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resource = createResource("diapers", form);
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
        <CardHeader title={t("Diapers")} />
        <CardContent>
          <Box
            id="resource-form"
            component="form"
            sx={{ display: "grid", gap: "8px" }}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel id="form-status">{t("Status")}</InputLabel>
              <Select
                key={`status-${formKey}`}
                label={t("Status")}
                labelId="form-status"
                value={form.status || ""}
                onChange={(e) => updateForm("status", e.target.value)}
                required
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="dirty">{t("Dirty")}</MenuItem>
                <MenuItem value="clean">{t("Clean")}</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ marginTop: "24px", marginBottom: "24px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  key={`timeOfChange-${formKey}`}
                  label={t("Time of Change")}
                  sx={{ width: "100%" }}
                  onChange={(e) =>
                    updateForm("timeOfChange", e?.$d?.toISOString())
                  }
                  required
                />
              </LocalizationProvider>
            </Box>

            <TextField
              key={`observation-${formKey}`}
              label={t("Observation")}
              value={form.observation || ""}
              onChange={(e) => updateForm("observation", e.target.value)}
              required
            />
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
