"use client";

import { motion } from "framer-motion";
import { TrendingUp, Home, Euro, MapPin } from "lucide-react";

interface PropertyStatsProps {
  totalProperties: number;
  averagePrice: number;
  averageArea: number;
  location: string;
}

export default function PropertyStats({
  totalProperties,
  averagePrice,
  averageArea,
  location,
}: PropertyStatsProps) {
  const stats = [
    {
      icon: Home,
      label: "Total Properties",
      value: totalProperties,
      color: "bg-sky-500",
    },
    {
      icon: Euro,
      label: "Average Price",
      value: `€${averagePrice.toLocaleString()}`,
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      label: "Average Area",
      value: `${averageArea} m²`,
      color: "bg-purple-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
