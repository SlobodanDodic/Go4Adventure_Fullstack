import { useLocation } from "react-router-dom";
import { Container } from "@mantine/core";
import { HeaderCard } from "../../components/Tour/HeaderCard";
import { HeaderInfo } from "../../components/Tour/HeaderInfo";
import { AccordionText } from "../../components/Tour/AccordionText";

export default function Tour() {
  const location = useLocation();
  const data = location.state?.data;
  // console.log(data);

  return (
    <Container size="xs" px="xs">
      <HeaderCard data={data} />
      <HeaderInfo data={data} />
      <AccordionText data={data} />
    </Container>
  );
}
