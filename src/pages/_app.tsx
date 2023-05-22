import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import {CssBaseline, Container, ThemeProvider} from "@mui/material";
import type {SxProps , Theme} from "@mui/material";
// Our imports.
import { darkModeTheme, lightModeTheme } from "@/theme/material-theme";
import { LocationProvider } from "@/hooks/LocationContext";
import NavBar from "@/components/layout/NavBar";
import HeadMeta from "@/components/meta/HeadMeta";

const containerSx: SxProps<Theme> ={
  paddingBottom: "2rem"
}

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggleDarkMode = () => {
    setIsDarkMode((currIsDarkMode) => !currIsDarkMode);
  };

  const theme = useMemo(() => (isDarkMode ? darkModeTheme : lightModeTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocationProvider>
        <HeadMeta />
        <NavBar isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} />
        <Container maxWidth="lg" sx={containerSx}>
          <Component {...pageProps} />
        </Container>
      </LocationProvider>
    </ThemeProvider>
  );
}
