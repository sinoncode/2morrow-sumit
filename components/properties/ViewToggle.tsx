"use client";

import { motion } from "framer-motion";
import { Grid, Map } from "lucide-react";

interface ViewToggleProps {
  viewMode: "grid" | "map";
  onViewChange: (mode: "grid" | "map") => void;
}

export default function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewChange("grid")}
        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === "grid"
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {viewMode === "grid" && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-white rounded-md shadow-sm"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <Grid className="w-4 h-4" />
          <span className="hidden sm:inline">Grid</span>
        </span>
      </button>
      <button
        onClick={() => onViewChange("map")}
        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === "map"
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {viewMode === "map" && (
          <motion.div
            layoutId="viewToggle"
            className="absolute inset-0 bg-white rounded-md shadow-sm"
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <span className="relative flex items-center gap-2">
          <Map className="w-4 h-4" />
          <span className="hidden sm:inline">Map</span>
        </span>
      </button>
    </div>
  );
}
