import { Property } from "@/types";

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    slug: "luxury-penthouse-zurich",
    title: "Luxury penthouse with lake view",
    description: "Exceptional penthouse located in the heart of zurich offering breathtaking views of lake zurich and the alps. This premium property features high-end finishes, a private rooftop terrace, and state-of-the-art smart home technology.",
    propertyType: "penthouse",
    transactionType: "buy",
    status: "available",
    price: 4500000,
    priceOnRequest: false,
    currency: "CHF",
    location: {
      address: "Seestrasse 100",
      city: "Zurich",
      zip: "8002",
      canton: "Zurich",
      country: "Switzerland",
      neighborhood: "Enge"
    },
    characteristics: {
      bedrooms: 3,
      bathrooms: 3,
      livingArea: 240,
      rooms: 5.5,
      buildYear: 2021,
      floor: 5,
      totalFloors: 5
    },
    images: [
      {
        id: "img-1-1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
        alt: "Modern luxury penthouse living room",
        isPrimary: true
      },
      {
        id: "img-1-2",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
        alt: "Penthouse bedroom with city view",
        isPrimary: false
      }
    ],
    amenities: [
      { id: "am-1", name: "Lake view" },
      { id: "am-2", name: "Rooftop terrace" },
      { id: "am-3", name: "Smart home" },
      { id: "am-4", name: "Wine cellar" },
      { id: "am-5", name: "2 parking spaces" }
    ],
    agentId: "agent-1",
    featured: true,
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-11-20T14:30:00Z"
  },
  {
    id: "prop-2",
    slug: "modern-villa-geneva",
    title: "Contemporary villa in cologny",
    description: "Stunning contemporary villa situated in the prestigious municipality of cologny. Designed by an award-winning architect, this home blends seamless indoor-outdoor living with panoramic views of lake geneva.",
    propertyType: "villa",
    transactionType: "buy",
    status: "available",
    price: 12500000,
    priceOnRequest: true,
    currency: "CHF",
    location: {
      address: "Route de la capite 50",
      city: "Cologny",
      zip: "1223",
      canton: "Geneva",
      country: "Switzerland"
    },
    characteristics: {
      bedrooms: 5,
      bathrooms: 6,
      livingArea: 650,
      plotArea: 2500,
      rooms: 10,
      buildYear: 2023
    },
    images: [
      {
        id: "img-2-1",
        url: "https://images.unsplash.com/photo-1613490908571-9f2095cc2599?auto=format&fit=crop&q=80&w=2000",
        alt: "Contemporary villa exterior at dusk",
        isPrimary: true
      }
    ],
    amenities: [
      { id: "am-6", name: "Infinity pool" },
      { id: "am-7", name: "Spa & wellness" },
      { id: "am-8", name: "Home cinema" },
      { id: "am-9", name: "Guest house" }
    ],
    agentId: "agent-2",
    featured: true,
    createdAt: "2023-11-01T09:15:00Z",
    updatedAt: "2023-11-25T11:20:00Z"
  },
  {
    id: "prop-3",
    slug: "historic-chalet-zermatt",
    title: "Authentic alpine chalet",
    description: "Beautifully restored historic chalet offering unobstructed views of the matterhorn. Combines traditional swiss craftsmanship with modern luxury amenities.",
    propertyType: "chalet",
    transactionType: "buy",
    status: "available",
    price: 6800000,
    priceOnRequest: false,
    currency: "CHF",
    location: {
      address: "Winkelmatten",
      city: "Zermatt",
      zip: "3920",
      canton: "Valais",
      country: "Switzerland"
    },
    characteristics: {
      bedrooms: 4,
      bathrooms: 4,
      livingArea: 320,
      rooms: 7,
      buildYear: 1950,
      renovationYear: 2022
    },
    images: [
      {
        id: "img-3-1",
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000",
        alt: "Luxury alpine chalet exterior",
        isPrimary: true
      }
    ],
    amenities: [
      { id: "am-10", name: "Matterhorn view" },
      { id: "am-11", name: "Ski-in/ski-out" },
      { id: "am-12", name: "Sauna" },
      { id: "am-13", name: "Fireplace" }
    ],
    agentId: "agent-1",
    featured: false,
    createdAt: "2023-09-10T14:45:00Z",
    updatedAt: "2023-10-05T08:30:00Z"
  }
];
