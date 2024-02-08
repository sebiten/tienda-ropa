import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabaseAdmin } from "@/components/ui/ShopListPage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getFormattedDate from "@/lib/utils";
import Carrousel from "@/components/ui/Carrousel";

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
    <section className="flex w-full items-center justify-center max-w-7xl mx-auto">
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
            <form action={create}>
              <p className="text-xl font-semibold mb-2">{item.title}</p>

              <p className="text-gray-500 text-sm mb-2">
                {getFormattedDate(item.created_at)}
              </p>
              <p className="text-gray-700 text-sm mb-4">{item.description}</p>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un talle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      {item.sizes ? (
                        <div className="text-xl font-semibold">
                          {item.sizes
                            .split(",")
                            .map((size: string, index: string) => (
                              <SelectItem key={index} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                        </div>
                      ) : (
                        <p>No sizes available</p>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button type="submit" className="hover:underline">
                  Agregar al Carrito
                </Button>
              </div>
              <Button
                type="submit"
                className="hover:underline w-[334px] mt-4
              "
              >
                Comprar directamente
              </Button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
