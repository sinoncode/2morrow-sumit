export type PropertyType = 
  | "apartment" 
  | "house" 
  | "villa" 
  | "penthouse" 
  | "chalet" 
  | "plot" 
  | "commercial";

export type TransactionType = "buy" | "rent";

export type PropertyStatus = "available" | "reserved" | "sold" | "rented";

export interface PropertyLocation {
  address: string;
  city: string;
  zip: string;
  canton: string;
  country: string;
  neighborhood?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyCharacteristics {
  bedrooms: number;
  bathrooms: number;
  livingArea: number; // in sqm
  plotArea?: number; // in sqm
  rooms: number;
  buildYear?: number;
  renovationYear?: number;
  floor?: number;
  totalFloors?: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  status: PropertyStatus;
  price: number;
  priceOnRequest: boolean;
  currency: string;
  location: PropertyLocation;
  characteristics: PropertyCharacteristics;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
  agentId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilter {
  transactionType?: TransactionType;
  propertyType?: PropertyType[];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minArea?: number;
  status?: PropertyStatus[];
}

export interface PropertyPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PropertySort {
  field: "price" | "createdAt" | "livingArea";
  order: "asc" | "desc";
}
