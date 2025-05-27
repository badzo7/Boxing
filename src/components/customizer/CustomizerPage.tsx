import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import ColorSelector from './ColorSelector';
import MaterialSelector from './MaterialSelector';
import SizeSelector from './SizeSelector';
import CustomPlacement from './CustomPlacement';
import ImageUploader from './ImageUploader';
import GloveCustomizer from './GloveCustomizer';
import { useCustomizationStore } from '../../store/customizationStore';
import { useCartStore } from '../../store/cartStore';
import { ShoppingCart } from 'lucide-react';

const CustomizerPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    glove,
    textZones,
    customImages,
    calculatePrice
  } = useCustomizationStore();

  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const preview = canvas?.toDataURL('image/png') || '';
    const price = calculatePrice();

    addToCart(glove, textZones, customImages, preview, price, 1);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-20">
      {/* 3D Preview */}
      <div className="w-full lg:w-3/5 h-[500px] lg:h-auto">
        <GloveCustomizer />
      </div>

      {/* Customization Panel */}
      <div className="w-full lg:w-2/5 p-6 bg-neutral-900 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customize Your Gloves</h2>
          <div className="text-xl font-bold text-gold">
            ${calculatePrice().toFixed(2)}
          </div>
        </div>

        <Tabs defaultValue="colors">
          <TabsList className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="flex gap-2 flex-wrap">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="material">Materials</TabsTrigger>
              <TabsTrigger value="size">Size</TabsTrigger>
              <TabsTrigger value="custom">Custom Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </div>

            <button
              onClick={handleAddToCart}
              className="shrink-0 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart - ${calculatePrice().toFixed(2)}
            </button>
          </TabsList>

          <TabsContent value="colors">
            <ColorSelector />
          </TabsContent>

          <TabsContent value="material">
            <MaterialSelector />
          </TabsContent>

          <TabsContent value="size">
            <SizeSelector />
          </TabsContent>

          <TabsContent value="custom">
            <CustomPlacement />
          </TabsContent>

          <TabsContent value="image">
            <ImageUploader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomizerPage;
