"use client";

import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  CheckCircle2,
  FileText,
  ArrowRight,
  Shield,
} from "lucide-react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  lifestyle: string[];
  image: string;
  verified: boolean;
  available: boolean;
  matchScore: number;
  matchLabel: string;
  features: string[];
  documents: number;
  coordinates: { lat: number; lng: number };
}

interface PropertyCardProps {
  property: Property;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function PropertyCard({
  property,
  index,
  isFavorite,
  onToggleFavorite,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.verified && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Verified
            </span>
          )}
          {property.available && (
            <span className="px-2 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full">
              Available
            </span>
          )}
        </div>
        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        {/* Match Score */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              property.matchScore >= 90
                ? "bg-green-500 text-white"
                : property.matchScore >= 80
                ? "bg-sky-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {property.matchLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          <MapPin className="w-3 h-3" />
          {property.location}
        </p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900 mb-3">
          €{property.price.toLocaleString()}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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

        {/* Features */}
        <div className="space-y-1 mb-3">
          {property.features.slice(0, 3).map((feature, idx) => (
            <p key={idx} className="text-xs text-gray-600 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              {feature}
            </p>
          ))}
        </div>

        {/* Documents & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {property.documents} of 5 documents available
          </span>
          <button className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
