"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const goToPrevious = useCallback(() => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const goToNext = useCallback(() => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-5xl max-h-[90vh] px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full flex items-center gap-2">
          <Camera className="w-4 h-4 text-white" />
          <span className="text-white text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>

      {/* Thumbnails */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 hide-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange(index);
            }}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
              index === currentIndex
                ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
