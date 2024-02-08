import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_PROYECT_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export default async function ShopListPage() {
  const { data: prenda, error } = await supabaseAdmin
    .from("prenda")
    .select("*")
    .order("id");
  if (error) {
    console.log(error);
  }

  interface Product {
    id: number;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    type: string;
    tags: string[];
    title: string;
    gender: string;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8 mx-auto max-w-7xl">
        {prenda?.map((item) => (
          <Link
            href={`/tienda/${item.id}`}
            key={item.id}
            className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-[100%] mx-auto"
          >
            <Image
              src={item.images}
              width={100}
              height={100}
              quality={80}
              layout="responsive"
              alt={item.description}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
            <div className="p-2">
              <h3 className=" text-sm font-semibold  transition-opacity duration-300 ease-in-out">
                {item.title}
              </h3>
              <div className="flex flex-row justify-between mt-1">
                <p className=" text-xs font-medium  transition-opacity duration-300 ease-in-out">
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
              <p className=" text-lg font-bold mt-1 transition-opacity duration-300 ease-in-out">
                ${item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
