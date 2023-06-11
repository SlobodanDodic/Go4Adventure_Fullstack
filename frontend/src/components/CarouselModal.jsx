import { useState } from "react";
import { Modal, rem } from "@mantine/core";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";

export default function CarouselModal({ opened, setOpened, editor }) {
  const TRANSITION_DURATION = 200;
  // const [embla, setEmbla] = (useState < Embla) | (null > null);
  const [embla, setEmbla] = useState(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const addImage = (e) => {
    const url = e.target.getAttribute("src");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setOpened(false);
  };

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
        <Carousel.Slide>
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60"
            alt="unsplash"
            style={{ width: rem(300), height: rem(200), objectFit: "cover" }}
            onClick={addImage}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60"
            alt="unsplash"
            style={{ width: rem(300), height: rem(200), objectFit: "cover" }}
            onClick={addImage}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
            alt="unsplash"
            style={{ width: rem(300), height: rem(200), objectFit: "cover" }}
            onClick={addImage}
          />
        </Carousel.Slide>
      </Carousel>
    </Modal>
  );
}
