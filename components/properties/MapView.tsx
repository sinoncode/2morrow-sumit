"use client";

import { motion } from "framer-motion";
import { MapPin, Plus, Minus, Navigation } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price: number;
  coordinates: { lat: number; lng: number };
}

interface MapViewProps {
  properties: Property[];
}

export default function MapView({ properties }: MapViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-gray-100 rounded-2xl overflow-hidden h-[600px]"
    >
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-100">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#0ea5e9 1px, transparent 1px),
              linear-gradient(90deg, #0ea5e9 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Property markers */}
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute cursor-pointer group"
            style={{
              left: `${20 + (index % 3) * 30}%`,
              top: `${20 + Math.floor(index / 3) * 25}%`,
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-110 transition-transform">
                €{(property.price / 1000).toFixed(0)}k
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-lg shadow-lg p-3 w-48">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {property.title}
                  </p>
                  <p className="text-sky-500 font-bold">
                    €{property.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search this area button */}
      <div className="absolute top-4 left-4">
        <button className="px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Search this area
        </button>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-600">
        500 m
      </div>
    </motion.div>
  );
}
