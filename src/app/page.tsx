import Carrousel from "@/components/ui/Carrousel";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_PROYECT_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export default async function Home() {
  const { data: prenda, error } = await supabaseAdmin
    .from("prenda")
    .select("*")
    .order("id");
  if (error) {
    console.log(error);
  }

  return (
    <>
      <Carrousel />
      <main>
        <div className="grid grid-cols-3 gap-4 justify-center place-content-center plac items-center max-w-5xl mx-auto">
          {prenda?.map((item): any => (
            <Link
              href={`/${item.id}`}
              key={item.id}
              className="p-0 text-center"
            >
              <Image
                src={item.imageUrl}
                width={200}
                height={200}
                quality={80}
                alt={item.name}
                className="rounded-lg shadow-md object-contain w-[200px] h-[200px] mx-auto"
              />
              <p className="text-xl font-semibold">{item.name}</p>
              <p className="text-gray-500">{item.created_at}</p>
              <p className="text-gray-700">{item.description}</p>
              <button className="mt-2 text-blue-500 hover:underline">
                Ver más
              </button>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
