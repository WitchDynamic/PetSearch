import { Typography, Link as MaterialLink } from "@mui/material";
import Link from "next/link";

type Props = {
  description: string | null;
  url: string;
};

function decodeHtmlEntityString(encodedStr: string | null): string {
  if (!encodedStr) {
    return "No description provided.";
  }
  const tempElement = document.createElement("div");
  tempElement.innerHTML = encodedStr;
  return tempElement.textContent as string;
}

export default function Description(props: Props) {
  let decodedDescription = decodeHtmlEntityString(props.description);

  return (
    <section>
      <Typography variant="h4">Description</Typography>
      <Typography variant="body1">{decodedDescription}</Typography>

      <MaterialLink component={Link} href={props.url}>
        More Info at PetFinder.
      </MaterialLink>
    </section>
  );
}
