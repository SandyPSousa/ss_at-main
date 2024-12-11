import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

export default function Food() {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(true);

  const [formKey, setFormKey] = useState(0);

  console.log(formKey);

  const [form, setForm] = useState({
    startDate: undefined,
    endDate: undefined,
    bottle: undefined,
    quantity: undefined,
    breast: undefined,
    observation: undefined,
  });

  console.log("form", checked);

  const updateForm = (input, value) => {
    setForm((state) => ({ ...state, [input]: value }));
  };

  const clearForm = () => {
    setForm({
      startDate: undefined,
      endDate: undefined,
      bottle: undefined,
      quantity: undefined,
      breast: undefined,
      observation: undefined,
    });
    setFormKey((state) => state + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formFormated = {
      ...form,
      bottle: checked,
      quantity: checked ? form.quantity : 0,
    };
    const resource = createResource("food", formFormated);
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
        <CardHeader title={t("Food")} />
        <CardContent>
          <Box
            id="resource-form"
            component="form"
            sx={{ display: "grid", gap: "8px" }}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel id="form-breast">{t("Breast")}</InputLabel>
              <Select
                key={`breast-${formKey}`}
                label={t("Breast")}
                labelId="form-breast"
                value={form.breast || ""}
                onChange={(e) => updateForm("breast", e.target.value)}
                required
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="L">{t("Left")}</MenuItem>
                <MenuItem value="R">{t("Right")}</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ marginTop: "24px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  key={`startDate-${formKey}`}
                  label={t("Start Date")}
                  sx={{ width: "100%" }}
                  onChange={(e) =>
                    updateForm("startDate", e?.$d?.toISOString())
                  }
                  required
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ marginTop: "24px", marginBottom: "8px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  key={`endDate-${formKey}`}
                  label={t("End Date")}
                  sx={{ width: "100%" }}
                  onChange={(e) => updateForm("endDate", e?.$d?.toISOString())}
                  required
                />
              </LocalizationProvider>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
                paddingY: "16px",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  label={t("Bottle")}
                />
              </FormGroup>
              <TextField
                key={`quantity-${formKey}`}
                label={t("Quantity")}
                type="number"
                value={form.quantity}
                disabled={!checked}
                required
                onChange={(e) => updateForm("quantity", e.target.value)}
              />
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
