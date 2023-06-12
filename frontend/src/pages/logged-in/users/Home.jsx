import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Flex, SimpleGrid } from "@mantine/core";
import TourCard from "../../../components/TourCards/TourCard";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
// import { toursData } from "../../../components/Tours/toursData";
import Spinner from "../../../components/Spinner";
import useSWR from "swr";

export default function Home() {
  const { instance } = useContext(AuthContext);
  const { data, error, isLoading } = useSWR("/post", instance.get);
  const [search, setSearch] = useState("");

  const toursData = data?.data;

  const filteredTours = toursData?.filter((tour) => {
    return (
      tour.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      tour.editorText.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });
  console.log(filteredTours);

  if (isLoading) return <Spinner />;
  if (error) return <h1>{error}</h1>;

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
