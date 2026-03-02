"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import DestinationCard from "@/components/DestinationCard";
import TourCard from "@/components/TourCard";
import { initLandingAnimations } from "@/lib/animations";
import { withBasePath } from "@/lib/base-path";

const savedDestinations = [
  {
    title: "Kyoto",
    image: "/images/france.svg",
    price: "Saved for cherry blossom season",
    tours: "4 tailored routes"
  },
  {
    title: "Amalfi",
    image: "/images/italy.svg",
    price: "Ocean escape · June shortlist",
    tours: "9 stays and itineraries"
  },
  {
    title: "Porto",
    image: "/images/portugal.svg",
    price: "City break · Food and design",
    tours: "6 recommended plans"
  }
];

const profileTours = [
  {
    title: "Northern Lights Edit",
    price: "€1890",
    duration: "6–7 days",
    rating: "4,9",
    description:
      "A winter-first route through Tromso and the Lyngen Alps, designed around quiet stays, flexible aurora nights, and cinematic landscapes."
  },
  {
    title: "Lisbon to Comporta",
    price: "€980",
    duration: "4–5 days",
    rating: "4,8",
    description:
      "A polished warm-weather reset with design hotels, coastal drives, natural wine spots, and a softer pace between city and sea."
  }
];

function MetricCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div
      data-animate="profile-card"
      className="rounded-[28px] border border-black/6 bg-white/72 p-5 shadow-card"
    >
      <p className="text-sm uppercase tracking-[0.14em] text-black/42">{label}</p>
      <p className="mt-4 text-[2.6rem] font-medium tracking-[-0.07em] leading-none text-black">
        {value}
      </p>
      <p className="mt-3 text-[0.98rem] leading-7 text-black/64">{detail}</p>
    </div>
  );
}

function DetailRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/8 py-3 last:border-b-0">
      <span className="text-black/56">{label}</span>
      <span className="font-medium text-black">{value}</span>
    </div>
  );
}

