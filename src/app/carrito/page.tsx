"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import Image from "next/image";
import { CartItem, ItemData } from "@/types/types";
import supabase from "@/lib/utils";

export default function Page() {
  const { cartItems, setCartItems, setLoadingInitial, loadingInitial } =
    useAppContext();
  const [cartFetchData, setCartFetchData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const totalPrice = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

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
          cartItems.forEach((item: ItemData) => {
            itemCountMap[item.id] = itemCountMap[item.id]
              ? itemCountMap[item.id] + 1
              : 1;
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
    <div className="flex mx-auto p-4">
      {loading ? (
        <p>Cargando...</p>
      ) : cartFetchData.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {cartFetchData.map((item: ItemData, index: number) => (
            <div key={index} className="p-4 border rounded shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  height={200}
                  width={200}
                  className="w-24 h-24 object-cover mr-4"
                  src={item.images}
                  alt={item.title}
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-gray-600">{item.created_at}</p>
                  <p className="text-gray-700">
                    {item.description.slice(0, 50) + "..."}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">Cantidad:{item.quantity}</p>

                  <button className="bg-red-500 text-white p-2 ml-2">
                    Eliminar
                  </button>
                </div>
                <p className="text-gray-800">${item.price}</p>
              </div>
            </div>
          ))}
          <div className="col-span-3 flex justify-end">
            <p className="text-gray-800 font-bold">Total:</p>
            <p className="text-gray-800 font-bold ml-2">${totalPrice}</p>
            <button className="bg-green-500 text-white p-2 ml-4">Pagar</button>
          </div>
        </div>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
    </div>
  );
}
