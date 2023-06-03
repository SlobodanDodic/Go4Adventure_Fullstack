import { Flex, SimpleGrid } from "@mantine/core";
import TourCard from "../../../components/TourCards/TourCard";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import { toursData } from "../../../components/Tours/toursData";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredTours = toursData.filter((tour) => {
    return (
      tour.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      tour.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <Flex justify="center" align="center" direction="column" my={22}>
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="sm"
        w="90%"
        mb={12}
        maw={300}
        rightSection={
          <ActionIcon size={32} radius="xl" variant="filled" style={{ backgroundColor: "#0b4668" }}>
            <IconArrowRight size="1.2rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Search questions"
        rightSectionWidth={42}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "md" }]}>
        {filteredTours.map((tour) => (
          <TourCard tour={tour} key={tour.id} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
