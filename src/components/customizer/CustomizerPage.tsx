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
import { ShoppingCart, Check } from 'lucide-react';
import OrderSummary from '../checkout/OrderSummary';

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
            <TabsTrigger value="cart">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Cart
            </TabsTrigger>
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

          <TabsContent value="cart">
            <div className="space-y-6">
              <div className="bg-neutral-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <OrderSummary order={{
                  id: 'preview',
                  createdAt: new Date().toISOString(),
                  gloveConfiguration: {
                    fingersColor: { name: glove.fingersColor.name, hex: glove.fingersColor.hex },
                    innerPalmColor: { name: glove.innerPalmColor.name, hex: glove.innerPalmColor.hex },
                    outerPalmColor: { name: glove.outerPalmColor.name, hex: glove.outerPalmColor.hex },
                    innerThumbColor: { name: glove.innerThumbColor.name, hex: glove.innerThumbColor.hex },
                    outerThumbColor: { name: glove.outerThumbColor.name, hex: glove.outerThumbColor.hex },
                    strapColor: { name: glove.strapColor.name, hex: glove.strapColor.hex },
                    wristColor: { name: glove.wristColor.name, hex: glove.wristColor.hex },
                    wristOutlineColor: { name: glove.wristOutlineColor.name, hex: glove.wristOutlineColor.hex },
                    outlineColor: { name: glove.outlineColor.name, hex: glove.outlineColor.hex },
                    material: glove.material,
                    size: glove.size,
                    textElements: [],
                    imageElements: []
                  },
                  customerDetails: {
                    id: 'preview',
                    name: '',
                    email: '',
                    shippingAddress: {
                      street: '',
                      city: '',
                      state: '',
                      postalCode: '',
                      country: ''
                    }
                  },
                  manufacturingInstructions: '',
                  qualityChecklist: [],
                  status: 'pending',
                  statusHistory: [],
                  pricing: {
                    basePrice: 90,
                    colorUpcharges: 0,
                    materialUpcharge: 0,
                    customizationCharges: 0,
                    subtotal: 90,
                    tax: 7.20,
                    shipping: 15.99,
                    total: 113.19
                  }
                }} />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart - $90.00
              </button>

              <div className="bg-navy/30 rounded-lg border border-gold/20 p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold" />
                  Satisfaction Guaranteed
                </h4>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• 30-day money-back guarantee</li>
                  <li>• Free shipping on orders over $150</li>
                  <li>• Expert craftsmanship</li>
                  <li>• Premium materials</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Fixed Add to Cart Button */}
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