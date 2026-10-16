"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface SuitabilityAnalysisProps {
  suitableFor: string[];
  pointsToConsider: string[];
}

export default function SuitabilityAnalysis({
  suitableFor,
  pointsToConsider,
}: SuitabilityAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Could this property fit your next chapter?
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        More than a property. A place to live the life you want.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Suitable For */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Particularly suitable for</h4>
          </div>
          <ul className="space-y-2">
            {suitableFor.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Points to Consider */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Points to consider</h4>
          </div>
          <ul className="space-y-2">
            {pointsToConsider.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
