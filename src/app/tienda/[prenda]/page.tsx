"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import supabase, { getFormattedDate } from "@/lib/utils";
import { useAppContext } from "@/context";
import { CartItem, ItemData } from "@/types/types";

export default function Page({ params }: any) {
  const [data, setData] = useState<ItemData[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { setCartItems, cartItems , setLoadingInitial} = useAppContext();

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleCartButton = () => {
    const itemId = params.prenda;
    const size = selectedSize;

    if (!itemId || !size) {
      console.error("Please select an item and size.");
      return;
    }

    const existingItem: CartItem | undefined = cartItems.find(
      (item: CartItem) => item.id === itemId && item.size === size
    );

    if (existingItem) {
      setCartItems((prevCartItems: CartItem[]) =>
        prevCartItems.map((item: CartItem) =>
          item.id === itemId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      console.log("Item quantity increased.");
    } else {
      setCartItems((prevCartItems: CartItem[]) => [
        ...prevCartItems,
        { id: itemId, size, quantity: 1 },
      ]);
      console.log("Item added to cart.");
    }
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }

    setLoadingInitial(false);
  }, [setCartItems, setLoadingInitial]);

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error storing cart items in localStorage:", error);
    }
  }, [cartItems]);

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
          <div key={item.id} className="flex flex-col gap-8 p-4 rounded-lg">
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
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
