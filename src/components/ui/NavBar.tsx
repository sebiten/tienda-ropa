"use client";
import Link from "next/link";
import { ModeToggle } from "./toggle-darkmode";
import { TiShoppingCart } from "react-icons/ti";
import { useAppContext } from "@/context";
export default function NavBar() {
  const { cartItems } = useAppContext();
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );
  return (
    <div className="sticky top-0 z-50 bg-inherit border-b">
      <nav className="md:flex justify-between w-full py-6 px-10 text-lg bg-transparent">
        <div className="flex items-center">
          <Link className="flex items-center justify-center" href="/">
            <p className="uppercase text-2xl font-bold ">Pilcheria Online</p>
          </Link>
        </div>
        <div className="w-full md:w-auto" id="menu">
          <ul className="flex gap-4  uppercase text-lg py-4">
            <ModeToggle />
            <div className="bg-gradient-to-r flex gap-4  justify-center ">
              <li>
                <Link
                  className="block hover:text-gray-400 hover:scale-95"
                  href="/tienda"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  className="block hover:text-gray-400 hover:scale-95"
                  href="#"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  className="block hover:text-gray-400 hover:scale-95"
                  href="https://abelardo.blog/"
                  target="_blank"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center hover:scale-95"
                  href="/carrito"
                >
                  <TiShoppingCart size={24} />
                  <p className="">{totalItems}</p>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
