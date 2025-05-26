import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import ColorSelector from './ColorSelector';
import MaterialSelector from './MaterialSelector';
import SizeSelector from './SizeSelector';
import CustomPlacement from './CustomPlacement';
import ImageUploader from './customizer/ImageUploader';
import GloveCustomizer from './GloveCustomizer';

const CustomizerPage: React.FC = () => { 
  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-20">
      {/* Zone 3D */}
      <div className="w-full lg:w-3/5 h-[500px] lg:h-auto">
        <GloveCustomizer /> 
      </div>

      {/* Panneau de customisation */}
      <div className="w-full lg:w-2/5 p-6 bg-neutral-900 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default CustomizerPage;
