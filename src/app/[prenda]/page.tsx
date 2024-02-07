import React from "react";
import { supabaseAdmin } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { log } from "console";

export default async function Page({ params }: any) {
  async function create(formData: FormData) {
    "use server";
    const id = params.id;
    console.log(id);
  }

  const { data, error } = await supabaseAdmin
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);
  if (error) {
    console.log(error);
  }

  return (
    <section className="flex items-center justify-center">
      <div className="grid grid-cols-1 gap-8 ">
        {data?.map((item: any) => (
          <Link
            href={`/${item.id}`}
            key={item.id}
            className="border flex gap-8 border-gray-200 p-4 rounded-lg transition-transform transform hover:scale-105"
          >
            <Image
              src={item.imageUrl}
              width={400}
              height={400}
              quality={80}
              alt={item.name}
              className="rounded-lg shadow-md object-cover w-full h-48 mx-auto mb-4"
            />
            <form action={create}>
              <p className="text-xl font-semibold mb-2">{item.name}</p>
              <p className="text-gray-500 text-sm mb-2">{item.created_at}</p>
              <p className="text-gray-700 text-sm mb-4">{item.description}</p>
              <Button type="submit" className="hover:underline">
                Agregar al Carrito
              </Button>
            </form>
          </Link>
        ))}
      </div>
    </section>
  );
}
