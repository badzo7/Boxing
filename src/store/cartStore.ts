import { create } from 'zustand';
import { CustomGlove, TextSettings, CustomImage, Zone } from '../store/customizationStore';
import { GloveOrder } from '../types/order';

interface CartItem {
  id: string;
  glove: CustomGlove;
  image: string;
  price: number;
  quantity: number;
  order: GloveOrder;
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
    const order: GloveOrder = {
      id: glove.id,
      status: 'processing',
      statusHistory: [
        { status: 'processing', timestamp: new Date().toISOString() }
      ],
      gloveConfiguration: {
        ...glove,
        textElements: Object.entries(textZones)
          .filter(([, v]) => v.text)
          .map(([zone, v]) => ({
            zone,
            text: v.text,
            font: v.font,
            color: v.color,
            size: v.size,
            rotation: v.rotation,
            x: v.x,
            y: v.y,
          })),
        imageElements: Object.entries(customImages)
          .flatMap(([zone, imgs]) =>
            imgs.map(img => ({
              zone,
              url: img.url,
              transform: img.transform
            }))
          )
      },
      pricing: {
        basePrice: glove.basePrice,
        colorUpcharges: glove.customizationCost,
        materialUpcharge: glove.material.price,
        customizationCharges:
          Object.values(textZones).filter(z => z.text).length * 4.99 +
          Object.values(customImages).flat().length * 7.99,
        shipping: 9.99,
        tax: 8.99,
        total: price + 9.99 + 8.99
      }
    };

    set((state) => ({
      items: [
        ...state.items,
        {
          id: glove.id,
          glove,
          image,
          price,
          quantity,
          order
        }
      ]
    }));
  },

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0)
}));
