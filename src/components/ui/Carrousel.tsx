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
    <section className="lg:flex items-center justify-center">
      <div className="">
        <h1 className="text-center text-2xl font-bold uppercase font-sans   ">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-lime-600 to-purple-800">
            Bienvenidos a pilcheria online <br></br>
          </span>
        </h1>
        <p className="text-center  text-lg max-w-lg px-10 mx-auto font-normal">
          Aca encontraras ropa de distintas variedades para hombres, tanto
          nuevas como usadas y lo mejor? A un precio excelente. 👋
        </p>
      </div>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-xl m-auto my-20"
      >
        <CarouselContent>
          {pathsDeImagenes.map((path, index) => (
            <CarouselItem key={index}>
              <Image
                src={path}
                width={1920}
                height={1080}
                alt={`Imagen ${index + 1}`}
                className="mx-auto aspect-video w-full rounded-3xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
