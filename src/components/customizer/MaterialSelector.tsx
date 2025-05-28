import React from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { GloveMaterial } from '../../types/glove';

const materials: GloveMaterial[] = [
  {
    name: 'Premium Full-Grain Leather',
    description: 'Top-quality cowhide leather, full-grain for maximum durability and natural feel. Develops a unique patina over time. Ideal for professional fighters.',
    price: 49.99,
  },
  {
    name: 'Italian Leather',
    description: 'Luxurious Italian leather known for its soft texture and exceptional durability. Premium grade with natural grain pattern.',
    price: 79.99,
  },
  {
    name: 'Kangaroo Leather',
    description: 'Ultra-lightweight yet incredibly strong. Preferred by elite fighters for its superior feel and natural moisture resistance.',
    price: 99.99,
  },
  {
    name: 'Goat Leather',
    description: 'Soft and flexible while maintaining excellent durability. Natural water resistance and great for technical fighters.',
    price: 69.99,
  },
  {
    name: 'Buffalo Leather',
    description: 'Extremely durable and thick leather with excellent puncture resistance. Develops a beautiful patina with use.',
    price: 89.99,
  },
  {
    name: 'Synthetic Leather (Vegan)',
    description: 'High-performance vegan alternative made from advanced microfiber materials. Excellent durability and eco-friendly.',
    price: 39.99,
  },
];

const MaterialSelector: React.FC = () => {
  const { glove, updateMaterial } = useCustomizationStore();
  
  return (
    <div className="space-y-8">
      <div className="bg-neutral-800/50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Our Craftsmanship</h3>
        <p className="text-neutral-300 mb-4">
          Each pair of gloves is meticulously handcrafted by master artisans with decades of experience. Our process combines traditional techniques with modern technology to create the perfect boxing glove.
        </p>
        <div className="space-y-4 text-sm text-neutral-400">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
            <p>Multiple layers of high-density foam are precisely shaped and positioned for optimal impact absorption and hand protection</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
            <p>Each leather piece is carefully selected, cut, and matched to ensure consistent quality and appearance</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
            <p>Reinforced stitching at stress points using industrial-grade thread for maximum durability</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
            <p>Each glove undergoes multiple quality control checks throughout the manufacturing process</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((material) => (
          <button
            key={material.name}
            onClick={() => updateMaterial(material)}
            className={`
              p-6 rounded-xl border text-left relative transition-all duration-200
              ${glove.material.name === material.name 
                ? 'border-gold bg-gold/10' 
                : 'border-neutral-700 hover:border-gold/50 bg-neutral-800/50'
              }
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold">{material.name}</h4>
              <span className="text-gold font-medium">
                +${material.price.toFixed(2)}
              </span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">{material.description}</p>
            {glove.material.name === material.name && (
              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-navy/30 rounded-xl p-6 border border-gold/20">
        <h4 className="font-semibold mb-3">Material Care Guide</h4>
        <ul className="space-y-2 text-sm text-neutral-400">
          <li>• Clean with a damp cloth after each use to maintain leather quality</li>
          <li>• Allow gloves to air dry naturally, away from direct heat or sunlight</li>
          <li>• Apply leather conditioner every 3-4 months to prevent drying</li>
          <li>• Store in a cool, dry place with good ventilation</li>
          <li>• Use glove deodorizers to maintain freshness</li>
        </ul>
      </div>
    </div>
  );
};

export default MaterialSelector;