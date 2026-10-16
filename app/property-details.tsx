"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  CheckCircle2,
  FileText,
  ArrowRight,
  ArrowLeft,
  Shield,
  Star,
  Clock,
  Zap,
  Home,
  Car,
  Waves,
  TreePine,
  Building,
  Phone,
  Mail,
  Calendar,
  Download,
  Play,
  X,
  ChevronDown,
  Info,
  Check,
  AlertCircle,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  Target,
  Euro,
  Camera,
  Maximize2,
  Compass,
  Anchor,
  Coffee,
  ShoppingBag,
  Utensils,
  GraduationCap,
  Stethoscope,
  Train,
  Plane,
} from "lucide-react";

// Import components
import ImageGallery from "@/components/property-details/ImageGallery";
import PropertyHeader from "@/components/property-details/PropertyHeader";
import KeyFeatures from "@/components/property-details/KeyFeatures";
import AboutProperty from "@/components/property-details/AboutProperty";
import TechnicalDetails from "@/components/property-details/TechnicalDetails";
import SuitabilityAnalysis from "@/components/property-details/SuitabilityAnalysis";
import LifeAroundProperty from "@/components/property-details/LifeAroundProperty";
import PurchaseCosts from "@/components/property-details/PurchaseCosts";
import PropertyVerification from "@/components/property-details/PropertyVerification";
import LocalInsight from "@/components/property-details/LocalInsight";
import SimilarProperties from "@/components/property-details/SimilarProperties";
import ContactForm from "@/components/property-details/ContactForm";
import Lightbox from "@/components/property-details/Lightbox";

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
  images: string[];
  verified: boolean;
  available: boolean;
  verifiedDate: string;
  features: string[];
  description: string;
  technicalDetails: {
    propertyType: string;
    propertyReference: string;
    interiorLivingArea: string;
    floor: string;
    yearOfConstruction: string;
    currentCondition: string;
    orientation: string;
    heating: string;
    cooling: string;
    energyRating: string;
    parking: string;
    storage: string;
    furnished: string;
    availability: string;
  };
  suitableFor: string[];
  pointsToConsider: string[];
  estimatedCosts: {
    purchasePrice: number;
    estimatedTaxes: number;
    estimatedFees: number;
    total: number;
  };
  verificationStatus: {
    verified: boolean;
    available: boolean;
    pendingReview: boolean;
    checks: {
      notaSimple: boolean;
      energyCertificate: boolean;
      communityFees: boolean;
      occupancyStatus: boolean;
    };
  };
  localInsight: {
    advisor: {
      name: string;
      role: string;
      location: string;
      languages: string[];
      bio: string;
      quote: string;
      image: string;
    };
  };
  nearbyPlaces: {
    category: string;
    places: { name: string; distance: string; icon: any }[];
  }[];
  coordinates: { lat: number; lng: number };
}

// Sample property data
const propertyData: Property = {
  id: 1,
  title: "Bright 3-bedroom apartment near the beach",
  location: "Santa Pola, Alicante, Spain",
  price: 165000,
  area: 82,
  bedrooms: 3,
  bathrooms: 1,
  type: "Apartment",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
  ],
  verified: true,
  available: true,
  verifiedDate: "12 September 2025",
  features: ["82 m²", "3 bedrooms", "1 bathroom", "Balcony", "Lift", "Near the beach"],
  description: `Set close to the coast in Santa Pola, this bright three-bedroom apartment offers a comfortable setting for holidays, longer stays or year-round living. The layout is designed for easy everyday use, combining private living spaces with an outdoor area and convenient access to the town, the coastline and essential services. A viewing and document review will help determine whether it is the right property for your project.`,
  technicalDetails: {
    propertyType: "Apartment",
    propertyReference: "ES-SP-001",
    interiorLivingArea: "To be confirmed",
    floor: "To be confirmed",
    yearOfConstruction: "To be confirmed",
    currentCondition: "Verification in progress",
    orientation: "To be confirmed",
    heating: "To be confirmed",
    cooling: "Air conditioning",
    energyRating: "In progress",
    parking: "Optional",
    storage: "To be confirmed",
    furnished: "Partly furnished",
    availability: "On request",
  },
  suitableFor: [
    "Beach lovers and outdoor living",
    "Families or holiday-home seekers",
    "Buyers looking for a low-maintenance home",
    "Those seeking good rental potential",
  ],
  pointsToConsider: [
    "Located in a popular area (busier in summer)",
    "Street parking can be limited in high season",
    "No private pool (but the beach is a short walk away)",
    "Best suited to buyers comfortable with an apartment setting",
  ],
  estimatedCosts: {
    purchasePrice: 165000,
    estimatedTaxes: 10000,
    estimatedFees: 6000,
    total: 181000,
  },
  verificationStatus: {
    verified: true,
    available: true,
    pendingReview: true,
    checks: {
      notaSimple: true,
      energyCertificate: true,
      communityFees: true,
      occupancyStatus: true,
    },
  },
  localInsight: {
    advisor: {
      name: "María López",
      role: "Local Property Advisor",
      location: "Santa Pola & Alicante area",
      languages: ["Spanish", "English", "French"],
      bio: "I help international buyers find not just a property, but a place to feel at home. I live in Santa Pola and am happy to share my local knowledge with you.",
      quote: "Santa Pola offers an authentic Mediterranean lifestyle, with a welcoming international community and everything you need close by.",
      image: "/api/placeholder/150/150",
    },
  },
  nearbyPlaces: [
    {
      category: "Beaches",
      places: [
        { name: "Playa de Levante", distance: "3 min", icon: Waves },
        { name: "Playa de Tamarit", distance: "5 min", icon: Waves },
      ],
    },
    {
      category: "Essentials",
      places: [
        { name: "Supermarket", distance: "5 min", icon: ShoppingBag },
        { name: "Pharmacy", distance: "8 min", icon: Stethoscope },
        { name: "Medical Center", distance: "12 min", icon: Stethoscope },
      ],
    },
    {
      category: "Transport",
      places: [
        { name: "Bus Station", distance: "8 min", icon: Train },
        { name: "Alicante Airport", distance: "15 min", icon: Plane },
      ],
    },
    {
      category: "Lifestyle",
      places: [
        { name: "Restaurants & Cafés", distance: "5 min", icon: Coffee },
        { name: "Marina & Port", distance: "10 min", icon: Anchor },
        { name: "Castle of Santa Pola", distance: "12 min", icon: Building },
      ],
    },
  ],
  coordinates: { lat: 38.1912, lng: -0.5556 },
};

