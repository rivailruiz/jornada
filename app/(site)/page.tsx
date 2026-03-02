"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import { initLandingAnimations } from "@/lib/animations";

type Destination = {
  title: string;
  image: string;
  price: string;
  tours: string;
};

type FeaturedDestination = {
  title: string;
  image: string;
  description: string;
  price: string;
  stay: string;
};

type Tour = {
  title: string;
  price: string;
  duration: string;
  rating: string;
  description: string;
};

const destinations: Destination[] = [
  {
    title: "Italy",
    image: "/images/italy.svg",
    price: "From $1099 / 7 days",
    tours: "17 recommended tours"
  },
  {
    title: "Spain",
    image: "/images/spain.svg",
    price: "From $1099 / 7 days",
    tours: "17 recommended tours"
  },
  {
    title: "France",
    image: "/images/france.svg",
    price: "From $1099 / 7 days",
    tours: "17 recommended tours"
  },
  {
    title: "Portugal",
    image: "/images/portugal.svg",
    price: "From $1099 / 7 days",
    tours: "17 recommended tours"
  }
];

const featuredDestinations: FeaturedDestination[] = [
  {
    title: "Italy",
    image: "/images/italy.svg",
    description:
      "Italy unfolds among masterpieces of art and architecture, and evenings are filled with the taste of wine and pasta. From the canals of Venice to the streets of Rome, traveling through Italy is the art of enjoying life.",
    price: "€1,200 / 7 days",
    stay: "7–10 days"
  },
  {
    title: "Spain",
    image: "/images/spain.svg",
    description:
      "Spain blends dramatic landscapes, sunlit plazas, and long dinners that stretch into the night. It is built for travelers who want energy, warmth, and bold flavors in one route.",
    price: "€1,080 / 7 days",
    stay: "6–9 days"
  },
  {
    title: "France",
    image: "/images/france.svg",
    description:
      "France pairs iconic landmarks with quieter regional escapes. From Paris to Provence, each stop feels cinematic, polished, and deeply rooted in food, culture, and design.",
    price: "€1,340 / 8 days",
    stay: "7–10 days"
  },
  {
    title: "Portugal",
    image: "/images/portugal.svg",
    description:
      "Portugal offers Atlantic light, tiled streets, and coastal towns that move at a graceful pace. It is an easy blend of ocean air, old cities, and relaxed modern hospitality.",
    price: "€980 / 6 days",
    stay: "5–8 days"
  }
];

const featuredFallback = {
  title: "Wandrly picks",
  image: "/images/italy.svg",
  description:
    "Search destinations, tours, or travel themes to narrow the collection and uncover the route that fits your next journey.",
  price: "Curated routes",
  stay: "Flexible stays"
};

const tourTabs = [
  "Tours (320)",
  "Hotels (512)",
  "Flights (917)",
  "Bus tours (126)",
  "Travel guides (64)"
];

const tours: Tour[] = [
  {
    title: "Italian Mosaic",
    price: "€1459",
    duration: "7–8 days",
    rating: "4,8",
    description:
      "A journey through Italy’s most iconic cities, from Venice to Rome. Architecture, history, art, and the true taste of Italy all in one itinerary."
  },
  {
    title: "Taste of Italy",
    price: "€1119",
    duration: "5–6 days",
    rating: "4,9",
    description:
      "A journey to experience the true taste of Italy, from Tuscany’s vineyards to the Amalfi Coast, filled with food, charm, and dolce vita."
  }
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    return initLandingAnimations(rootRef.current);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredDestinations = useMemo(() => {
    if (!normalizedQuery) {
      return destinations;
    }

    return destinations.filter((destination) =>
      `${destination.title} ${destination.price} ${destination.tours}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const filteredTours = useMemo(() => {
    if (!normalizedQuery) {
      return tours;
    }

    return tours.filter((tour) =>
      `${tour.title} ${tour.description} ${tour.duration} ${tour.rating} ${tour.price}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const activeFeatured = useMemo(() => {
    if (!normalizedQuery) {
      return featuredDestinations[0];
    }

    return (
      featuredDestinations.find((destination) =>
        `${destination.title} ${destination.description} ${destination.price} ${destination.stay}`
          .toLowerCase()
          .includes(normalizedQuery)
      ) || featuredFallback
    );
  }, [normalizedQuery]);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden">
      <main className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="p-1 sm:p-2 lg:p-4">
          <Hero
            featured={activeFeatured}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <section className="mt-6 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div
              data-animate="destinations-grid"
              className="grid gap-4 sm:grid-cols-2"
            >
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <DestinationCard key={destination.title} {...destination} />
                ))
              ) : (
                <div className="rounded-[28px] border border-black/8 bg-white/72 p-6 text-black/65 shadow-card sm:col-span-2">
                  No destinations match “{searchQuery}”.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {tourTabs.map((tab, index) => (
                  <button
                    key={tab}
                    data-animate="tour-pill"
                    type="button"
                    className={`rounded-full border px-5 py-2.5 text-base transition duration-300 hover:scale-105 ${
                      index === 0
                        ? "border-black bg-black text-white"
                        : "border-black/18 bg-white/56 text-black/72"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => <TourCard key={tour.title} {...tour} />)
                ) : (
                  <div className="rounded-[30px] border border-black/8 bg-white/72 p-6 text-black/65 shadow-card md:col-span-2">
                    No tours match “{searchQuery}”.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
