import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, Check, Info } from 'lucide-react';
import { PRODUCT_ANATOMY_LAYERS } from '../services/bundlesData';

export default function ProductAnatomy() {
  const [selectedLayerId, setSelectedLayerId] = useState(2); // default layer 2 (moxa matrix)
  const activeLayer = PRODUCT_ANATOMY_LAYERS.find(l => l.id === selectedLayerId) || PRODUCT_ANATOMY_LAYERS[1];

  return (
    <section className="py-16 sm:py-24 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-700 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Bio-Engineering & Transdermal Science
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading">
            Inside The <span className="text-emerald-400">4-Layer Patch Anatomy</span>
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            Engineered at 1.28 mm ultra-thin profile to deliver clinical-grade moxibustion heat directly into the articular cartilage.
          </p>
        </div>

        {/* Anatomy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Layer Selector Buttons / Exploded Stack */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Tap a layer to inspect transdermal function:
            </p>

            {PRODUCT_ANATOMY_LAYERS.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-neutral-800 to-neutral-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                      : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                      isSelected
                        ? 'bg-emerald-500 text-neutral-950 shadow-md'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {layer.layerNumber}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {layer.name}
                      </h4>
                      <p className="text-xs text-neutral-400">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isSelected
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {layer.badge}
                    </span>
                    <span className="block text-[10px] text-neutral-400 mt-1 font-mono">
                      {layer.thickness}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Layer Mechanism Card & Exploded Visual Diagram */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Layer Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded">
                    LAYER {activeLayer.layerNumber} OF 04
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Thickness: {activeLayer.thickness}
                  </span>
                </div>
                <span className="bg-amber-400/10 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {activeLayer.badge}
                </span>
              </div>

              {/* Title & Function */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {activeLayer.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
                {activeLayer.subtitle}
              </p>

              <div className="my-5 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeLayer.functionText}
                </p>
              </div>

              {/* Key Architectural Features */}
              <div className="space-y-2.5 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Engineering Specifications:
                </h4>
                {activeLayer.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Visual Micro-Exploded Stack Representation */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dermatologically Tested on Sensitive Indian Skin</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">100% Breathable</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
