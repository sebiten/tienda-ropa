import Carrousel from "@/components/ui/Carrousel";
import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Carrousel />
      <Button>Hola</Button>
    </main>
  );
}
