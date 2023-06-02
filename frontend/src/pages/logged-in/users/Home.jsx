import { Flex, SimpleGrid } from "@mantine/core";
import TourCard from "../../../components/TourCards/TourCard";
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowLeft } from "@tabler/icons-react";
import { toursData } from "../../../components/Tours/toursData";
import { useState } from "react";

export default function Home() {
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");
  const filteredTours = toursData.filter((tour) => {
    return (
      tour.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      tour.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <Flex justify="center" align="center" direction="column">
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
            <IconArrowLeft size="1.1rem" stroke={1.5} />
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
