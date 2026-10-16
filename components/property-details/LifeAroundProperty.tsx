"use client";

import { motion } from "framer-motion";
import { MapPin, Waves, ShoppingBag, Stethoscope, Train, Plane, Coffee, Anchor, Building, ArrowRight } from "lucide-react";

interface Place {
  name: string;
  distance: string;
  icon: any;
}

interface Category {
  category: string;
  places: Place[];
}

interface LifeAroundPropertyProps {
  nearbyPlaces: Category[];
}

export default function LifeAroundProperty({ nearbyPlaces }: LifeAroundPropertyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Life around the property
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Everything you need, close by.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {nearbyPlaces.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {category.places[0] && (() => {
                const CategoryIcon = category.places[0].icon;
                return <CategoryIcon className="w-4 h-4 text-sky-500" />;
              })()}
              {category.category}
            </h4>
            <ul className="space-y-2">
              {category.places.map((place, placeIndex) => (
                <li
                  key={placeIndex}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{place.name}</span>
                  <span className="text-sky-500 font-medium">{place.distance}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Map Preview */}
      <div className="mt-6 relative rounded-xl overflow-hidden bg-gray-100 h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-50">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(#0ea5e9 1px, transparent 1px),
                linear-gradient(90deg, #0ea5e9 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          {/* Property marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-sky-500 rotate-45" />
            </div>
          </div>
          {/* Nearby markers */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-500 rounded-full" />
        </div>
        <button className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
          View on Google Maps
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
