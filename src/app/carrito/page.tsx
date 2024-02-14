"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useAppContext } from "@/context";
import Image from "next/image";
import { CartItem, ItemData } from "@/types/types";
import supabase, { getFormattedDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { cartItems, setCartItems, setLoadingInitial, loadingInitial } =
    useAppContext();
  const [cartFetchData, setCartFetchData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const allPrices = cartFetchData.map(
    (item: CartItem, index: number) => item.price
  );
  const totalPrices = allPrices.reduce(
    (total: number, price: number) => total + price,
    0
  );
  const totalItems = cartFetchData.length;

  console.log(cartFetchData);

  useEffect(() => {
    const fetchItemsFromLocalStorage = () => {
      const storedItems = localStorage.getItem("cartItems");
      if (storedItems) {
        try {
          const parsedItems: CartItem[] = JSON.parse(storedItems);
          setCartItems(parsedItems);
        } catch (error) {
          console.error("Error parsing cart items from localStorage:", error);
        }
      }

      setLoadingInitial(false);
    };

    fetchItemsFromLocalStorage();
  }, [setCartItems, setLoadingInitial]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!loadingInitial) {
        const ids = cartItems.map((item: any) => item.id);

        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("prenda")
            .select("*")
            .in("id", ids);

          if (error) {
            console.error("Error fetching products:", error);
            return;
          }

          const itemCountMap: Record<string, number> = {};
          cartItems.forEach((item: CartItem) => {
            itemCountMap[item.id] = itemCountMap[item.id]
              ? itemCountMap[item.id] + item.quantity
              : item.quantity;
          });

          const updatedData = data.flatMap((item) => {
            return Array.from({ length: itemCountMap[item.id] }, () => ({
              ...item,
            }));
          });

          setCartFetchData(updatedData);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProductDetails();
  }, [cartItems, setCartItems, loadingInitial]);

  return (
    <section className="relative h-full">
      {!loading && (
        <div className="sticky dark:bg-slate-900 bg-slate-200 top-[10%] w-1/2 mx-auto z-40 flex justify-between border-b p-4 shadow-md rounded-lg ">
          <div className="flex flex-col">
            <p className="font-bold text-lg mb-2">
              <span className="border-b-4 border-green-400 text-xl">
                Checkout
              </span>
            </p>
            <p className="font-bold text-lg mb-4">
              <span>Cantidad total:</span>{" "}
              <span className="">{totalItems}</span>
            </p>
          </div>
          <div className="flex items-center mt-2 text-xl">
            <p className="font-bold mr-2 light:text-white">Total:</p>
            <p className="font-bold">${totalPrices}</p>
            <Button className="bg-green-500 p-4 ml-4 font-bold  rounded-md">
              Pagar
            </Button>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col p-4 -z-10">
        <div>
          {loading ? (
            <Spinner />
          ) : (
            cartFetchData.map((item: ItemData, index: number) => (
              <div
                key={index}
                className="p-4 max-w-6xl mx-auto border flex items-center justify-between w-full rounded shadow-md mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    height={200}
                    width={200}
                    className="w-24 h-24 object-cover mr-4"
                    src={item.images}
                    alt={item.title}
                  />
                  <div className="flex justify-between flex-col">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-600">
                      {getFormattedDate(item.created_at)}
                    </p>
                    <p className="text-gray-700">
                      {item.description.slice(0, 50) + "..."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <button className="bg-red-500 text-white p-2 ml-2">
                    Eliminar
                  </button>
                  <p className="font-bold text-xl">${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
