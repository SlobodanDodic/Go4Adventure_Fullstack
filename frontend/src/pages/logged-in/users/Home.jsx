import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Flex, SimpleGrid, ActionIcon, TextInput } from "@mantine/core";
import TourCard from "../../../components/common/TourCard";
import { IconSearch, IconArrowRight, IconLogin } from "@tabler/icons-react";
import Spinner from "../../../components/common/Spinner";
import useSWR from "swr";
import { Link } from "react-router-dom";

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
        {filteredTours?.map((tour) => (
          <TourCard tour={tour} key={tour?.id} />
        ))}
      </SimpleGrid>

      <ActionIcon
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
        }}
      >
        <Link
          to={`/auth`}
          style={{
            textDecoration: "none",
            color: "#0b4668",
          }}
        >
          <IconLogin size="1.75rem" />
        </Link>
      </ActionIcon>
    </Flex>
  );
}
