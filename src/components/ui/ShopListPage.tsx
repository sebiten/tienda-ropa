import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <div className="grid grid-cols-3 gap-10 max-w-5xl mx-auto mt-20 ">
        {prenda?.map((item): any => (
          <Link
            href={`/${item.id}`}
            key={item.id}
            className="border-t-8 border-s-8 border-b-8 border-r-8 m-0"
          >
            <div className="flex flex-col items-center justify-center text-center  gap-6">
              <Image
                src={item.images}
                width={200}
                height={200}
                quality={80}
                alt={item.description}
                className="rounded-lg shadow-md object-contain w-[200px] h-[200px] m-auto "
              />

              <p className="text-xl font-semibold">{item.title}</p>
              <p className="text-xl font-semibold">{item.gender}</p>
              {item.sizes ? (
                <p className="text-xl font-semibold">
                  {item.sizes.split(",").join(", ")}
                </p>
              ) : (
                <p>No sizes available</p>
              )}
              <p className="text-gray-500">${item.price}</p>
              <button className="mt-2 text-blue-500 hover:underline">
                Ver más
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
