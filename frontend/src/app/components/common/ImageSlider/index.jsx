import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";
import classes from "./CarouselCard.module.css";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function ImageSlider({ images }) {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel
      withIndicators
      loop
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
      // w="350px"
      maw={350}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {images.map((image) => (
        <Carousel.Slide key={image}>
          <Image src={image} radius={20} w="100%" h="220px" />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
