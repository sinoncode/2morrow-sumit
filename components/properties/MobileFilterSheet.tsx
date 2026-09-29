"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Check } from "lucide-react";

interface Filters {
  search: string;
  destination: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  lifestyle: string[];
  moreFilters: {
    verifiedOnly: boolean;
    availableOnly: boolean;
    hasDocuments: boolean;
    minArea: number;
    maxArea: number;
  };
}

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export default function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
}: MobileFilterSheetProps) {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateMoreFilters = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      moreFilters: { ...filters.moreFilters, [key]: value },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range (€)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0] || ""}
                    onChange={(e) =>
                      updateFilter("priceRange", [
                        parseInt(e.target.value) || 0,
                        filters.priceRange[1],
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1] || ""}
                    onChange={(e) =>
                      updateFilter("priceRange", [
                        filters.priceRange[0],
                        parseInt(e.target.value) || 500000,
                      ])
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => updateFilter("propertyType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">All types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Studio">Studio</option>
                  <option value="House">House</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bedrooms
                </label>
                <div className="flex gap-2">
                  {["", "1", "2", "3", "4+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateFilter("bedrooms", num)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filters.bedrooms === num
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {num === "" ? "Any" : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lifestyle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lifestyle
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Beach", "Luxury", "Family", "Urban", "Investment", "Historic"].map(
                    (lifestyle) => (
                      <button
                        key={lifestyle}
                        onClick={() =>
                          updateFilter(
                            "lifestyle",
                            filters.lifestyle.includes(lifestyle)
                              ? filters.lifestyle.filter((l) => l !== lifestyle)
                              : [...filters.lifestyle, lifestyle]
                          )
                        }
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          filters.lifestyle.includes(lifestyle)
                            ? "bg-sky-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lifestyle}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.moreFilters.verifiedOnly}
                    onChange={(e) =>
                      updateMoreFilters("verifiedOnly", e.target.checked)
                    }
                    className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Verified only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.moreFilters.availableOnly}
                    onChange={(e) =>
                      updateMoreFilters("availableOnly", e.target.checked)
                    }
                    className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Available only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.moreFilters.hasDocuments}
                    onChange={(e) =>
                      updateMoreFilters("hasDocuments", e.target.checked)
                    }
                    className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700">Complete documents</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => {
                  onClearFilters();
                  onClose();
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-sky-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Apply filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
