import { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
