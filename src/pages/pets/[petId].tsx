import dynamic from "next/dynamic"
import { NextRouter, useRouter } from "next/router";
import {CircularProgress, Alert} from "@mui/material";
// Our import.
import PetPageMeta from "@/components/meta/PetPageMeta";
const DisplayInfo = dynamic(() => import("@/components/pet/DisplayInfo"), {
    loading: () => <CircularProgress />,
});

function getId(router: NextRouter): string {
  let id = router.query.petId ?? "error";

  if(typeof id !== "string" || Number.isNaN(parseInt(id))){
      id = "error";
  }
  return id;
}

export default function PetPage() {
  const router = useRouter();
  const id = getId(router);

  if(id === "error"){
      return (
          <>
              <PetPageMeta />
              <main>
                  <Alert severity="error">Invalid pet id entered.</Alert>
              </main>
          </>
      );
  }
  return (
    <>
      <PetPageMeta />
      <main>{id !== "" ? <DisplayInfo id={id} /> : null}</main>
    </>
  );
}
