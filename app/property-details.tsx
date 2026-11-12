"use client";

import { useState, useCallback, useEffect } from "react";
import type { ComponentType } from "react";
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
  currency: string;
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
    places: { name: string; distance: string; icon: ComponentType<{ className?: string }> }[];
  }[];
  coordinates: { lat: number; lng: number };
}

interface ApiProperty {
  id: number;
  internal_reference?: string | null;
  classification?: Record<string, string | null>;
  title?: string | null;
  description?: string | null;
  pricing?: Record<string, number | string | boolean | null>;
  location?: Record<string, unknown>;
  dimensions?: Record<string, number | string | boolean | null>;
  media?: Record<string, string | string[] | null>;
  documents?: Record<string, string | null>;
  construction?: Record<string, number | string | boolean | null>;
  orientation?: Record<string, number | string | null>;
  energy?: Record<string, number | string | null>;
  equipment?: Record<string, unknown>;
  parking?: Record<string, unknown>;
  outdoor?: Record<string, unknown>;
}

const numberValue = (value: unknown, fallback = 0) => {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const textValue = (value: unknown, fallback = "To be confirmed") =>
  typeof value === "string" && value.trim() ? value : fallback;

// Sample property data
const propertyData: Property = {
  id: 1,
  title: "Bright 3-bedroom apartment near the beach",
  location: "Santa pola, alicante, spain",
  price: 165000,
  currency: "EUR",
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
  verifiedDate: "12 september 2025",
  features: ["82 m²", "3 bedrooms", "1 bathroom", "Balcony", "Lift", "Near the beach"],
  description: `Set close to the coast in santa pola, this bright three-bedroom apartment offers a comfortable setting for holidays, longer stays or year-round living. The layout is designed for easy everyday use, combining private living spaces with an outdoor area and convenient access to the town, the coastline and essential services. A viewing and document review will help determine whether it is the right property for your project.`,
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
      name: "María lópez",
      role: "Local Property Advisor",
      location: "Santa pola & alicante area",
      languages: ["Spanish", "English", "French"],
      bio: "I help international buyers find not just a property, but a place to feel at home. I live in santa pola and am happy to share my local knowledge with you.",
      quote: "Santa pola offers an authentic mediterranean lifestyle, with a welcoming international community and everything you need close by.",
      image: "/api/placeholder/150/150",
    },
  },
  nearbyPlaces: [
    {
      category: "Beaches",
      places: [
        { name: "Playa de levante", distance: "3 min", icon: Waves },
        { name: "Playa de tamarit", distance: "5 min", icon: Waves },
      ],
    },
    {
      category: "Essentials",
      places: [
        { name: "Supermarket", distance: "5 min", icon: ShoppingBag },
        { name: "Pharmacy", distance: "8 min", icon: Stethoscope },
        { name: "Medical center", distance: "12 min", icon: Stethoscope },
      ],
    },
    {
      category: "Transport",
      places: [
        { name: "Bus station", distance: "8 min", icon: Train },
        { name: "Alicante airport", distance: "15 min", icon: Plane },
      ],
    },
    {
      category: "Lifestyle",
      places: [
        { name: "Restaurants & cafés", distance: "5 min", icon: Coffee },
        { name: "Marina & port", distance: "10 min", icon: Anchor },
        { name: "Castle of santa pola", distance: "12 min", icon: Building },
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
    location: "Santa pola, alicante, spain",
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
    location: "Gran alacant, santa pola",
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
    location: "Santa pola, alicante, spain",
    price: 198000,
    area: 98,
    bedrooms: 3,
    bathrooms: 2,
    image: "/api/placeholder/400/300",
    verified: true,
  },
];

const mapApiProperty = (apiProperty: ApiProperty): Property => {
  const location = apiProperty.location || {};
  const dimensions = apiProperty.dimensions || {};
  const pricing = apiProperty.pricing || {};
  const classification = apiProperty.classification || {};
  const construction = apiProperty.construction || {};
  const orientation = apiProperty.orientation || {};
  const energy = apiProperty.energy || {};
  const equipment = apiProperty.equipment || {};
  const parking = apiProperty.parking || {};
  const outdoor = apiProperty.outdoor || {};
  const media = apiProperty.media || {};
  const price = numberValue(pricing.price);
  const currency = textValue(pricing.currency, "EUR");
  const photos = Array.isArray(media.photos) ? media.photos.filter((photo): photo is string => Boolean(photo)) : [];
  const mainPhoto = typeof media.main_photo === "string" ? media.main_photo : "";
  const images = [mainPhoto, ...photos].filter((image, index, all) => Boolean(image) && all.indexOf(image) === index);
  const locationParts = [
    location.address_line_1,
    location.address_line_2,
    location.city,
    location.district,
    location.state,
    location.country,
  ].filter((part): part is string => typeof part === "string" && Boolean(part));
  const features: string[] = [];
  if (dimensions.living_area) features.push(`${dimensions.living_area} m² living area`);
  if (dimensions.bedrooms) features.push(`${dimensions.bedrooms} bedrooms`);
  if (dimensions.bathrooms) features.push(`${dimensions.bathrooms} bathrooms`);
  if (outdoor.balcony === true) features.push("Balcony");
  if (outdoor.terrace === true) features.push("Terrace");
  if (outdoor.garden === true) features.push("Garden");
  if (outdoor.swimming_pool) features.push("Swimming pool");
  if (equipment.elevator_house === true) features.push("Lift");
  const coordinates = location.coordinates as { latitude?: unknown; longitude?: unknown } | undefined;
  const documentCount = Object.values(apiProperty.documents || {}).filter(Boolean).length;
  const taxes = Math.round(price * 0.06);
  const fees = Math.round(price * 0.03);

  return {
    id: apiProperty.id,
    title: textValue(apiProperty.title, `Property ${apiProperty.id}`),
    location: locationParts.join(", ") || "Location not specified",
    price,
    currency,
    area: numberValue(dimensions.living_area || dimensions.gross_floor_area),
    bedrooms: numberValue(dimensions.bedrooms),
    bathrooms: numberValue(dimensions.bathrooms),
    type: textValue(classification.sub_type, "Property"),
    images: images.length ? images : ["/images/property-sample.jpg"],
    verified: documentCount > 0,
    available: classification.listing_status === "published",
    verifiedDate: "From live api data",
    features: features.length ? features : ["Property details available on request"],
    description: textValue(apiProperty.description, "Contact us for more information about this property."),
    technicalDetails: {
      propertyType: textValue(classification.sub_type),
      propertyReference: textValue(apiProperty.internal_reference),
      interiorLivingArea: dimensions.living_area ? `${dimensions.living_area} m²` : "To be confirmed",
      floor: textValue(dimensions.floor_number),
      yearOfConstruction: construction.year_built ? String(construction.year_built) : "To be confirmed",
      currentCondition: textValue(construction.condition),
      orientation: textValue(orientation.facing_direction),
      heating: textValue(energy.heating_source),
      cooling: equipment.apartment_ac ? "Available" : "To be confirmed",
      energyRating: textValue(energy.energy_class),
      parking: parking.parking_type ? String(parking.parking_type) : (parking.parking_spaces_included ? `${parking.parking_spaces_included} spaces` : "To be confirmed"),
      storage: outdoor.separate_storage_unit === true ? "Available" : "To be confirmed",
      furnished: textValue(equipment.furnishing_status),
      availability: textValue(classification.listing_status),
    },
    suitableFor: ["Primary or holiday residence", "Buyers seeking a new location", "Long-term property investment"],
    pointsToConsider: ["Availability and final terms should be confirmed with the property advisor."],
    estimatedCosts: { purchasePrice: price, estimatedTaxes: taxes, estimatedFees: fees, total: price + taxes + fees },
    verificationStatus: {
      verified: documentCount > 0,
      available: classification.listing_status === "published",
      pendingReview: documentCount === 0,
      checks: {
        notaSimple: Boolean(apiProperty.documents?.title_deed),
        energyCertificate: Boolean(apiProperty.documents?.floor_plan),
        communityFees: Boolean(apiProperty.documents?.legal_documents),
        occupancyStatus: Boolean(apiProperty.documents?.id_proof),
      },
    },
    localInsight: propertyData.localInsight,
    nearbyPlaces: [],
    coordinates: { lat: numberValue(coordinates?.latitude, 46.8182), lng: numberValue(coordinates?.longitude, 8.2275) },
  };
};

export default function PropertyDetailsPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["description"]);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || !/^\d+$/.test(id)) {
      queueMicrotask(() => {
        setLoadError("A valid property ID is required.");
        setIsLoading(false);
      });
      return;
    }

    fetch(`/api/properties/${id}`, { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Property could not be loaded.");
        return payload as ApiProperty;
      })
      .then((apiProperty) => {
        setProperty(mapApiProperty(apiProperty));
        setLoadError("");
      })
      .catch((error: unknown) => setLoadError(error instanceof Error ? error.message : "Property could not be loaded."))
      .finally(() => setIsLoading(false));
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-32 rounded-2xl bg-white shadow-sm" />
          <div className="aspect-[16/7] rounded-2xl bg-gray-200" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 rounded-2xl bg-white shadow-sm" />
            <div className="h-64 rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (loadError || !property) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Property unavailable</h1>
          <p className="mt-2 text-gray-600">{loadError || "This property could not be found."}</p>
          <Link href="/properties" className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 font-semibold text-white">
            Back to properties
          </Link>
        </div>
      </div>
    );
  }

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
            <a href="#" className="hover:text-sky-500 transition-colors">Santa pola</a>
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
                  Take the next step towards your life in spain.
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
                <h4 className="font-semibold mb-4">Property highlights</h4>
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
                    { icon: Download, label: "Pdf", color: "bg-gray-100 hover:bg-gray-200 text-gray-700" },
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
