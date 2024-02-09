"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import supabase, { getFormattedDate } from "@/lib/utils";
import { useAppContext } from "@/context";

export default function Page({ params }: any) {
  const [data, setData] = useState<any>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { cartItems, addToCart } = useAppContext();
  console.log(cartItems);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const size = formData.get("size");

    const itemId = params.prenda;

    if (itemId && size) {
      const itemExists = cartItems.some(
        (item: any) => item.id === itemId && item.size === size
      );

      if (!itemExists) {
        addToCart({ id: itemId, size: size });
      }
    }
  };

  const handleCartButton = () => {
    const itemId = params.prenda;

    if (itemId && selectedSize) {
      const itemExists = cartItems.some(
        (item: any) => item.id === itemId && item.size === selectedSize
      );

      if (!itemExists) {
        addToCart({ id: itemId, size: selectedSize });
      }
    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("prenda")
        .select("*")
        .eq("id", params.prenda);
      setData(data);
    };

    fetchPosts();
  }, [params.prenda, setData]);

  return (
    <section className="flex mt-10 w-full items-center justify-center max-w-7xl mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        {data?.map((item: any) => (
          <div key={item.id} className="flex flex-initial gap-8 p-4 rounded-lg">
            <Image
              src={item.images}
              width={400}
              height={400}
              quality={80}
              alt={item.name}
              className="rounded-lg shadow-md object-fit  mx-auto mb-4"
            />
            <Image
              src={item.imagestwo}
              width={400}
              height={400}
              quality={80}
              alt={item.name}
              className="rounded-lg shadow-md object-fit  mx-auto mb-4"
            />
            <form onSubmit={handleSubmit}>
              <p className="text-xl font-semibold mb-2">{item.title}</p>

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
                  <option value="" disabled>
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
                  onClick={handleCartButton}
                  className="hover:underline"
                >
                  Agregar al Carrito
                </Button>
              </div>
              {/* <Button
                type="submit"
                className="hover:underline w-full mt-2"
              >
                Comprar directamente
              </Button> */}
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
