import React from 'react'; 
import GloveViewer from '../components/GloveViewer';
import ColorSelector from '../components/customizer/ColorSelector';
import TextCustomization from '../components/customizer/TextCustomization';
import ImageUploader from '../components/customizer/ImageUploader'; // ✅ Add this
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';

export default function CustomizerPage() {
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
            <TabsTrigger value="images">Custom Image</TabsTrigger> {/* ✅ Ensure it's here */} 
          </TabsList>

          <TabsContent value="colors">
            <ColorSelector />
          </TabsContent>

          <TabsContent value="materials">
            <div className="text-neutral-400">Materials options coming soon</div>
          </TabsContent>

          <TabsContent value="size"> 
            <div className="text-neutral-400">Size options coming soon</div>
          </TabsContent>
 
          <TabsContent value="text">
            <TextCustomization />
          </TabsContent>

          <TabsContent value="images">
            <ImageUploader /> {/* ✅ This renders your uploader */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
