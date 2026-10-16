"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  Euro,
  Bed,
  Heart,
  Bath,
  Square,
  ChevronDown,
  Grid,
  Map,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Star,
  TrendingUp,
  Shield,
  FileText,
  ArrowRight,
  ArrowUpDown,
  Filter,
  Loader2,
  Sparkles,
  Target,
  Clock,
  Plus,
  Minus,
} from "lucide-react";

// Import components
import PropertyCard from "@/components/properties/PropertyCard";
import FilterPanel from "@/components/properties/FilterPanel";
import MapView from "@/components/properties/MapView";
import SortDropdown from "@/components/properties/SortDropdown";
import ViewToggle from "@/components/properties/ViewToggle";
import PropertyStats from "@/components/properties/PropertyStats";
import EmptyState from "@/components/properties/EmptyState";
import MobileFilterSheet from "@/components/properties/MobileFilterSheet";

import lower1 from "@/public/images/property-listing/lower1.jpg";
import lower2 from "@/public/images/property-listing/lower-2.jpg";


// Types
interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  lifestyle: string[];
  image: string;
  verified: boolean;
  available: boolean;
  matchScore: number;
  matchLabel: string;
  features: string[];
  documents: number;
  coordinates: { lat: number; lng: number };
}

// Sample property data
const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Bright 3-bedroom apartment near the beach",
    location: "Santa Pola, Alicante, Spain",
    price: 165000,
    area: 82,
    bedrooms: 3,
    bathrooms: 1,
    type: "Apartment",
    lifestyle: ["Beach", "Family"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 95,
    matchLabel: "Strong match",
    features: ["2 min to the beach", "Lift", "Low-maintenance"],
    documents: 4,
    coordinates: { lat: 38.1912, lng: -0.5556 },
  },
  {
    id: 2,
    title: "Modern villa with private pool",
    location: "Gran Alacant, Santa Pola",
    price: 325000,
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    type: "Villa",
    lifestyle: ["Luxury", "Family"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 88,
    matchLabel: "Great match",
    features: ["Quiet residential area", "Outdoor living", "Good rental potential"],
    documents: 5,
    coordinates: { lat: 38.2367, lng: -0.5133 },
  },
  {
    id: 3,
    title: "2-bedroom penthouse with sea views",
    location: "Santa Pola, Alicante",
    price: 198000,
    area: 98,
    bedrooms: 2,
    bathrooms: 2,
    type: "Penthouse",
    lifestyle: ["Beach", "Luxury"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 92,
    matchLabel: "Strong match",
    features: ["Panoramic views", "5 min to the beach", "Shops nearby"],
    documents: 4,
    coordinates: { lat: 38.1956, lng: -0.5502 },
  },
  {
    id: 4,
    title: "Charming townhouse near the marina",
    location: "Santa Pola, Alicante",
    price: 210000,
    area: 110,
    bedrooms: 2,
    bathrooms: 2,
    type: "Townhouse",
    lifestyle: ["Marina", "Family"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 85,
    matchLabel: "Good match",
    features: ["Walk to marina", "Ideal for families", "Healthcare nearby"],
    documents: 4,
    coordinates: { lat: 38.1889, lng: -0.5523 },
  },
  {
    id: 5,
    title: "Cozy studio in the heart of town",
    location: "Santa Pola Center",
    price: 95000,
    area: 45,
    bedrooms: 1,
    bathrooms: 1,
    type: "Studio",
    lifestyle: ["Urban", "Investment"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 78,
    matchLabel: "Good match",
    features: ["Central location", "Public transport", "Low costs"],
    documents: 3,
    coordinates: { lat: 38.1934, lng: -0.5545 },
  },
  {
    id: 6,
    title: "Luxury 4-bedroom villa with garden",
    location: "Gran Alacant Hills",
    price: 450000,
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    type: "Villa",
    lifestyle: ["Luxury", "Family"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: false,
    matchScore: 90,
    matchLabel: "Strong match",
    features: ["Private garden", "Sea views", "Garage"],
    documents: 6,
    coordinates: { lat: 38.2412, lng: -0.5089 },
  },
  {
    id: 7,
    title: "Beachfront apartment with terrace",
    location: "Santa Pola Beach",
    price: 275000,
    area: 95,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    lifestyle: ["Beach", "Luxury"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 93,
    matchLabel: "Strong match",
    features: ["Direct beach access", "Large terrace", "Sea views"],
    documents: 5,
    coordinates: { lat: 38.1898, lng: -0.5487 },
  },
  {
    id: 8,
    title: "Renovated village house with character",
    location: "Santa Pola Old Town",
    price: 145000,
    area: 130,
    bedrooms: 3,
    bathrooms: 2,
    type: "House",
    lifestyle: ["Historic", "Family"],
    image: "/api/placeholder/400/300",
    verified: true,
    available: true,
    matchScore: 82,
    matchLabel: "Good match",
    features: ["Original features", "Quiet street", "Local amenities"],
    documents: 4,
    coordinates: { lat: 38.1923, lng: -0.5567 },
  },
];

// Filter types
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

const defaultFilters: Filters = {
  search: "",
  destination: "",
  propertyType: "",
  priceRange: [0, 500000],
  bedrooms: "",
  lifestyle: [],
  moreFilters: {
    verifiedOnly: false,
    availableOnly: false,
    hasDocuments: false,
    minArea: 0,
    maxArea: 300,
  },
};

export default function PropertyListingPage() {
  // State
  const [properties] = useState<Property[]>(sampleProperties);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState("best-match");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search)
      );
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.type === filters.propertyType);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Bedrooms filter
    if (filters.bedrooms) {
      const minBeds = parseInt(filters.bedrooms);
      filtered = filtered.filter((p) => p.bedrooms >= minBeds);
    }

    // Lifestyle filter
    if (filters.lifestyle.length > 0) {
      filtered = filtered.filter((p) =>
        filters.lifestyle.some((l) => p.lifestyle.includes(l))
      );
    }

    // More filters
    if (filters.moreFilters.verifiedOnly) {
      filtered = filtered.filter((p) => p.verified);
    }
    if (filters.moreFilters.availableOnly) {
      filtered = filtered.filter((p) => p.available);
    }
    if (filters.moreFilters.hasDocuments) {
      filtered = filtered.filter((p) => p.documents >= 4);
    }

    // Area filter
    filtered = filtered.filter(
      (p) =>
        p.area >= filters.moreFilters.minArea &&
        p.area <= filters.moreFilters.maxArea
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "area":
        filtered.sort((a, b) => b.area - a.area);
        break;
      case "bedrooms":
        filtered.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    return filtered;
  }, [properties, filters, sortBy]);

  // Display properties (with load more)
  const displayedProperties = filteredProperties.slice(0, displayCount);

  // Toggle favorite
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setDisplayCount(6);
  }, []);

  // Load more
  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  }, []);

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.propertyType !== "" ||
      filters.bedrooms !== "" ||
      filters.lifestyle.length > 0 ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 500000 ||
      filters.moreFilters.verifiedOnly ||
      filters.moreFilters.availableOnly ||
      filters.moreFilters.hasDocuments ||
      filters.moreFilters.minArea !== 0 ||
      filters.moreFilters.maxArea !== 300
    );
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              >
                Find a property that fits your life —{" "}
                <span className="text-sky-500">not only your budget.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 text-lg"
              >
                Verified properties. Local insight. A smoother path to your next chapter in Spain.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-gradient-to-br from-sky-100 to-blue-50 rounded-2xl p-6 text-center">
                <p className="text-sky-600 font-medium italic">
                  "A new chapter in a brighter place."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where would you like to live?"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={filters.destination}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, destination: e.target.value }))
                }
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="">Destination</option>
                <option value="santa-pola">Santa Pola</option>
                <option value="gran-alacant">Gran Alacant</option>
                <option value="alicante">Alicante</option>
              </select>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, propertyType: e.target.value }))
                }
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="">Property type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Studio">Studio</option>
                <option value="House">House</option>
              </select>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, bedrooms: e.target.value }))
                }
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                More filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-sky-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden px-4 py-3 bg-sky-500 text-white rounded-xl flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showMoreFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range (€)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceRange[0] || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]],
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceRange[1] || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [prev.priceRange[0], parseInt(e.target.value) || 500000],
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Area Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area (m²)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.moreFilters.minArea || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              moreFilters: {
                                ...prev.moreFilters,
                                minArea: parseInt(e.target.value) || 0,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.moreFilters.maxArea || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              moreFilters: {
                                ...prev.moreFilters,
                                maxArea: parseInt(e.target.value) || 300,
                              },
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>

                    {/* Lifestyle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lifestyle
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Beach", "Luxury", "Family", "Urban", "Investment", "Historic"].map(
                          (lifestyle) => (
                            <button
                              key={lifestyle}
                              onClick={() =>
                                setFilters((prev) => ({
                                  ...prev,
                                  lifestyle: prev.lifestyle.includes(lifestyle)
                                    ? prev.lifestyle.filter((l) => l !== lifestyle)
                                    : [...prev.lifestyle, lifestyle],
                                }))
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
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.moreFilters.verifiedOnly}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              moreFilters: {
                                ...prev.moreFilters,
                                verifiedOnly: e.target.checked,
                              },
                            }))
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
                            setFilters((prev) => ({
                              ...prev,
                              moreFilters: {
                                ...prev.moreFilters,
                                availableOnly: e.target.checked,
                              },
                            }))
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
                            setFilters((prev) => ({
                              ...prev,
                              moreFilters: {
                                ...prev.moreFilters,
                                hasDocuments: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                        />
                        <span className="text-sm text-gray-700">Complete documents</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                    <button
                      onClick={() => setShowMoreFilters(false)}
                      className="px-6 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Want more relevant results?
              </span>
              <span className="hidden sm:flex items-center gap-2">
                <Target className="w-4 h-4 text-sky-500" />
                Personalised recommendations
              </span>
              <span className="hidden md:flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Properties that fit your lifestyle
              </span>
            </div>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors flex items-center gap-2">
              Build my profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} verified properties in Santa Pola
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Homes, apartments and villas near the beach
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.search && (
              <FilterChip
                label={`Search: ${filters.search}`}
                onRemove={() => setFilters((prev) => ({ ...prev, search: "" }))}
              />
            )}
            {filters.propertyType && (
              <FilterChip
                label={filters.propertyType}
                onRemove={() => setFilters((prev) => ({ ...prev, propertyType: "" }))}
              />
            )}
            {filters.bedrooms && (
              <FilterChip
                label={`${filters.bedrooms}+ bedrooms`}
                onRemove={() => setFilters((prev) => ({ ...prev, bedrooms: "" }))}
              />
            )}
            {filters.lifestyle.map((l) => (
              <FilterChip
                key={l}
                label={l}
                onRemove={() =>
                  setFilters((prev) => ({
                    ...prev,
                    lifestyle: prev.lifestyle.filter((item) => item !== l),
                  }))
                }
              />
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-sky-500 hover:text-sky-600 font-medium ml-2"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View - Left Side */}
          {viewMode === "map" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 order-2 lg:order-1"
            >
              <div className="sticky top-32">
                <MapView properties={filteredProperties} />
              </div>
            </motion.div>
          )}

          {/* Properties Grid */}
          <div
            className={
              viewMode === "map"
                ? "lg:col-span-2 order-1 lg:order-2"
                : "lg:col-span-3"
            }
          >
            {filteredProperties.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} />
            ) : (
              <>
                <div
                  className={
                    viewMode === "map"
                      ? "grid sm:grid-cols-2 gap-6"
                      : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  }
                >
                  {displayedProperties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      index={index}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={() => toggleFavorite(property.id)}
                    />
                  ))}
                </div>

                {/* Load More */}
                {displayCount < filteredProperties.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-8"
                  >
                    <button
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-8 py-3 border-2 border-sky-500 text-sky-500 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load more properties
                          <ChevronDown className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={lower1.src}
              alt="Beach destination"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-xl font-bold mb-2">
                Not sure where to live?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                From beaches and towns to lifestyle and infrastructure. Get to know the area from
                someone who lives here.
              </p>
              <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                Explore destinations
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={lower2.src}
              alt="Swiss property"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-xl font-bold mb-2">
                Your Swiss property can help finance your next chapter.
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Explore your options with independent advice.
              </p>
              <div className="flex gap-2 mb-4">
                {["Sell", "Rent", "Keep", "Optimize"].map((tab) => (
                  <span
                    key={tab}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs"
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                Explore Asset & Financial Strategy
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />
    </div>
  );
}

// Filter Chip Component
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm">
      {label}
      <button onClick={onRemove} className="hover:text-sky-900">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
