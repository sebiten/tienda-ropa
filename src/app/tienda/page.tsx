"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/utils";
import { ItemData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

// Componente principal
export default function Page() {
  const [searchResults, setSearchResults] = useState<ItemData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6; // Cambia según tus necesidades

  // Maneja el cambio en el campo de búsqueda
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;
    setText(search);
    setIsLoading(true);
  }

  // Realiza la búsqueda al cambiar el texto
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const offset = (currentPage - 1) * perPage;
        const { data } = await supabase
          .from("prenda")
          .select("*")
          .ilike("title", `%${text}%`)
          .range(offset, offset + perPage - 1)
          .limit(perPage);
        setSearchResults(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [text, currentPage]);

  return (
    <div>
      <div id="search" className="mx-auto max-w-sm">
        <h2 className="text-center font-bold text-2xl my-10">
          <span className="border-b-4 border-green-400">
            Explora tus prendas aquí
          </span>
        </h2>
        {/* Input para la búsqueda */}
        <Input
          onChange={(event) => handleChange(event)}
          value={text}
          type="text"
          placeholder="Buscar prenda"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8 mx-auto max-w-7xl">
        {/* Muestra resultados de búsqueda o prenda completa */}
        {isLoading && (
          <Skeleton className="h-screen w-screen max-w-7xl mx-auto" />
        )}
        {!isLoading &&
          (searchResults?.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            Array.isArray(searchResults) &&
            searchResults.map((item: ItemData) => (
              <Link
                href={`/tienda/${item.id}`}
                key={item.id}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-[100%] mx-auto"
              >
                {/* Imagen de la prenda */}
                <Image
                  src={item.images}
                  width={1920}
                  height={1080}
                  layout="responsive"
                  quality={80}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
                {/* Overlay para efecto hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
                {/* Detalles de la prenda */}
                <div className="p-2">
                  <h3 className="text-sm font-semibold transition-opacity duration-300 ease-in-out">
                    {item.title}
                  </h3>
                  <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs font-medium transition-opacity duration-300 ease-in-out">
                      {item.sizes
                        ? item.sizes.split(",").join(", ")
                        : "No sizes available"}
                    </p>
                  </div>
                  <p className="text-xs font-medium transition-opacity duration-300 ease-in-out my-2">
                    {item.inStock > 0 ? (
                      <span className="text-green-500">
                        {item.inStock} unidades disponibles
                      </span>
                    ) : (
                      <span className="text-red-500">Sin stock</span>
                    )}
                  </p>
                  <p className="text-lg font-bold mt-1 transition-opacity duration-300 ease-in-out">
                    ${item.price}
                  </p>
                </div>
              </Link>
            ))
          ))}
      </div>
      <div className="flex justify-center my-4">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-4">{currentPage}</span>
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={!searchResults || searchResults.length < perPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
