import { LoadingOverlay } from "@mantine/core";

export default function Spinner() {
  return (
    <LoadingOverlay
      loaderProps={{ size: "lg", color: "dark-blue", variant: "bars" }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
    />
  );
}
