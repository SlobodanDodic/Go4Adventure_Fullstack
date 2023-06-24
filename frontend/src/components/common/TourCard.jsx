import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { createStyles, Image, Card, Text, Group, Center, Rating, ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled, IconInfoCircleFilled, IconMessageCircle } from "@tabler/icons-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  const { instance, role, user, loggedUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { classes, theme } = useStyles();

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${tour?.coverImg}`);
  };

  const userLikedPost = tour?.likes?.some((element) => element.userId === loggedUser?.id);
  const likeId = tour?.likes?.find(({ userId }) => userId === loggedUser?.id);

  const createLike = async () => {
    return await instance.post(`like`, { postId: tour.id, userId: loggedUser?.id });
  };
  const createLikeMutation = useMutation(createLike, {
    onSuccess: () => queryClient.invalidateQueries("getPosts"),
  });

  const removeLike = async () => {
    return await instance.delete(`like/${likeId?.id}`);
  };
  const removeLikeMutation = useMutation(removeLike, {
    onSuccess: () => queryClient.invalidateQueries("getPosts"),
  });

  const handleLike = () => {
    if (!userLikedPost) {
      createLikeMutation.mutate();
    } else {
      removeLikeMutation.mutate();
    }
  };

  return (
    <Card my={12} w="100%" maw={400} className={classes.card}>
      <Card.Section>
        <Image src={`${process.env.REACT_APP_SERVER}/gallery/${tour?.coverImg}`} height={220} />

        <div className={classes.content}>
          <Group position="apart" spacing="xs">
            <Text className={classes.author}>{tour.category}</Text>
            <Group spacing="lg">
              <Center>
                <IconHeart size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                <Text fw="bold" fz="xs" c="dimmed" className={classes.bodyText}>
                  {tour?.likes?.length ? tour?.likes?.length : 0}
                </Text>
              </Center>
              <Center>
                <IconMessageCircle size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                <Text fw="bold" fz="xs" c="dimmed" className={classes.bodyText}>
                  {tour?.comments?.length ? tour?.comments?.length : 0}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </Card.Section>
      <div className={classes.overlay} />

      <Group position="apart" mt="lg">
        <Text fw={500} fz="md">
          {tour.title}
        </Text>

        <Text fz="xs" fw={500}>
          <Rating defaultValue={tour.rating} size="xs" />
        </Text>
      </Group>

      <Group position="apart">
        <Text fz="xs" c="dimmed" mt="sm">
          {tour.subcategory}
        </Text>
        <Text fz="xs" c="dimmed" mt="sm">
          {tour.location}
        </Text>
      </Group>

      <Group position="apart" mt="md">
        <Link
          radius="md"
          to={
            !!user && role === "USER"
              ? `/home/tours/${tour.title}`
              : !!user && role === "OPERATOR"
              ? `operators/tours/${tour.title}`
              : `/${tour.title}`
          }
          state={{ data: tour }}
          className={classes.linkButton}
        >
          <Center>
            <IconInfoCircleFilled size="1.25rem" />
            <Text ml={5}>More</Text>
          </Center>
        </Link>

        {!!user ? (
          <ActionIcon color="red" size="xl" variant="transparent" onClick={handleLike}>
            {!userLikedPost ? <IconHeart size="1.5rem" /> : <IconHeartFilled size="1.5rem" />}
          </ActionIcon>
        ) : null}

        <Text fz="md" span fw={800} mr={10} className={classes.price}>
          {tour.price}€
        </Text>
      </Group>
    </Card>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    border: "1px solid #d3d3d329",
    backgroundColor: "#d3d3d329",
    borderRadius: "0 0 3rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "220px",
    backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .75) 95%)",
  },
  content: {
    height: "210px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: "0 10px",
    zIndex: 1,
  },
  bodyText: {
    color: theme.white,
    marginLeft: "5px",
  },
  author: {
    color: theme.white,
  },
  linkButton: {
    textDecoration: "none",
    padding: "4px 10px",
    backgroundColor: "#0b4668",
    color: "white",
    borderRadius: "5px",
  },
}));
