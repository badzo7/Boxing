import { create } from 'zustand';
import { CustomGlove, TextSettings, CustomImage, Zone } from '../store/customizationStore';

export interface CartItem {
  id: string;
  glove: CustomGlove;
  textZones: Record<Zone, TextSettings>;
  customImages: Record<Zone, CustomImage[]>;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (
    glove: CustomGlove,
    textZones: Record<Zone, TextSettings>,
    customImages: Record<Zone, CustomImage[]>,
    image: string,
    price: number,
    quantity: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (glove, textZones, customImages, image, price, quantity) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === glove.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === glove.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: glove.id,
            glove,
            textZones,
            customImages,
            image,
            price,
            quantity,
          },
        ],
      };
    });
  },
  
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
}));
