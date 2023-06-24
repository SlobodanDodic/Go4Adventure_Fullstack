import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Modal, createStyles, getStylesRef } from "@mantine/core";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";

export default function CarouselModal({ opened, setOpened, editor }) {
  const { instance, loggedUser } = useContext(AuthContext);
  const { classes } = useStyles();
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const imgArray = loggedUser?.images;

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${imgArray.path}`);
  };

  const addImage = (e) => {
    const url = e.target.getAttribute("src");
    if (url) {
      console.log(url);
      editor.chain().focus().setImage({ src: url }).run();
    }
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      maw={300}
      padding={0}
      transitionProps={{ duration: TRANSITION_DURATION }}
      withCloseButton={false}
      onClose={() => setOpened(false)}
    >
      <Carousel
        classNames={classes}
        loop
        getEmblaApi={setEmbla}
        withIndicators
        breakpoints={[
          { maxWidth: "md", slideSize: "100%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        {imgArray?.map((img, i) => (
          <Carousel.Slide key={i}>
            <img
              src={`${process.env.REACT_APP_SERVER}/gallery/${img.path}`}
              alt={img.path}
              className={classes.img}
              onClick={addImage}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Modal>
  );
}

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getStylesRef("controls")}`]: {
        opacity: 1,
      },
    },
  },

  img: {
    width: "100%",
    maxWidth: "800px",
    objectFit: "cover",
  },
}));
