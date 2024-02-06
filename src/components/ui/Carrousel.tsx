import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
interface ICarrouselProps {}

export default function Carrousel() {
  return (
    <Carousel
      className="w-full max-w-xs
       m-auto my-20"
    >
      <CarouselContent>
        <CarouselItem>
          <Image src="/next.svg" width={400} height={400} alt="next" />
        </CarouselItem>
        <CarouselItem>
          <Image src="/next.svg" width={400} height={400} alt="next" />
        </CarouselItem>
        <CarouselItem>
          <Image src="/vercel.svg" width={400} height={400} alt="next" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
