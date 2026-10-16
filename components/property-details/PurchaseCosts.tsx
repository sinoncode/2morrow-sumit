"use client";

import { motion } from "framer-motion";
import { Info, ArrowRight, TrendingUp } from "lucide-react";

interface PurchaseCostsProps {
  costs: {
    purchasePrice: number;
    estimatedTaxes: number;
    estimatedFees: number;
    total: number;
  };
}

export default function PurchaseCosts({ costs }: PurchaseCostsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Estimated purchase costs
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Get a clear picture of the total investment.
      </p>

      {/* Total Cost */}
      <div className="bg-sky-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">Estimated total costs</span>
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
        </div>
        <p className="text-3xl font-bold text-sky-500">
          €{costs.total.toLocaleString()}
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Purchase price</span>
          <span className="font-semibold text-gray-900">
            €{costs.purchasePrice.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Estimated taxes</span>
          <span className="font-semibold text-gray-900">
            €{costs.estimatedTaxes.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-600">Estimated fees</span>
          <span className="font-semibold text-gray-900">
            €{costs.estimatedFees.toLocaleString()}
          </span>
        </div>
      </div>

      <button className="mt-6 w-full px-4 py-3 border border-sky-500 text-sky-500 rounded-xl font-semibold hover:bg-sky-50 transition-colors flex items-center justify-center gap-2">
        View detailed breakdown
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        This is an estimate based on current rates in the Valencian Community (10% property transfer tax). Actual costs may vary.
      </p>
    </motion.div>
  );
}
