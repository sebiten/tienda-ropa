"use client";
import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  // aqui abajo va la logica
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        setLoadingInitial,
        loadingInitial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
