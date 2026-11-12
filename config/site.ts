export const siteConfig = {
  name: "2morrow real estate",
  description: "Premium swiss real estate, offering luxury properties, exclusive projects, and comprehensive real estate services across switzerland.",
  url: "https://2morrow.ch",
  ogImage: "https://2morrow.ch/og.jpg",
  contact: {
    email: "contact@2morrow.ch",
    phone: "+41 44 000 00 00",
    address: {
      street: "Bahnhofstrasse 100",
      city: "Zurich",
      zip: "8001",
      country: "Switzerland"
    },
  },
  links: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Properties",
      href: "/properties",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "More than a network",
      href: "/network",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  footerNav: [
    {
      title: "Properties",
      items: [
        { title: "Buy", href: "/properties?transaction=buy" },
        { title: "Rent", href: "/properties?transaction=rent" },
        { title: "New projects", href: "/projects" },
      ],
    },
    {
      title: "Services",
      items: [
        { title: "Property search", href: "/services" },
        { title: "Selling", href: "/services" },
        { title: "Advisory", href: "/services" },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About us", href: "/about" },
        { title: "Network", href: "/network" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { title: "Privacy policy", href: "/privacy" },
        { title: "Terms of service", href: "/terms" },
        { title: "Imprint", href: "/imprint" },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
