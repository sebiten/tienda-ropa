"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/utils";
import { ItemData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context";
import { sizestofilter } from "@/constantes/constantes";

export default function Page() {
  const { setCurrentPage } = useAppContext();
  const [filteredSize, setFilteredSize] = useState<string>("");
  const [filteredType, setFilteredType] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ItemData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [currentPage, _setCurrentPage] = useState(1);
  const perPage = 6;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "search") {
      setText(value);
    } else if (name === "size") {
      setFilteredSize(value);
    } else if (name === "type") {
      setFilteredType(value);
    }

    setIsLoading(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const offset = (currentPage - 1) * perPage;
        let query = supabase
          .from("prenda")
          .select("*")
          .ilike("title", `%${text}%`);

        if (filteredType) {
          query = query.eq("type", filteredType);
        }

        if (filteredSize) {
          query = query.ilike("sizes", `%${filteredSize}%`);
        }

        const { data } = await query
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
  }, [text, currentPage, filteredSize, filteredType]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <form
        id="search&filter"
        className="flex flex-col items-center mt-10"
        onChange={() => handleFilterChange}
      >
        <h2 className="text-center font-bold text-2xl mb-6">
          <span className="border-b-4 border-green-400">
            Explora tus prendas aquí
          </span>
        </h2>
        <Input
          onChange={(event) => handleFilterChange(event)}
          value={text}
          name="search"
          type="text"
          placeholder="Buscar prenda"
          className="mb-2 max-w-lg"
        />
        <div className="flex items-center justify-center space-x-4">
          <select
            name="size"
            className="p-2 rounded-full sm:rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-lg duration-200 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            <option value="">Selecciona un talle</option>
            {sizestofilter ? (
              sizestofilter.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No hay tallas disponibles
              </option>
            )}
          </select>
          <select
            name="type"
            className="p-2 rounded-full sm:rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:shadow-lg duration-200 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            <option value="">Selecciona el tipo</option>
            <option value="shirts">Remera</option>
            <option value="long sleeve tee">Camiseta</option>
          </select>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8">
        {isLoading ? (
          <Skeleton className="h-screen w-screen max-w-7xl mx-auto" />
        ) : searchResults?.length === 0 ? (
          <p className="text-center">No se encontraron resultados.</p>
        ) : (
          searchResults &&
          searchResults.map((item: ItemData) => (
            <Link
              href={`/tienda/${item.id}`}
              key={item.id}
              className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full mx-auto"
            >
              <Image
                src={item.images}
                width={1920}
                height={1080}
                layout="responsive"
                quality={80}
                alt={item.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
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
        )}
      </div>

      <div className="flex justify-center my-4">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-4"
        >
          Anterior
        </button>
        <span className="mx-4">{currentPage}</span>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!searchResults || searchResults.length < perPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
