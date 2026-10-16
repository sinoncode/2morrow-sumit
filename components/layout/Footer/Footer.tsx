"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import Image from "next/image";


import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { cn } from "@/lib/utils";

import Footerbg from "@/public/images/footer-bg.png";

import Logo from '@/public/images/logo/logo.png';

import SwitzerlandFlag from "@/public/images/flags/images.png";
import GermanyFlag from "@/public/images/flags/Flag-Germany.webp";
import PolandFlag from "@/public/images/flags/Flag_of_Poland.svg";
import UKFlag from "@/public/images/flags/Flag-United-Kingdom.webp";
import NetherlandsFlag from "@/public/images/flags/Flag_of_the_Netherlands.svg.webp";
import FranceFlag from "@/public/images/flags/Flag_of_France.svg.webp";

// ============================================================
// TYPES
// ============================================================

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// ============================================================
// FOOTER DATA
// ============================================================

const footerColumns: FooterColumn[] = [
  {
    title: "Real Estate",
    links: [
      { label: "Buy", href: "/buy" },
      { label: "Sell", href: "/sell" },
      { label: "Invest", href: "/invest" },
      { label: "Properties", href: "/properties" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Safe Purchase", href: "/safe-purchase" },
      { label: "Readiness", href: "/readiness" },
      { label: "Asset Strategy", href: "/asset-strategy" },
      { label: "Destinations", href: "/destinations" },
      { label: "Your Life Project", href: "/life-project" },
    ],
  },
  {
    title: "Your Journey",
    links: [
      { label: "2Morrow Angels", href: "/angels" },
      { label: "Become an Angel", href: "/become-an-angel" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "2Morrow",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Vision", href: "/vision" },
      { label: "Swiss DNA", href: "/swiss-dna" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ============================================================
// COUNTRIES
// Replace these placeholders with your actual flag images.
// ============================================================

const countries = [
  {
    name: "Switzerland",
    image: SwitzerlandFlag,
    margin: "mt-0 mr-20",
  },
  {
    name: "Germany",
    image: GermanyFlag,
    margin: "mt-0 mr-20",
  },
  {
    name: "Poland",
    image: PolandFlag,
    margin: "mt-0 mr-20",
  },
  {
    name: "United Kingdom",
    image: UKFlag,
    margin: "mt-0 ml-8",
  },
  {
    name: "Netherlands",
    image: NetherlandsFlag,
    margin: "mt-0 ml-10",
  },
  {
    name: "France",
    image: FranceFlag,
    margin: "mt-0 ml-10",
  },
];

// ============================================================
// SOCIAL LINKS
// ============================================================

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: InstagramIcon,
    className:
      "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: LinkedInIcon,
    className: "bg-[#087aad]",
  },
  {
    label: "X",
    href: "#",
    icon: XIcon,
    className: "bg-[#000000]",
  },
  {
    label: "Facebook",
    href: "#",
    icon: FacebookIcon,
    className: "bg-[#4267B2]",
  },
];

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};




// ============================================================
// LOGO PLACEHOLDER
// Replace this with your actual logo later.
// ============================================================

const FooterLogo = () => {
  return (
    <Link
      href="/"
      aria-label="2Morrow Home"
      className="group inline-flex items-center"
    >
      
        <Image
          src={Logo}
          alt="2Morrow"
          width={230}
          height={80}
          className="object-contain"
        />
    </Link>
  );
};

// ============================================================
// COUNTRY FLAG PLACEHOLDER
// Replace each with your actual flag image later.
// ============================================================

const CountryBadge = ({
  country,
  index,
  className,
}: {
  country: (typeof countries)[number];
  index: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 25,
        rotate: index % 2 === 0 ? -5 : 5,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        opacity: {
          duration: 0.5,
          delay: index * 0.08,
        },
        scale: {
          duration: 0.6,
          delay: index * 0.08,
          type: "spring",
          stiffness: 180,
          damping: 14,
        },
        y: {
          duration: 0.6,
          delay: index * 0.08,
          type: "spring",
          stiffness: 180,
          damping: 14,
        },
        rotate: {
          duration: 0.6,
          delay: index * 0.08,
          type: "spring",
          stiffness: 160,
          damping: 14,
        },
      }}
      whileHover={{
        y: -8,
        scale: 1.08,
        rotate: index % 2 === 0 ? -2 : 2,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      className={cn(
        "group relative h-[76px] w-[88px] cursor-pointer sm:h-[90px] sm:w-[96px]",
        className
      )}
    >
      {/* =====================================================
          OUTER GLOW
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-[-10px]
          rounded-full
          bg-[#2780c3]/20
          opacity-0
          blur-xl
        "
        whileHover={{
          opacity: 1,
          scale: 1.15,
        }}
        transition={{
          duration: 0.35,
        }}
      />

      {/* =====================================================
          FLAG CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          h-full
          w-full
          overflow-hidden
          bg-white
          shadow-[0_6px_20px_rgba(0,0,0,0.10)]
          [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
          transition-shadow
          duration-300
          group-hover:shadow-[0_12px_30px_rgba(39,128,195,0.25)]
        "
      >
        {/* =================================================
            FLAG IMAGE
        ================================================= */}

        <motion.div
          className="absolute inset-0"
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={country.image}
            alt={`${country.name} flag`}
            fill
            sizes="96px"
            className="
              object-cover
              transition-transform
              duration-500
            "
            priority={index < 3}
          />
        </motion.div>

        {/* =================================================
            SOFT WHITE SHINE
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/30
            via-transparent
            to-transparent
            opacity-70
          "
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
        />

        {/* =================================================
            HOVER LIGHT SWEEP
        ================================================= */}

        <motion.div
          className="
            pointer-events-none
            absolute
            -left-[120%]
            top-0
            h-full
            w-[70%]
            rotate-[20deg]
            bg-gradient-to-r
            from-transparent
            via-white/50
            to-transparent
          "
          whileHover={{
            left: "140%",
          }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          OUTER BORDER
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]
          ring-1
          ring-black/5
          transition-all
          duration-300
          group-hover:ring-2
          group-hover:ring-[#2780c3]/30
        "
      />

      {/* =====================================================
          SMALL HOVER DOT
      ===================================================== */}

      <motion.span
        initial={{
          scale: 0,
          opacity: 0,
        }}
        whileHover={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          absolute
          -right-1
          -top-1
          h-3
          w-3
          rounded-full
          bg-[#2780c3]
          shadow-[0_0_12px_rgba(39,128,195,0.6)]
        "
      />
    </motion.div>
  );
};

// ============================================================
// MAIN FOOTER
// ============================================================

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#fafafa] bg-cover bg-center bg-no-repeat text-[#666666]"
      style={{ backgroundImage: `url(${Footerbg.src})` }}
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.55, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="
            absolute
            -left-32
            -top-20
            h-[600px]
            w-[600px]
            rotate-[32deg]
            border-[70px]
            border-[#e8e8e8]/50
          "
        />

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.35, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.15 }}
          className="
            absolute
            -right-40
            top-0
            h-[500px]
            w-[500px]
            rotate-[32deg]
            border-[55px]
            border-[#ededed]
          "
        />

        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.75)_35%,transparent_60%)]" />

        <div className="absolute bottom-0 left-1/2 h-40 w-[700px] -translate-x-1/2 rounded-full bg-[#2780c3]/5 blur-[100px]" />
      </div> */}

      {/* ======================================================
          MAIN FOOTER CONTENT
      ====================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="
          relative
          z-10
          mx-auto
          max-w-[1480px]
          px-6
          py-16
          sm:px-8
          lg:px-12
          lg:py-20
          xl:px-16
        "
      >
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr_1.25fr] lg:gap-8 xl:gap-12">
          {/* ==================================================
              BRAND / CONTACT
          ================================================== */}

          <motion.div variants={fadeUpVariants} className="mt-[-0.8rem]">
            <FooterLogo />

            <div className="mt-0">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#111111]">
                Contact Info
              </h3>

              <div className="mt-5 h-px w-24 bg-[#cfcfcf]" />

              <div className="mt-5 space-y-4">
                {/* Phone */}
                <motion.a
                  href="tel:+41797958390"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08ae28] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-[18px] w-[18px]" />
                  </span>

                  <span className="text-[15px] text-[#333333] transition-colors group-hover:text-[#2780c3]">
                    +41 79 795 83 90
                  </span>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:info@2morrow-re.ch"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2780c3] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Mail className="h-[18px] w-[18px]" />
                  </span>

                  <span className="text-[15px] text-[#333333] transition-colors group-hover:text-[#2780c3]">
                    info@2morrow-re.ch
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              FOOTER LINK COLUMNS
          ================================================== */}

          {footerColumns.map((column) => (
            <motion.div
              key={column.title}
              variants={fadeUpVariants}
              className="lg:pt-1"
            >
              <h3 className="text-[17px] font-medium text-[#2780c3]">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-[16px]
                        text-[#707070]
                        transition-all
                        duration-300
                        hover:translate-x-1
                        hover:text-[#2780c3]
                      "
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        className="
                          h-3.5
                          w-3.5
                          -translate-y-0.5
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:opacity-100
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ==================================================
              COUNTRY / SOCIAL AREA
          ================================================== */}

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-start lg:items-center"
          >
            {/* Country flags */}

           <div className="grid w-full max-w-[280px] grid-cols-3 place-items-center gap-x-25 gap-y-0">
  {countries.map((country, index) => (
    <CountryBadge
    className={`
  group
  relative
  h-[76px]
  w-[88px]
  cursor-pointer
  sm:h-[84px]
  sm:w-[96px]
  ${country.margin}
`}
      key={country.name}
      country={country}
      index={index}
    />
  ))}
</div>

            {/* Divider */}

            <div className="mt-6 h-px w-full max-w-[220px] bg-[#d4d4d4]" />

            {/* Social Icons */}

            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                      duration: 0.3,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.08,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex
                      h-[46px]
                      w-[46px]
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      shadow-sm
                      transition-shadow
                      duration-300
                      hover:shadow-lg
                      ${social.className}
                    `}
                  >
                    <Icon className="h-[23px] w-[23px]" strokeWidth={2} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ======================================================
          COPYRIGHT
      ====================================================== */}

      <div className="relative z-10 border-t border-[#d5d5d5]">
        <div className="mx-auto flex min-h-[96px] max-w-[1480px] items-center justify-center px-6 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-[15px] text-[#666666]"
          >
            ©2026{" "}
            <span className="font-medium text-[#111111]">2MORROW</span>{" "}
            All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}