export default function ProfilePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    return initLandingAnimations(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden">
      <main className="relative mx-auto max-w-[1440px] px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="space-y-6 p-1 sm:p-2 lg:p-4">
          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <article
              data-animate="profile-hero"
              className="overflow-hidden rounded-[38px] border border-black/6 bg-white/72 p-6 shadow-soft sm:p-8"
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-center gap-5">
                  <div className="h-24 w-24 overflow-hidden rounded-[28px] border border-black/8 bg-[#f6d2ba] shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
                    <img
                      src={withBasePath("/images/avatar.svg")}
                      alt="Sandra Perry avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-black/42">
                      Profile
                    </p>
                    <h1 className="mt-2 text-[clamp(2.6rem,5vw,4.8rem)] font-light tracking-[-0.08em] leading-[0.92] text-black">
                      Sandra Perry
                    </h1>
                    <p className="mt-3 max-w-[28ch] text-[1.02rem] leading-7 text-black/64">
                      Designing quieter escapes, coastal resets, and city edits with room for
                      spontaneity.
                    </p>
                  </div>
                </div>

                <div className="rounded-[30px] border border-black/8 bg-brand-yellow/55 px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.16em] text-black/48">
                    Travel DNA
                  </p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.05em] text-black">
                    Slow luxury
                  </p>
                  <p className="mt-2 text-sm leading-6 text-black/62">
                    Boutique hotels, food-led routes, architecture, and walkable cities.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <MetricCard label="Countries" value="18" detail="Visited across Europe, North America, and Asia." />
                <MetricCard label="Trips planned" value="42" detail="Personal itineraries and curated edits saved in Wandrly." />
                <MetricCard label="Upcoming" value="03" detail="One confirmed route and two drafts ready to book." />
              </div>
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              <article
                data-animate="profile-card"
                className="rounded-[34px] border border-black/6 bg-white/78 p-6 shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-black/42">
                      Upcoming trip
                    </p>
                    <h2 className="mt-3 text-[2.4rem] font-medium tracking-[-0.06em] leading-none">
                      Amalfi Coast
                    </h2>
                    <p className="mt-3 text-[1rem] leading-7 text-black/64">
                      9 days across Sorrento, Positano, Ravello, and Capri with two slow travel
                      stops for food and rest.
                    </p>
                  </div>
                  <span className="rounded-full border border-black/10 bg-brand-yellow/70 px-4 py-2 text-sm font-medium text-black">
                    Confirmed
                  </span>
                </div>

                <div className="mt-8 overflow-hidden rounded-[24px] bg-brand-cream">
                  <Image
                    src={withBasePath("/images/italy.svg")}
                    alt="Upcoming Amalfi trip"
                    width={900}
                    height={680}
                    unoptimized
                    className="h-[220px] w-full object-cover"
                  />
                </div>

                <div className="mt-6">
                  <DetailRow label="Dates" value="12 Jun → 21 Jun" />
                  <DetailRow label="Companions" value="2 travelers" />
                  <DetailRow label="Budget" value="€3,200" />
                </div>
              </article>

              <article
                data-animate="profile-card"
                className="rounded-[34px] border border-black/6 bg-black p-6 text-white shadow-[0_28px_70px_rgba(0,0,0,0.22)]"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-white/42">Travel wallet</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[3rem] font-medium tracking-[-0.07em] leading-none">24,800</p>
                    <p className="mt-2 text-sm text-white/54">Wandrly points available</p>
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/78">
                    Gold tier
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/48">Best month to redeem</p>
                    <p className="mt-2 text-xl font-medium tracking-[-0.05em]">September city edits</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/48">Preferred cabin</p>
                    <p className="mt-2 text-xl font-medium tracking-[-0.05em]">Premium economy</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/48">Favorite stay style</p>
                    <p className="mt-2 text-xl font-medium tracking-[-0.05em]">Design hotels by the water</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-black/42">Saved places</p>
                  <h2 className="mt-2 text-[2.8rem] font-light tracking-[-0.07em] leading-none text-black">
                    Curated shortlist
                  </h2>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-black/10 bg-white/72 px-5 py-2.5 text-sm font-medium text-black transition duration-300 hover:scale-105"
                >
                  View all
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {savedDestinations.map((destination) => (
                  <DestinationCard key={destination.title} {...destination} />
                ))}
              </div>
            </div>

            <article
              data-animate="profile-card"
              className="rounded-[34px] border border-black/6 bg-white/76 p-6 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-black/42">Travel rhythm</p>
                  <h2 className="mt-2 text-[2.5rem] font-medium tracking-[-0.06em] leading-none">
                    This season
                  </h2>
                </div>
                <span className="text-3xl text-black/62">↗</span>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-black/52">
                    <span>Coastal routes</span>
                    <span>78%</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/8">
                    <div className="h-3 w-[78%] rounded-full bg-brand-yellow" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-black/52">
                    <span>Food-first itineraries</span>
                    <span>64%</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/8">
                    <div className="h-3 w-[64%] rounded-full bg-black" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-black/52">
                    <span>Design stays</span>
                    <span>86%</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/8">
                    <div className="h-3 w-[86%] rounded-full bg-[#D7C300]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-black/8 bg-brand-yellow/48 p-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-black/46">Best fit</p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.05em] text-black">
                    Mediterranean shoulder season
                  </p>
                </div>
                <div className="rounded-[24px] border border-black/8 bg-white p-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-black/46">Wishlist mode</p>
                  <p className="mt-2 text-xl font-medium tracking-[-0.05em] text-black">
                    Kyoto, Copenhagen, Menorca
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-black/42">Recommended next</p>
              <h2 className="mt-2 text-[2.8rem] font-light tracking-[-0.07em] leading-none text-black">
                Trips aligned to your profile
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {profileTours.map((tour) => (
                <TourCard key={tour.title} {...tour} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
