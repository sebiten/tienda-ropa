"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { pathsDeImagenes } from "@/constantes/constantes";

export default function Carrousel() {
  return (
    <section className="lg:flex gap-10 items-center justify-center max-w-1/2 md:max-w-screen-xl mx-auto">
      <div className="mr-7">
        <h1 className="text-center text-4xl font-bold uppercase font-sans   ">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-lime-600 to-purple-800">
            Bienvenidos a pilcheria online
          </span>
        </h1>
        <p className="text-center text-lg mx-auto font-normal mt-4">
          Aca encontraras ropa de distintas variedades para hombres, tanto
          nuevas como usadas y lo mejor? A un precio excelente. 👋
        </p>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="m-0 p-0 my-20 "
      >
        <CarouselContent>
          {pathsDeImagenes.map((path, index) => (
            <CarouselItem key={index}>
              <Image
                src={path}
                width={1920}
                height={1080}
                alt={`Imagen ${index + 1}`}
                className="mx-auto w-[400px] h-[400px] lg:w-[58rem] lg:h-[28rem] rounded-3xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
