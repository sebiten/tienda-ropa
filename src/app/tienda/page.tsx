import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context";
import supabase from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function page() {
  const { data: prenda, error } = await supabase
    .from("prenda")
    .select("*")
    .order("id");
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-8 mx-auto max-w-7xl">
        <Suspense fallback={<Skeleton/>}>
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
        </Suspense>
      </div>
    </div>
  );
}
