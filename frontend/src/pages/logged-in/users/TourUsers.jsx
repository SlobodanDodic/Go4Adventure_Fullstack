import { useLocation } from "react-router-dom";
import { createStyles, Title, Container, rem, Image, Text } from "@mantine/core";
import { Dots } from "../../../components/Tour/Dots";
import { AccordionText } from "../../../components/Tour/AccordionText";
import { Description } from "../../../components/Tour/Description";
import { Carousel } from "@mantine/carousel";
import { ContactUs } from "../../../components/Tour/ContactUs";
import { BookCard } from "../../../components/Tour/BookCard";

export default function TourUsers() {
  const location = useLocation();
  const data = location.state?.data;

  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <Title className={classes.title}> {data.title} </Title>

      <div className={classes.inner}></div>

      <Description data={data} />

      <Carousel withIndicators loop mt={44}>
        {data.images.map((image) => (
          <Carousel.Slide key={image}>
            <Image src={image} height={320} />
          </Carousel.Slide>
        ))}
      </Carousel>

      <AccordionText data={data} />

      <Text transform="uppercase" weight={800} size="md" ta="center" color="#0b4668">
        Choose dates for this adventure:
      </Text>
      <BookCard data={data} />
      <ContactUs />
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
  // description: {
  //   textAlign: "center",
  //   [theme.fn.smallerThan("xs")]: {
  //     textAlign: "justify",
  //     fontSize: theme.fontSizes.sm,
  //   },
  // },
}));
