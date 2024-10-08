"use client";

import { createTheme, Theme } from "@mui/material";
import { ReactNode } from "react";
import { createContext, useMemo } from "react";
import {
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React from "react";

// Corrected ThemeContext type
export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: "light",
      primary: {
        main: "#ccd5ae",
        light: "#dbb44d",
      },
      secondary: {
        main: "#b7aed5",
      },
      info: {
        main: "#aeccd5",
      },
      success: {
        main: "#aed5b7",
      },
    },
  };

  // Memoizing theme creation
  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

  return (
    // Wrapping with MuiThemeProvider
    <ThemeContext.Provider value={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to access theme
export const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};
