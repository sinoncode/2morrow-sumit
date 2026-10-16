"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, Clock, FileText, Zap, Building, Home } from "lucide-react";

interface VerificationStatus {
  verified: boolean;
  available: boolean;
  pendingReview: boolean;
  checks: {
    notaSimple: boolean;
    energyCertificate: boolean;
    communityFees: boolean;
    occupancyStatus: boolean;
  };
}

interface PropertyVerificationProps {
  status: VerificationStatus;
  verifiedDate: string;
}

export default function PropertyVerification({
  status,
  verifiedDate,
}: PropertyVerificationProps) {
  const checks = [
    { key: "notaSimple", label: "Nota Simple", icon: FileText },
    { key: "energyCertificate", label: "Energy certificate", icon: Zap },
    { key: "communityFees", label: "Community fees", icon: Building },
    { key: "occupancyStatus", label: "Occupancy status", icon: Home },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Property verification</h3>
        <span className="text-xs text-gray-500">Information verified {verifiedDate}</span>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Transparent. Documented. Trusted.
      </p>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {status.verified && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Verified
          </span>
        )}
        {status.available && (
          <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm font-medium rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Available
          </span>
        )}
        {status.pendingReview && (
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Pending review
          </span>
        )}
      </div>

      {/* Verification Checks */}
      <div className="grid grid-cols-2 gap-4">
        {checks.map((check, index) => (
          <motion.div
            key={check.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              status.checks[check.key as keyof typeof status.checks]
                ? "bg-green-50"
                : "bg-gray-50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status.checks[check.key as keyof typeof status.checks]
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <check.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{check.label}</p>
              <p
                className={`text-xs ${
                  status.checks[check.key as keyof typeof status.checks]
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {status.checks[check.key as keyof typeof status.checks]
                  ? "Verified"
                  : "Pending"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
