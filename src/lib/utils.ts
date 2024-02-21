import { createClient } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(dateString));
}
export function generateUUID() {
  // Obtiene la marca de tiempo actual
  const timestamp = Date.now();

  // Genera un componente aleatorio
  const randomComponent = Math.floor(Math.random() * 100000);

  // Combina la marca de tiempo con el componente aleatorio
  const uuid = `${timestamp}${randomComponent}`;

  return uuid;
}
const supabaseUrl = process.env.NEXT_PUBLIC_PROYECT_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
