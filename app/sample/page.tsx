"use client";

import { useState } from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";

import DestinationIntelligenceModal from "@/components/modals/DestinationIntelligenceModal";
import Why2morrowModal from "@/components/modals/Why2morrowModal";
import LifeProjectModal from "@/components/modals/LifeProjectModal";
import Why2MorrowModals from "@/components/modals/Why-2MorrowModal";
export default function HomePage() {
  const [isDestinationOpen, setIsDestinationOpen] =
    useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLifeProjectOpen, setIsLifeProjectOpen] =
    useState(false);
  return (
    <main className="min-h-screen bg-[#f6fbfe]">
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-6 py-20">
        <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#2780c3]">
          <Globe2 size={16} />
          Discover your next destination
        </div>

        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-[#0c2854] sm:text-6xl">
          Your next chapter starts with the right destination.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[#71839a] sm:text-base">
          Explore countries, understand the lifestyle, compare
          regions, and discover properties that fit your plans.
        </p>

        <button
          type="button"
          onClick={() => setIsDestinationOpen(true)}
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#2780c3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176ba9] hover:shadow-xl"
        >
          Explore destination intelligence
          <ArrowUpRight size={17} />
        </button>

        <button
          type="button"
          onClick={() => setShowCompanyModal(true)}
          className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#2780c3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176ba9] hover:shadow-xl"
        >
          Why 2Morrow exists

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <button
          type="button"
          onClick={() => setIsLifeProjectOpen(true)}
          className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#2780c3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176ba9] hover:shadow-xl"
        >
          Explore Your Life Project

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#2780c3] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176ba9] hover:shadow-xl"
        >
          Discover Why 2Morrow

          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </section>

      <DestinationIntelligenceModal
        open={isDestinationOpen}
        onClose={() => setIsDestinationOpen(false)}
        onStartProject={() => {
          setIsDestinationOpen(false);

          // Replace with your actual project intake route.
          window.location.href = "/start-project";
        }}
        onContact={() => {
          setIsDestinationOpen(false);

          // Replace with your actual contact route.
          window.location.href = "/contact";
        }}
      />

      <Why2morrowModal
        open={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        onStartProject={() => {
          window.location.href = "/start-project";
        }}
        onContact={() => {
          window.location.href = "/contact";
        }}
        onAction={(label) => {
          console.log("Selected company section:", label);

          // Connect each action to the appropriate route,
          // page section, or application workflow.
        }}
      />

      <LifeProjectModal
        open={isLifeProjectOpen}
        onClose={() => setIsLifeProjectOpen(false)}
        onStartProject={() => {
          window.location.href = "/start-project";
        }}
        onContact={() => {
          window.location.href = "/contact";
        }}
        onAction={(label) => {
          console.log("Life Project action:", label);

          // Connect each action to the appropriate
          // route, section, or application workflow.
        }}
      />
      <Why2MorrowModals
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartProject={() => {
          window.location.href = "/start-project";
        }}
        onContact={() => {
          window.location.href = "/contact";
        }}
        onAction={(label) => {
          console.log("Why 2Morrow action:", label);

          // Connect each action to its actual route
          // or relevant section of your application.
        }}
      />

    </main>
  );
}