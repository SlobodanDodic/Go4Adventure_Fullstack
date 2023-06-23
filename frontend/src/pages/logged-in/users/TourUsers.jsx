import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { createStyles, Title, Container, rem, Text, Center, Image, Button, Flex } from "@mantine/core";
import { Dots } from "../../../components/users/TourUsers/Dots";
import { Description } from "../../../components/users/Description";
import { Carousel } from "@mantine/carousel";
import { ContactUs } from "../../../components/users/TourUsers/ContactUs";
import { BookCard } from "../../../components/users/TourUsers/BookCard";

export default function TourUsers() {
  const { instance, user, loggedUser } = useContext(AuthContext);
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data;

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${data?.image.path}`);
  };

  const slides = loggedUser?.images.map((image, i) => (
    <Carousel.Slide key={i}>
      <Image src={`${process.env.REACT_APP_SERVER}/gallery/${image.path}`} />
    </Carousel.Slide>
  ));

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <Title className={classes.title}> {data?.title} </Title>

      <div className={classes.inner}></div>

      <Description data={data} />

      <Carousel withIndicators loop mt={44}>
        {slides}
      </Carousel>

      {!!user ? (
        <>
          <Text transform="uppercase" weight={800} mt={35} size="md" ta="center" color="#0b4668">
            Choose dates for this adventure:
          </Text>
          <BookCard data={data} />
          <ContactUs />
        </>
      ) : (
        <Center>
          <Link radius="md" to={`/auth`} className={classes.linkButton}>
            Login for more
          </Link>
        </Center>
      )}

      <Flex w="100%" mt={44} justify="center" align="center">
        <Button onClick={() => navigate(-1)} size="sm" bg="dark-blue">
          Go back
        </Button>
      </Flex>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: "800px",
    position: "relative",
    paddingTop: rem(80),
    paddingBottom: rem(80),
    paddingLeft: "0",
    paddingRight: "0",

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },
  inner: {
    position: "relative",
    zIndex: 1,
  },
  dots: {
    position: "absolute",
    color: theme.colors.gray[1],
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  dotsLeft: {
    left: 0,
    top: 0,
  },
  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    marginBottom: "3rem",
    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },
  linkButton: {
    textDecoration: "none",
    padding: "4px 10px",
    backgroundColor: "#0b4668",
    color: "white",
    borderRadius: "5px",
    marginTop: "20px",
  },
  // description: {
  //   textAlign: "center",
  //   [theme.fn.smallerThan("xs")]: {
  //     textAlign: "justify",
  //     fontSize: theme.fontSizes.sm,
  //   },
  // },
}));
