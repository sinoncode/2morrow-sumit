"use client";

import { motion } from "framer-motion";
import { SearchX, Filter, ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        No properties found
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn&apos;t find any properties matching your current filters. Try
        adjusting your search criteria or clearing some filters.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Clear all filters
        </button>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      </div>
    </motion.div>
  );
}
