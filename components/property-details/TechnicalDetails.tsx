"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface TechnicalDetailsProps {
  details: {
    propertyType: string;
    propertyReference: string;
    interiorLivingArea: string;
    floor: string;
    yearOfConstruction: string;
    currentCondition: string;
    orientation: string;
    heating: string;
    cooling: string;
    energyRating: string;
    parking: string;
    storage: string;
    furnished: string;
    availability: string;
  };
}

export default function TechnicalDetails({ details }: TechnicalDetailsProps) {
  const entries = Object.entries(details);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Technical details</h3>

      <div className="space-y-3">
        {entries.map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
              {value}
              {key === "energyRating" && (
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
