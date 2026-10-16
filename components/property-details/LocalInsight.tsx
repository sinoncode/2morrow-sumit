"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Quote } from "lucide-react";

interface Advisor {
  name: string;
  role: string;
  location: string;
  languages: string[];
  bio: string;
  quote: string;
  image: string;
}

interface LocalInsightProps {
  advisor: Advisor;
}

export default function LocalInsight({ advisor }: LocalInsightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">Local insight</h3>
      <p className="text-gray-600 text-sm mb-6">
        Get to know the area from someone who lives here.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Advisor Info */}
        <div className="flex gap-4">
          <img
            src={advisor.image}
            alt={advisor.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h4 className="font-bold text-gray-900">{advisor.name}</h4>
            <p className="text-sm text-sky-500 font-medium">{advisor.role}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {advisor.location}
            </p>
            <p className="text-sm text-gray-600 mt-3">{advisor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {advisor.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative bg-sky-50 rounded-xl p-6">
          <Quote className="w-8 h-8 text-sky-300 absolute top-4 left-4" />
          <p className="text-gray-700 italic relative z-10 mt-4">
            "{advisor.quote}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
