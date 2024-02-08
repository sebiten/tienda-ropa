import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggle-darkmode";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 bg-inherit border-b">
      <nav className="md:flex justify-between w-full py-6 px-10 text-lg bg-transparent">
        <div className="flex items-center">
          <Link className="flex items-center justify-center" href="/">
            <p className="uppercase text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-lime-600 to-purple-800">
              Pilcheria Online
            </p>
          </Link>
        </div>
        <div className="w-full md:w-auto" id="menu">
          <ul className="flex gap-4  font-sans uppercase text-lg py-4">
            <ModeToggle />
            <div className="bg-gradient-to-r flex gap-4  justify-center text-transparent bg-clip-text from-lime-600 to-purple-800 font-bold">
              <li>
                <Link
                  className="block hover:text-gray-200 hover:scale-95"
                  href="/shop"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  className="block hover:text-gray-200 hover:scale-95"
                  href="#"
                >
                  Usados
                </Link>
              </li>
              <li>
                <Link
                  className="block hover:text-gray-200 hover:scale-95"
                  href="#"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  className="block hover:text-gray-200 hover:scale-95"
                  href="#"
                >
                  Blog
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
