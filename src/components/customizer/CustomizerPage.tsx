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
  const { glove } = useCustomizationStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    // Override the price to $90
    const gloveWithFixedPrice = {
      ...glove,
      basePrice: 90,
      customizationCost: 0
    };
    addToCart(gloveWithFixedPrice, 1);
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
          <div className="text-xl font-bold text-gold">$90.00</div>
        </div>

        <Tabs defaultValue="colors">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="material">Materials</TabsTrigger>
            <TabsTrigger value="size">Size</TabsTrigger>
            <TabsTrigger value="custom">Custom Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
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

        <div className="mt-8 sticky bottom-6">
          <button
            onClick={handleAddToCart}
            className="w-full btn btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart - $90.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizerPage;