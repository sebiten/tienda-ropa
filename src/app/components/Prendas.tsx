import React from "react";
import { prendas as product } from "@/constantes/constantes";
import Image from "next/image";
import Link from "next/link";

interface prenda {
  id: string;
  name: string;
  description: string;
}

const Prenda: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-10">
      {product.map((product, index) => (
        <Link
          href={`/${product.id}`}
          key={product.id}
          className=" p-4 rounded-lg shadow-md"
        >
          <Image
            alt={product.name}
            width={400}
            height={400}
            src={product.url}
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.descripcion}</p>
          <div className="mt-4 flex justify-between">
            <button className=" px-4 py-2 rounded-md border">
              Ver detalles
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
              Agregar al carrito
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Prenda;
