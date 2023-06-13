import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Modal, rem } from "@mantine/core";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import useSWR from "swr";
import Spinner from "./Spinner";

export default function CarouselModal({ opened, setOpened, editor }) {
  const { user, instance } = useContext(AuthContext);

  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${data?.data?.images?.path}`);
  };

  const { data, error, isLoading } = useSWR(`/user/profile/${user}`, instance.get);

  const imgArray = data?.data?.images;

  const addImage = (e) => {
    const url = e.target.getAttribute("src");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setOpened(false);
  };

  if (isLoading) return <Spinner />;
  if (error) return <h1>{error}</h1>;

  return (
    <Modal
      opened={opened}
      size={300}
      padding={0}
      transitionProps={{ duration: TRANSITION_DURATION }}
      withCloseButton={false}
      onClose={() => setOpened(false)}
    >
      <Carousel loop getEmblaApi={setEmbla} maw={300}>
        {imgArray?.map((img, i) => (
          <Carousel.Slide key={i}>
            <img
              src={`${process.env.REACT_APP_SERVER}/gallery/${img.path}`}
              alt={img.path}
              style={{ width: rem(300), height: rem(200), objectFit: "cover" }}
              onClick={addImage}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Modal>
  );
}
