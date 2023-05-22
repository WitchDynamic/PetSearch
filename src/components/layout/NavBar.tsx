import { useRouter } from "next/router";
import { useContext } from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
// Our imports.
import type { LocationContextType } from "@/hooks/LocationContext";
import { LocationContext } from "@/hooks/LocationContext";
import LocationButton from "./LocationButton";

type Props = {
  isDarkMode: boolean;
  onToggleDarkMode: VoidFunction;
};
export default function MainNavigation(props: Props) {
  const router = useRouter();
  const { zipCode, setZipCode } = useContext(LocationContext) as LocationContextType;

  const handleZipCodeChange = (newZipCode: string) => {
    setZipCode(newZipCode);

    // Set the new zip code in our search query URL.
    const hasPage = router.query.page ? true : false;
    if (hasPage) {
      // Set page to 1 to restart search with new query.
      router.push({
        query: {
          ...router.query,
          page: "1",
          location: newZipCode,
        },
      });
    } else {
      router.push({
        query: {
          ...router.query,
          location: newZipCode,
        },
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={Link} href="/" color="inherit" sx={{textDecoration: "none"}}>
              PetSearch
            </Button>
          </Typography>
          <LocationButton onZipCodeChange={handleZipCodeChange} currentZip={zipCode} />
          <IconButton onClick={props.onToggleDarkMode} color="inherit">
            {props.isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
