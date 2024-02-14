"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import supabase, { getFormattedDate } from "@/lib/utils";
import { useAppContext } from "@/context";
import { CartItem, ItemData } from "@/types/types";

export default function Page({ params }: any) {
  const [data, setData] = useState<ItemData[]>([]);
  const { handleCartButton, selectedSize, handleSizeChange } = useAppContext();
  const itemId = params.prenda;

  // Use effect to fetch data for a specific item (prenda) from Supabase on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("prenda")
        .select("*")
        .eq("id", params.prenda);
      if (data) {
        setData(data);
      }
    };

    fetchPosts();
  }, [params.prenda, setData]);

  return (
    <section className="flex mt-10 w-full items-center justify-center max-w-7xl mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        {data?.map((item: ItemData) => (
          <div key={item.id} className="flex gap-8 p-4 rounded-lg">
            <Image
              src={item.images}
              width={400}
              height={400}
              quality={80}
              alt={item.title}
              className="rounded-lg shadow-md object-fit  mx-auto mb-4"
            />
            <Image
              src={item.imagestwo}
              width={400}
              height={400}
              quality={80}
              alt={item.title}
              className="rounded-lg shadow-md object-fit  mx-auto mb-4"
            />
            <form>
              <p className="text-xl font-semibold mb-2">{item.title}</p>
              <p className="text-xl font-semibold mb-2">${item.price}</p>

              <p className="text-gray-500 text-sm mb-2">
                {getFormattedDate(item.created_at)}
              </p>
              <p className="text-gray-700 text-sm mb-4">{item.description}</p>
              <div className="flex flex-col gap-2">
                <select
                  name="size"
                  className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleSizeChange}
                  value={selectedSize}
                >
                  <option value="" >
                    Selecciona un talle
                  </option>
                  {item.sizes ? (
                    item.sizes.split(",").map((size: string, index: number) => (
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
                <Button
                  type="button"
                  onClick={() => handleCartButton({ itemId: itemId })}
                  className="hover:underline"
                >
                  Agregar al Carrito
                </Button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
