import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/common/Spinner";
import { Flex, SimpleGrid } from "@mantine/core";
import TourCard from "../../../components/common/TourCard";

export default function LikedTours() {
  const { instance, loggedUser } = useContext(AuthContext);

  const getLikedPosts = async () => {
    const data = await instance.get(`/post/likedPosts/${loggedUser?.id}`);
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery(["getLikedPosts"], () => getLikedPosts());

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error}</h1>;

  return (
    <Flex justify="center" align="center" direction="column" my={22}>
      <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "md" }]}>
        {data?.map((tour) => (
          <TourCard tour={tour} key={tour.id} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
