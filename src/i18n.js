import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Log in": "Log in",
      "E-mail": "E-mail",
      Password: "Password",
      Register: "Register",
      "Create account": "Create account",
      "Failed to create account": "Failed to create account",
      Continue: "Continue",
      "Failed to log in": "Failed to log in",
      Logo: "Baby Center",
      Diapers: "Diapers",
      Sleep: "Sleep",
      Food: "Food",
      "Log out": "Log out",
      Settings: "Settings",
      Dirty: "Dirty1",
      Clean: "Clean2",
      Success: "Success!",
      Error: "Error!",
      "Item created with success": "Item created with success!",
      OK: "OK",
      Left: "Left",
      Right: "Right",
      Bottle: "Bottle",
      Quantity: "Quantity",
      Total: "Total",
      Light: "Light",
      Dark: "Dark",
      CallToAction: "Your Parenting Partner, Every Step of the Way",
      CallToActionSub:
        "Track milestones, access expert advice, and nurture your baby with confidence.",
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "Log in": "Se connecter",
      "E-mail": "E-mail",
      Password: "Mot de passe",
      Register: "S'inscrire",
      "Create account": "Créer un compte",
      Age: "Age",
      Weight: "Weight",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
