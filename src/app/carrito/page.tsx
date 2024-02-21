"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { CartItem, ItemData } from "@/types/types";
import supabase, { getFormattedDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Spinner from "../components/Spinner";
import Image from "next/image";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { cartItems, setCartItems, setLoadingInitial, loadingInitial } =
    useAppContext();
  const [loading, setLoading] = useState<boolean>(true);

  const totalPrices: number = cartItems.reduce(
    (total: number, item: ItemData) => total + (item.price || 0),
    0
  );
  const totalItems: number = cartItems.length;

  useEffect(() => {
    const fetchItemsFromLocalStorage = async () => {
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

    fetchItemsFromLocalStorage().then(() => {
      setLoading(false); // Actualiza el estado de loading después de cargar los elementos del carrito
    });
  }, [setCartItems, setLoadingInitial]);

  const handleDeleteItem = (index: number): void => {
    const updatedCartItems: CartItem[] = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

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
            cartItems?.map((item: ItemData, index: number) => (
              <div
                key={`${item.id}-${item.size}`}
                className="p-4 max-w-6xl mx-auto border flex items-center justify-between w-full rounded shadow-md mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    width={400}
                    height={400}
                    className="w-24 h-24 object-cover mr-4"
                    src={item.images}
                    alt={item.title}
                  />
                  <div className="flex justify-between flex-col">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <h2 className="text-xl font-bold">{item.size}</h2>
                    <p className="text-gray-700">
                      {item.description.slice(0, 50) + "..."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <button
                    className="bg-red-500 text-white p-2 ml-2"
                    onClick={() => handleDeleteItem(index)}
                  >
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
};

export default CheckoutPage;
