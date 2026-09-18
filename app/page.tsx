"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Globe,
  Home,
  MapPin,
  ClipboardList,
  Shield,
  Users,
  Star,
  TrendingUp,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Award,
  Lock,
  Clock,
  Handshake,
  Building2,
  Menu,
  X,
  ChevronDown,
  Play,
  Download,
} from "lucide-react";

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState("SWITZERLAND");
  const [activePropertyTab, setActivePropertyTab] = useState("Rent");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const destinations = [
    "SWITZERLAND",
    "SPAIN",
    "PORTUGAL",
    "GREECE",
    "FRANCE",
    "ITALY",
    "BALI",
    "THAILAND",
  ];

  const propertyTabs = ["Sell", "Rent", "Keep", "Optimize"];

  const journeySteps = [
    {
      icon: Search,
      title: "Discover",
      desc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      icon: ClipboardList,
      title: "Structure",
      desc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      icon: Globe,
      title: "Assess",
      desc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      icon: Shield,
      title: "Explore",
      desc: "Lorem Ipsum is simply dummy text of the printing.",
    },
    {
      icon: Users,
      title: "Verify",
      desc: "Lorem Ipsum is simply dummy text of the printing.",
    },
  ];

  const readinessCards = [
    {
      icon: Heart,
      category: "Lifestyle",
      title: "How do you want to live?",
      desc: "Define the daily life and surroundings that matter to you.",
    },
    {
      icon: TrendingUp,
      category: "Assets",
      title: "What could your property make possible?",
      desc: "Consider selling, renting, keeping or improving your property.",
    },
    {
      icon: FileText,
      category: "Finances",
      title: "What can you comfortably plan for?",
      desc: "Understand your budget, financing and future ownership costs.",
    },
    {
      icon: Users,
      category: "Family",
      title: "Who is part of your next chapter?",
      desc: "Consider the needs and expectations of everyone involved.",
    },
  ];

  const proofStats = [
    { icon: Home, label: "Properties sold" },
    { icon: Globe, label: "Countries covered" },
    { icon: Handshake, label: "International transactions" },
    { icon: Shield, label: "Verified partners" },
    { icon: Users, label: "Client stories" },
    { icon: Star, label: "Angels active" },
    { icon: Award, label: "Client satisfaction" },
  ];

  const swissDNA = [
    {
      icon: Award,
      title: "Quality",
      desc: "Taking the time to do things properly",
    },
    {
      icon: Search,
      title: "Precision",
      desc: "Understanding the details before making important decisions.",
    },
    {
      icon: Lock,
      title: "Confidentiality",
      desc: "Property Treating personal, financial information with the discretion it deserves.",
    },
    {
      icon: Clock,
      title: "Reliability",
      desc: "Creating processes people can understand and professionals can depend on.",
    },
    {
      icon: Handshake,
      title: "Responsibility",
      desc: "Creating processes people can understand and professionals can depend on.",
    },
  ];

  const properties = [
    {
      image: "/api/placeholder/400/300",
      tags: ["Purchase", "Sell", "Relocation"],
      title: "Swiss Property sold Retirement property acquired.",
      subtitle: "Relocation Coordinated",
    },
    {
      image: "/api/placeholder/400/300",
      tags: ["Purchase", "Sell", "Relocation"],
      title: "Swiss Property sold Retirement property acquired.",
      subtitle: "Relocation Coordinated",
    },
    {
      image: "/api/placeholder/400/300",
      tags: ["Purchase", "Sell", "Relocation"],
      title: "Swiss Property sold Retirement property acquired.",
      subtitle: "Relocation Coordinated",
    },
    {
      image: "/api/placeholder/400/300",
      tags: ["Purchase", "Sell", "Relocation"],
      title: "Swiss Property sold Retirement property acquired.",
      subtitle: "Relocation Coordinated",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-50" />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white z-10" />
            <img
              src="/api/placeholder/800/600"
              alt="Hero"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your next Property Your
              <span className="text-sky-500"> next Chapter.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Buying, selling or moving abroad? Connect your property decisions
              with the life you want to create.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Discover your 2Morrow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-sky-500 hover:text-sky-500 transition-colors"
              >
                Explore Properties
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* First Your Life Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              First, your life <span className="text-sky-500">Then, the right property.</span>
            </h2>
            <p className="text-gray-600">Your Priorities guide every next step.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, num: "01", label: "PERSON", desc: "Your profiles and plans." },
              { icon: Heart, num: "02", label: "LIFESTYLE", desc: "The way you want to live." },
              { icon: Globe, num: "03", label: "DESTINATION", desc: "A place that fits your life." },
              { icon: Home, num: "04", label: "PROPERTY", desc: "A property with purpose." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                    <item.icon className="w-10 h-10 text-sky-500" />
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-1/2 w-full h-0.5 bg-gradient-to-r from-sky-300 to-transparent transform -translate-y-1/2" />
                  )}
                </div>
                <span className="text-sky-500 font-semibold text-sm mb-1">{item.num}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About 2Morrow Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">
                ABOUT 2MORROW
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-6">
                More than Real Estate
                <br />
                <span className="text-sky-500">A Project for your next Life</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Born in Switzerland. Built for the world.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                2Morrow connects property decisions with your life, your assets and your future – in
                Switzerland and internationally.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Local insight, professional expertise and useful technology, brought together around your
                project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Discover your 2Morrow
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/api/placeholder/600/400"
                  alt="About 2Morrow"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 2Morrow Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The 2Morrow Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              One person. One strategy. One connected journey.
              <br />
              Your situation may be complex. Your journey should not be.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-sky-200" />
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
            >
              {journeySteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="relative z-10 w-24 h-24 rounded-full bg-white border-4 border-sky-100 flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="w-10 h-10 text-sky-500" />
                  </div>
                  <span className="text-sky-500 font-bold text-lg mb-2">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
            >
              Start Your Life Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Real Estate Remains at the Heart */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-sky-400 rounded-2xl" />
                <img
                  src="/api/placeholder/500/400"
                  alt="Real Estate"
                  className="relative rounded-2xl shadow-xl w-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Real Estate Remains at the <span className="text-sky-500">Heart of 2Morrow</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Every Life Project eventually meets a real property decision.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether you are buying, selling, investing or optimising an existing asset, 2Morrow provides the market
                knowledge, local expertise and professional coordination needed to move forward with confidence.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We carefully connect each client with solutions that reflect their objectives, financial situation and
                desired way of life — in Switzerland or internationally.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Because we do more than present properties. We help right property supports the right project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Explore Properties
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Ready is your Life Project? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                How Ready is your <span className="text-sky-500">Life Project?</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A successful property decision depends on more than finding the right home.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The 2Morrow Life Transition Readiness approach helps you understand whether the life project is where
                greater clarity or professional support may be useful. It is not about passing or failing. It is about
                moving forward with better preparation, fewer uncertainties and greater confidence.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Explore your readiness
              </motion.button>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="lg:col-span-2 grid sm:grid-cols-2 gap-6"
            >
              {readinessCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="bg-gray-50 rounded-2xl p-6 cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{card.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1">{card.title}</h3>
                    </div>
                    <card.icon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                  <ArrowRight className="w-5 h-5 text-sky-500 mt-4" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Your Destination Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your Destination Map</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
              been the industry&apos;s standard dummy text ever since 1966, when designers
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setActiveDestination(dest)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeDestination === dest
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                    : "bg-white text-gray-600 hover:bg-sky-50"
                }`}
              >
                {dest}
              </button>
            ))}
          </div>

          <motion.div
            key={activeDestination}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[400px] bg-gradient-to-br from-sky-100 to-blue-50">
              <img
                src="/api/placeholder/1200/400"
                alt="Destination Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <h3 className="text-4xl sm:text-5xl font-bold text-sky-500/80 mb-4">
                  {activeDestination}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-gray-800 rounded-full font-semibold shadow-lg flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download E-Book
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Your Property today Can Help Finance your life Tomorrow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your Property today Can Help <span className="text-sky-500">Finance your life Tomorrow</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Before deciding what to buy next, consider what you already own. Selling, renting,
                keeping or improving your property can support different goals. 2Morrow helps
                connect these choices with your timing, resources and future plans.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {propertyTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePropertyTab(tab)}
                    className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                      activePropertyTab === tab
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                        : "bg-gray-100 text-gray-600 hover:bg-sky-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-sky-500 text-sky-500 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-colors"
              >
                Discover Asset & Financial Strategy
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/api/placeholder/600/400"
                alt="Property Finance"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1400/600"
            alt="Proof Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sky-500/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Proof</h2>
            <p className="text-white/90 max-w-3xl leading-relaxed">
              A vision is only valuable when it works in real life. Trust should never be built on slogans
              alone. As 2Morrow develops, this section should become the evidence layer of the
              homepage. It should progressively accommodate client stories, properties sold and
              purchased, countries and destinations covered, verified professional partners, 2Morrow
              Angels, client satisfaction and, eventually, Readiness outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
          >
            {proofStats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer hover:bg-white/20 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <p className="text-white text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Swiss DNA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">SWISS DNA</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Swiss by origin. International by nature.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                2Morrow was born in Switzerland, and this naturally shapes the way we work.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our Swiss DNA is not a slogan. It is reflected in the standards we set for ourselves and in
                the way we want to build relationships with our clients, partners and communities.
              </p>

              <div className="flex justify-center lg:justify-start">
                <img
                  src="/api/placeholder/300/300"
                  alt="Swiss DNA"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {swissDNA.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Discover 2Morrow
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sky-500 font-semibold text-sm uppercase tracking-wider">
                INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-6">
                Knowledge before decisions.
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Changing country, buying internationally or reorganising property assets creates questions long before it
                creates a transaction.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The 2Morrow Insights platform should become a trusted source of practical intelligence around international
                real estate, retirement abroad, relocation, Silver Economy, property investment, asset strategy, destinations,
                technology, AI, legal and tax considerations, living internationally and the changing meaning of home.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200"
              >
                Explore 2Morrow Insights
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/api/placeholder/600/400"
                alt="Insights"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Last Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Last <span className="text-sky-500">Properties</span>
            </h2>
            <p className="text-gray-600">
              A vision is only valuable when it works in real life.
              <br />
              Trust should never be built on slogans
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {properties.map((prop, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={prop.image}
                    alt="Property"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {prop.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tag === "Purchase"
                            ? "bg-sky-500 text-white"
                            : tag === "Sell"
                            ? "bg-green-500 text-white"
                            : "bg-orange-500 text-white"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-1">{prop.title}</p>
                  <p className="text-xs text-gray-500 mb-3">{prop.subtitle}</p>
                  <button className="text-sky-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    More Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <span className="text-2xl font-bold">MORROW</span>
              </div>
              <p className="text-gray-400 mb-6">
                real estate
                <br />
                Your Life Project
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+41 79 795 83 90</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>info@2morrow.ch</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Real Estate</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Buy</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Sell</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Invest</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Properties</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">Safe Purchase</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Readiness</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Asset Strategy</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Your Life Project</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Your Journey</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">2Morrow Angels</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Become an Angel</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Insights</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">2Morrow</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-sky-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Our Vision</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Swiss DNA</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-sky-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              ©2026 2MORROW All Rights Reserved.
            </p>
              <div className="flex gap-4">
                {[InstagramIcon, LinkedInIcon, FacebookIcon, XIcon].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
 