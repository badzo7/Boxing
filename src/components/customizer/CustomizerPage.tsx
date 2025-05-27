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
    const gloveWithFixedPrice = {
      ...glove,
      basePrice: 90,
      customizationCost: 0
    };
    addToCart(gloveWithFixedPrice, 1);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-16 lg:pt-20">
      {/* 3D Preview */}
      <div className="w-full lg:w-3/5 h-[400px] sm:h-[500px] lg:h-[calc(100vh-80px)]">
        <GloveCustomizer />
      </div>

      {/* Customization Panel */}
      <div className="w-full lg:w-2/5 p-4 sm:p-6 bg-neutral-900 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Customize Your Gloves</h2>
          <div className="text-lg sm:text-xl font-bold text-gold">$90.00</div>
        </div>

        <Tabs defaultValue="colors" className="mb-20 lg:mb-24">
          <TabsList className="flex flex-wrap gap-2 mb-6">
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

        <div className="fixed bottom-0 left-0 right-0 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 p-4 lg:p-0 bg-neutral-900 border-t lg:border-0 border-neutral-800">
          <button
            onClick={handleAddToCart}
            className="w-full btn btn-primary py-3 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-2"
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