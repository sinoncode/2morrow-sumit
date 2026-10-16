"use client";

import { motion } from "framer-motion";
import { MapPin, Heart, Share2, Shield, CheckCircle2, Calendar } from "lucide-react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  verified: boolean;
  available: boolean;
  verifiedDate: string;
}

interface PropertyHeaderProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function PropertyHeader({
  property,
  isFavorite,
  onToggleFavorite,
}: PropertyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full uppercase tracking-wider">
              APARTMENT FOR SALE
            </span>
            {property.verified && (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>

          {/* Location */}
          <p className="text-gray-600 flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-sky-500" />
            {property.location}
          </p>

          {/* Availability */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available
            </span>
            <span className="text-gray-500">
              Information verified {property.verifiedDate}
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-start lg:items-end gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-sky-500">
              €{property.price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleFavorite}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isFavorite
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
