"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

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

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterPanelProps) {
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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-sky-500 hover:text-sky-600"
        >
          Clear all
        </button>
      </div>

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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.bedrooms === num
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            onChange={(e) => updateMoreFilters("verifiedOnly", e.target.checked)}
            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
          />
          <span className="text-sm text-gray-700">Verified only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.moreFilters.availableOnly}
            onChange={(e) => updateMoreFilters("availableOnly", e.target.checked)}
            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
          />
          <span className="text-sm text-gray-700">Available only</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.moreFilters.hasDocuments}
            onChange={(e) => updateMoreFilters("hasDocuments", e.target.checked)}
            className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
          />
          <span className="text-sm text-gray-700">Complete documents</span>
        </label>
      </div>
    </motion.div>
  );
}
