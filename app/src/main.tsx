import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { queryClient } from "./query-client";
import { ThemeProvider } from "./themes/ThemeProvider";
import { applyTheme, loadStoredTheme } from "./themes/theme-config";
import "./themes/themes.css";
import "./themes/agent-theme.css";
import "./themes/agent-light-design.css";
import "./index.css";

applyTheme(loadStoredTheme());

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
