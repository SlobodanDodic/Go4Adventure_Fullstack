import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { createStyles, Image, Card, Text, Group, getStylesRef, rem, Center, Rating, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconEye, IconHeartFilled, IconInfoCircleFilled, IconMessageCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  const { instance } = useContext(AuthContext);
  const { classes, theme } = useStyles();

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${tour?.coverImg}`);
  };

  // const slides = tour?.images.map((image) => (
  //   <Carousel.Slide key={image.id}>
  //     <Image src={`${process.env.REACT_APP_SERVER}/gallery/${image.path}`} height={220} />
  //   </Carousel.Slide>
  // ));

  return (
    <Card my={12} w="100%" maw={400} className={classes.card}>
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {/* {slides} */}
          <Image src={`${process.env.REACT_APP_SERVER}/gallery/${tour?.coverImg}`} height={220} />
        </Carousel>

        <div className={classes.content}>
          <Group position="apart" spacing="xs">
            <Text className={classes.author}>{tour.category}</Text>
            <Group spacing="lg">
              <Center>
                <IconEye size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                <Text fw="bold" fz="xs" c="dimmed" className={classes.bodyText}>
                  {tour.views}
                </Text>
              </Center>
              <Center>
                <IconMessageCircle size="1rem" stroke={1.5} color={theme.colors.dark[2]} />
                <Text fw="bold" fz="xs" c="dimmed" className={classes.bodyText}>
                  {tour.comments}
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
          {tour.length} days tour
        </Text>
      </Group>

      <Group position="apart" mt="md">
        <Link radius="md" to={`/${tour.title}`} state={{ data: tour }} className={classes.linkButton}>
          <Center>
            <IconInfoCircleFilled size="1.25rem" />
            <Text ml={5}>More</Text>
          </Center>
        </Link>

        <ActionIcon color="red" size="xl" variant="transparent">
          {/* <IconHeartHandshake size="1.75rem" /> */}
          <IconHeartFilled size="1.75rem" />
        </ActionIcon>

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
  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },
  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0.15,
    zIndex: 2,
  },
  carouselIndicator: {
    width: rem(12),
    height: rem(4),
    transition: "width 250ms ease",
    backgroundColor: "white",
    "&[data-active]": {
      width: rem(40),
    },
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
