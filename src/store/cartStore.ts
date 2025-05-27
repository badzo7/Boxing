import { create } from 'zustand';
import { CustomGlove } from '../types/glove';
import { v4 as uuidv4 } from 'uuid';

interface CartItem {
  id: string;
  glove: CustomGlove;
  quantity: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (glove: CustomGlove, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (glove, quantity) => {
    set((state) => {
      const cartItem: CartItem = {
        id: uuidv4(),
        glove: {
          ...glove,
          id: uuidv4(), // Ensure unique ID for each cart item
        },
        quantity,
        price: 90, // Fixed price at $90
      };
      
      return {
        items: [...state.items, cartItem],
      };
    });
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));