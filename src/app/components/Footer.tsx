import Image from "next/image";
import Link from "next/link";
import {
  FaGithubAlt,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="h-full">
      <div className="container mx-auto px-4 h-full">
        <hr className="mb-4 border-b-2 border-gray-700" />
        <div className=" flex justify-center gap-4">
          <div className="flex flex-col justify-center items-center gap-2 ">
            <Link
              target="_parent"
              href="/"
              className="text-center text-yellow-500 font-bold uppercase no-underline"
            >
              {/* <Image
                src="/abelardo-blog.png"
                alt="Abelardo-blog"
                width={50}
                priority={true}
                height={300}
                className="w-auto h-auto"
              /> */}
            </Link>
            <Link
              href="/"
              className="text-center font-title  font-bold uppercase no-underline"
            >
              Pilcheria
              <span className=" font-normal"> Online</span>
            </Link>
            <div className=" flex flex-row justify-center sm:justify-evenly align-middle gap-4  text-4xl lg:text-5xl">
              <Link
                href="https://github.com/sebiten"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubAlt className="text-xl text-gray-500 hover:text-gray-400" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sebdevspace/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-xl hover:text-blue-500" />
              </Link>
              <Link
                href="https://www.instagram.com/abelardo.blog/"
                target="_blank"
                className="block text-2xl  hover:text-blue-500 underline transform transition-colors duration-300"
              >
                <FaInstagram className="text-xl hover:text-yellow-500" />
              </Link>
              <Link
                href="https://www.tiktok.com/@abelardoblog"
                target="_blank"
                className="block text-2xl  hover:text-blue-500 underline transform transition-colors duration-300"
              >
                <FaTiktok className="text-xl hover:text-yellow-500" />
              </Link>
            </div>
            <p className="text-sm  font-bold ">
              Hecho por{" "}
              <Link
                href="https://www.sebdevspace.me"
                className="text-green-500"
              >
                Sebastian Burgos
              </Link>{" "}
              con ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
