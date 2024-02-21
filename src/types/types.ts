export interface AppContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export interface ItemData {
  prenda: ItemData;
  id: string;
  title: string;
  price: number;
  created_at: string;
  description: string;
  inStock: number;
  images: string;
  imagestwo: string;
  size: string;
  sizes?: string;
  quantity?: number;

  // Make size optional since it's not always present in ItemData
}

export interface CartItem {
  id: string;
  size: string;
  price: number;
  quantity: number;
}
