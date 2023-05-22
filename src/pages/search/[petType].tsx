import type { ParsedUrlQuery } from "querystring";
import dynamic from "next/dynamic"
import { useContext } from "react";
import { useRouter } from "next/router";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
// Our imports.
import type { LocationContextType } from "@/hooks/LocationContext";
import { LocationContext } from "@/hooks/LocationContext";
import SearchPageMeta from "@/components/meta/SearchPageMeta";
const DisplaySearch = dynamic(() => import("@/components/pet-search/DisplaySearch"), {
      loading: () => <CircularProgress />
});

type QueryProps = {
  petType: string;
  invalidPetType: boolean;
  page: string;
  location: string;
};

const petMap = new Map().set("dogs","dog").set("cats","cat");

function getQueryProperties(query: ParsedUrlQuery, currentZipCode: string): QueryProps {
  const petType = typeof(query.petType) === "string" ? query.petType : "";

  if(!petMap.has(petType)){
    return {
      petType: petType,
      invalidPetType: true,
      location: "",
      page: "",
    };
  }
  const page = typeof(query.page) === "string"? query.page : "1";
  const location = typeof(query.location) === "string" ? query.location : currentZipCode;
  return {
    petType: petMap.get(petType),
    invalidPetType: false,
    location: location,
    page,
  };
}

export default function PetSearchPage() {
  const { zipCode } = useContext(LocationContext) as LocationContextType;
  const router = useRouter();
  const props: QueryProps = getQueryProperties(router.query, zipCode);

  // Invalid petType entered.
  if (props.invalidPetType) {
    return (
      <>
        <SearchPageMeta />
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Pet Type: {props.petType} not supported.
        </Alert>
      </>
    );
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // For pagination change.
    router.push({
      query: {
        ...router.query,
        page: value,
      },
    });
  };

  const params = new URLSearchParams();
  params.append("type", props.petType);
  params.append("location", props.location);
  params.append("page", props.page);
  const searchQueryURL = "pets?" + params.toString();

  return (
    <>
      <SearchPageMeta />
      <DisplaySearch
        searchParams={params}
        searchQueryURL={searchQueryURL}
        onPageChange={handlePageChange}
      />
    </>
  );
}
