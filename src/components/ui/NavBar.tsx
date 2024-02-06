import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="md:flex justify-between w-full py-6 px-4 text-lg bg-[#070c1a] border-b">
        <div>
          <Link className="flex items-center justify-center" href="/">
            <Image
              alt="piclheria online"
              width={60}
              height={60}
              src="/pilcheria-logo.png"
            ></Image>
            <p className="uppercase bg-gradient-to-r text-transparent bg-clip-text from-lime-200 to-lime-600 font-black">
              Pilcheria Online
            </p>
          </Link>
        </div>
        <div className="w-full md:w-auto" id="menu">
          <ul className="gap-4 flex justify-center text-gray-300 font-bold font-sans uppercase text-lg py-4">
            <li>
              <Link
                className="block hover:text-blue-950 hover:scale-95"
                href="#"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="block hover:text-blue-950 hover:scale-95"
                href="#"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="block hover:text-blue-950 hover:scale-95"
                href="#"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                className="block hover:text-blue-950 hover:scale-95"
                href="#"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
