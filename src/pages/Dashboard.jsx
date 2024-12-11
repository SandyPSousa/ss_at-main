import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  getActiveUser,
  getAllResourcesByUser,
  getSettings,
} from "../services/storage";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const user = getActiveUser();

  const diapers = getAllResourcesByUser("diapers");

  const sleep = getAllResourcesByUser("sleep");

  const food = getAllResourcesByUser("food");

  const settings = getSettings();

  console.log("settings", settings);

  const totalItems = [...diapers, ...sleep, ...food];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto 1fr",
        gap: "32px",
        minHeight: "inherit",
        padding: "32px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto",
          gap: "16px",
        }}
      >
        <Card>
          <CardHeader title={settings.babyName} />
          <CardContent>
            <Typography>
              {t("Age")} {settings?.babyAge}
            </Typography>
            <Typography>
              {t("Weight")} {settings?.babyWeight}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "16px",
        }}
      >
        <Card>
          <CardHeader title={t("Diapers")} subheader={settings?.babyName} />
          <CardMedia component="img" image="https://cdn-icons-png.freepik.com/256/1706/1706298.png?ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid" />
          <CardContent>
            <Typography variant="h6">
              {t("Quantity")} {diapers.length}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={t("Sleep")} subheader={settings?.babyName} />
          <CardMedia component="img" image="https://cdn-icons-png.freepik.com/256/14777/14777651.png?ga=GA1.1.GA1.1.839107090.1725559554&semt=ais_hybrid" />
          <CardContent>
            <Typography variant="h6">
              {t("Quantity")} {sleep.length}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={t("Food")} subheader={settings?.babyName} />
          <CardMedia component="img" image="https://cdn-icons-png.freepik.com/256/14777/14777747.png?ga=GA1.1.GA1.1.839107090.1725559554" />
          <CardContent>
            <Typography variant="h6">
              {t("Quantity")} {food.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "grid", gap: "8px" }}>
        {totalItems.map((item, index) => {
          const date = new Date(item.createdAt);
          const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          return (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingX: "16px",
              }}
            >
              <CardHeader
                title={item.category}
                subheader={settings?.babyName}
              />
              <CardContent>
                {date.toLocaleDateString("pt", options)}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
