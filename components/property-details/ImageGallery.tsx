"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Maximize2, Play } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onOpenLightbox: () => void;
}

export default function ImageGallery({
  images,
  currentIndex,
  onIndexChange,
  onOpenLightbox,
}: ImageGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);

  const goToPrevious = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const propertyImages = [
  "/images/property/property-1.jpg",
  "/images/property/property-2.jpg",
  "/images/property/property-3.jpg",
  "/images/property/property-4.jpg",
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={onOpenLightbox}
          />

          
        </AnimatePresence>

        {/* Navigation Arrows */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full flex items-center gap-2">
          <Camera className="w-4 h-4" />
          {currentIndex + 1} / {images.length}
        </div>

        {/* View All Photos Button */}
        <button
          onClick={onOpenLightbox}
          className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          View all {images.length} photos
        </button>

        {/* Video Indicator */}
        {currentIndex === 0 && (
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 text-gray-700 ml-0.5" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
              index === currentIndex
                ? "ring-2 ring-sky-500 ring-offset-2"
                : "opacity-60 hover:opacity-100"
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
