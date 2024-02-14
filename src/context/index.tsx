"use client";
import { CartItem } from "@/types/types";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  // aqui abajo va la logica
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  

  // Use effect to load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
      }
    }

    // Set loading state to false once initial loading is done
    setLoadingInitial(false);
  }, [setCartItems, setLoadingInitial]);

  // Use effect to save cart items to localStorage whenever the cartItems state changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error storing cart items in localStorage:", error);
    }
  }, [cartItems]);


// Function to handle the cart button click
  const handleCartButton = ({ itemId }: { itemId: any }) => {
    // Extract item ID and selected size from the parameters
    const size = selectedSize;

    // Check if both item ID and size are selected
    if (!itemId || !size) {
      console.error("Please select an item and size.");
      return;
    }

    // Find the existing item in the cart based on ID and size
    const existingItem: CartItem | undefined = cartItems.find(
      (item: CartItem) => item.id === itemId && item.size === size
    );

    // If the item already exists in the cart, increase its quantity
    if (existingItem) {
      setCartItems((prevCartItems: CartItem[]) =>
        prevCartItems.map((item: CartItem) =>
          item.id === itemId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      console.log("Item quantity increased.");
    } else {
      // If the item doesn't exist in the cart, add it with quantity 1
      setCartItems((prevCartItems: CartItem[]) => [
        ...prevCartItems,
        { id: itemId, size, quantity: 1 },
      ]);
      console.log("Item added to cart.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        setCartItems,
        setLoadingInitial,
        loadingInitial,
        handleCartButton,
        setSelectedSize,
        handleSizeChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
