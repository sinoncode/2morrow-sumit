"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AboutPropertyProps {
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function AboutProperty({
  description,
  isExpanded,
  onToggle,
}: AboutPropertyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">About this property</h3>

      <div className="relative">
        <motion.div
          animate={{ height: isExpanded ? "auto" : "120px" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <h4 className="font-semibold text-gray-900 mb-3">Property description</h4>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        onClick={onToggle}
        className="mt-4 text-sky-500 font-semibold text-sm flex items-center gap-1 hover:text-sky-600 transition-colors"
      >
        {isExpanded ? (
          <>
            Show less <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Read full description <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </motion.div>
  );
}
