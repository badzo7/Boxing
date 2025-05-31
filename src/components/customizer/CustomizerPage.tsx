import React from 'react'; 
import GloveViewer from '../components/GloveViewer';
import ColorSelector from '../components/customizer/ColorSelector';
import TextCustomization from '../components/customizer/TextCustomization';
import ImageUploader from '../components/customizer/ImageUploader';
import SizeSelector from '../components/customizer/SizeSelector';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Button } from '@/components/ui/button';
import { useCustomizationStore } from '../store/customizationStore';

export default function CustomizerPage() {

  const handleBuy = async () => {
    const { glove, textZones, customImages } = useCustomizationStore.getState();

    const orderData = {
      colors: {
        fingers: glove.fingersColor,
        innerPalm: glove.innerPalmColor,
        outerPalm: glove.outerPalmColor,
        innerThumb: glove.innerThumbColor,
        outerThumb: glove.outerThumbColor,
        strap: glove.strapColor,
        wrist: glove.wristColor,
        wristOutline: glove.wristOutlineColor,
        outline: glove.outlineColor,
      },
      size: glove.size,
      texts: textZones,
      images: customImages,
    };

    try {
      const res = await fetch('https://ton-backend.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        alert('✅ Commande envoyée avec succès !');
      } else {
        alert('❌ Erreur lors de l’envoi de la commande.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Erreur réseau.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen pt-20 overflow-hidden">

      {/* 🥊 3D Viewer on the left */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-neutral-900">
        <GloveViewer />
      </div>

      {/* 🎨 Customization Panel on the right */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto px-6 py-8 bg-neutral-950 border-l border-neutral-800">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="flex gap-2 mb-6 flex-wrap">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="size">Size</TabsTrigger>
            <TabsTrigger value="text">Custom Text</TabsTrigger>
            <TabsTrigger value="images">Custom Image</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <ColorSelector />
          </TabsContent>

          <TabsContent value="materials">
            <div className="space-y-4 text-neutral-300">
              <h4 className="text-xl font-semibold text-white">How Our Gloves Are Made</h4>
              <p>
                Our gloves are crafted from premium-grade leather, carefully selected for durability, flexibility,
                and comfort. Each glove is hand-cut and expertly stitched to ensure a perfect anatomical fit and long-lasting performance.
              </p>
              <p>
                Inside, the gloves are lined with breathable moisture-wicking fabric to keep your hands cool and dry. 
                Multi-layered high-density foam provides unmatched shock absorption while protecting your knuckles and wrists.
              </p>
              <p>
                Combining traditional craftsmanship with cutting-edge design, our gloves are battle-tested and built to perform — in the gym, in the ring, and beyond.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="size">
            <SizeSelector />
          </TabsContent>

          <TabsContent value="text">
            <TextCustomization />
          </TabsContent>

          <TabsContent value="images">
            <ImageUploader />
          </TabsContent>
        </Tabs>

        {/* ✅ Buy Button */}
        <Button className="mt-8 w-full" onClick={handleBuy}>
          Acheter maintenant
        </Button>
      </div>
    </div>
  );
}
