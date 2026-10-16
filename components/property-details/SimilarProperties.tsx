"use client";

import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, ArrowRight, Shield } from "lucide-react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  verified: boolean;
}

interface SimilarPropertiesProps {
  properties: Property[];
}

export default function SimilarProperties({ properties }: SimilarPropertiesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Similar verified properties near Santa Pola
        </h3>
        <button className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:text-sky-600 transition-colors">
          View all properties in Santa Pola
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.verified && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xl font-bold text-gray-900 mb-2">
                €{property.price.toLocaleString()}
              </p>
              <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                {property.title}
              </h4>
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" />
                {property.location}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  {property.area} m²
                </span>
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {property.bedrooms} beds
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.bathrooms} baths
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