// Similar properties data
const similarProperties = [
  {
    id: 2,
    title: "2-bedroom apartment with sea views",
    location: "Santa Pola, Alicante, Spain",
    price: 142000,
    area: 74,
    bedrooms: 2,
    bathrooms: 1,
    image: "/api/placeholder/400/300",
    verified: true,
  },
  {
    id: 3,
    title: "Modern villa with private pool",
    location: "Gran Alacant, Santa Pola",
    price: 325000,
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    image: "/api/placeholder/400/300",
    verified: true,
  },
  {
    id: 4,
    title: "3-bedroom penthouse with large terrace",
    location: "Santa Pola, Alicante, Spain",
    price: 198000,
    area: 98,
    bedrooms: 3,
    bathrooms: 2,
    image: "/api/placeholder/400/300",
    verified: true,
  },
];

export default function PropertyDetailsPage() {
  const [property] = useState<Property>(propertyData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showContactForm, setShowContactForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["description"]);

  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  // Toggle section expansion
  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  }, []);

  // Check if section is expanded
  const isExpanded = useCallback(
    (section: string) => expandedSections.includes(section),
    [expandedSections]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600 overflow-x-auto hide-scrollbar">
            <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/properties" className="hover:text-sky-500 transition-colors">Properties</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href="#" className="hover:text-sky-500 transition-colors">Alicante</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href="#" className="hover:text-sky-500 transition-colors">Santa Pola</a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <PropertyHeader
              property={property}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />

            {/* Image Gallery */}
            <ImageGallery
              images={property.images}
              currentIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
              onOpenLightbox={() => setShowLightbox(true)}
            />

            {/* Key Features */}
            <KeyFeatures features={property.features} />

            {/* About & Technical Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <AboutProperty
                description={property.description}
                isExpanded={isExpanded("description")}
                onToggle={() => toggleSection("description")}
              />
              <TechnicalDetails details={property.technicalDetails} />
            </div>

            {/* Suitability Analysis */}
            <SuitabilityAnalysis
              suitableFor={property.suitableFor}
              pointsToConsider={property.pointsToConsider}
            />

            {/* Life Around Property */}
            <LifeAroundProperty nearbyPlaces={property.nearbyPlaces} />

            {/* Purchase Costs & Verification */}
            <div className="grid md:grid-cols-2 gap-6">
              <PurchaseCosts costs={property.estimatedCosts} />
              <PropertyVerification status={property.verificationStatus} verifiedDate={property.verifiedDate} />
            </div>

            {/* Local Insight */}
            <LocalInsight advisor={property.localInsight.advisor} />

            {/* Similar Properties */}
            <SimilarProperties properties={similarProperties} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Interested in this property?
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Take the next step towards your life in Spain.
                </p>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowContactForm(true)}
                    className="w-full px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Check availability
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Request property file
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Target className="w-5 h-5" />
                    Does this property fit my project?
                  </motion.button>
                </div>

                {/* Independent Advice */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Independent advice</h4>
                      <p className="text-xs text-gray-600">Personal, honest and on your side.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white"
              >
                <h4 className="font-semibold mb-4">Property Highlights</h4>
                <div className="space-y-3">
                  {[
                    { icon: Euro, label: "Price", value: `€${property.price.toLocaleString()}` },
                    { icon: Square, label: "Area", value: `${property.area} m²` },
                    { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <stat.icon className="w-5 h-5 text-white/80" />
                      <span className="text-white/80 text-sm">{stat.label}:</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Share Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Share this property</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Share2, label: "Share", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
                    { icon: Heart, label: "Save", color: isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 hover:bg-gray-200 text-gray-700" },
                    { icon: Download, label: "PDF", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
                  ].map((btn, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={btn.label === "Save" ? toggleFavorite : undefined}
                      className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${btn.color}`}
                    >
                      <btn.icon className="w-5 h-5" />
                      <span className="text-xs">{btn.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <Lightbox
            images={property.images}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            onClose={() => setShowLightbox(false)}
          />
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <ContactForm
            property={property}
            onClose={() => setShowContactForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
