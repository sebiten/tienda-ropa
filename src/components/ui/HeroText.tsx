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
import { siteFont } from "@/app/config/fonts";
import Link from "next/link";
import { Button } from "./button";

export default function HeroText() {
  return (
    <section id="hero" className="flex items-center justify-center  py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center text-5xl font-bold uppercase text-transparent bg-clip-text">
          <span className=" bg-gradient-to-r text-transparent bg-clip-text from-lime-600 to-purple-800">
            Bienvenidos a Pilcheria Online
          </span>
        </h1>
        <p className="text-lg text-center  mx-auto mt-4">
          Encuentra ropa de distintas variedades para hombres, tanto nuevas como
          usadas. <br /> ¡Y lo mejor? A un precio excelente! 💫
        </p>
        <Link
          href="/tienda"
          className="flex justify-center text-center mt-8 px-4 py-2  rounded-lg bg-gradient-to-r from-lime-600 to-purple-800 hover:from-purple-800/70 hover:to-lime-600 font-bold"
        >
          Explorar Ahora
        </Link>
      </div>

      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="m-0 p-0 my-20"
      >
        <CarouselContent>
          {pathsDeImagenes.map((path, index) => (
            <CarouselItem key={index}>
              <Image
                src={path}
                width={1920}
                height={1080}
                alt={`Imagen ${index + 1}`}
                className="mx-auto w-[400px] h-[400px] lg:w-[60rem] lg:h-[30rem] rounded-3xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
