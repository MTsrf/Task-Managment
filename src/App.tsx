import React from "react";
import "./App.css";
import { useRoutes } from "react-router";
import routes from "./features/auth/routes";
import { ConfigProvider } from "antd";
import { theme } from "./config/themeConfig";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskProvider from "./context/TaskContext";

function App() {
  const content = useRoutes(routes);
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SettingsProvider>
            <TaskProvider>
              <ConfigProvider theme={theme}>{content}</ConfigProvider>
            </TaskProvider>
          </SettingsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
