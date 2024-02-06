import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Button>Hola</Button>
    </main>
  );
}
