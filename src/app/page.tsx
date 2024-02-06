import Carrousel from "@/components/ui/Carrousel";
import NavBar from "@/components/ui/NavBar";
import Prendas from "@/components/ui/Prendas";

export default function Home() {
  return (
    <>
      <NavBar />
      <Carrousel />
      <main>
        <Prendas />

      </main>
    </>
  );
}
