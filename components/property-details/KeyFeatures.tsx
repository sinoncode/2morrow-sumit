"use client";

import { motion } from "framer-motion";
import { Square, Bed, Bath, Home, Car, Waves, TreePine, Building } from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
}

const featureIcons: { [key: string]: any } = {
  "82 m²": Square,
  "3 bedrooms": Bed,
  "1 bathroom": Bath,
  "Balcony": Home,
  "Lift": Building,
  "Near the beach": Waves,
};

export default function KeyFeatures({ features }: KeyFeaturesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature] || Home;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Icon className="w-6 h-6 text-sky-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">{feature}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
