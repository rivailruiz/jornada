"use client";

import Image from "next/image";

type HeroProps = {
  featured: {
    title: string;
    image: string;
    description: string;
    price: string;
    stay: string;
  };
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h11M4 17h16M17 7h3M4 12h16M10 12h10M13 17h7" />
      <circle cx="13" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
      <circle cx="8" cy="12" r="2" />
    </svg>
  );
}

function Plane({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="currentColor">
      <path d="M43.6 21.7 28 18.6 20.7 4.7c-.8-1.6-3.1-1.6-3.9 0l-1.3 2.6 4.1 14.2-9.5-1.9-4.8-5.6c-.9-1.1-2.6-.6-2.8.8L2 18.2l7.1 5.2-.7 2.9L2.4 31.5l.5 3.5c.2 1.4 1.9 1.9 2.8.8l4.8-5.7 9.5-1.8-4.1 14.1 1.3 2.7c.8 1.6 3.1 1.6 3.9 0L28 31.4l15.6-3.1c2.4-.5 2.4-3.9 0-4.6Z" />
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20 0c1.6 11 8.9 18.4 20 20-11.1 1.6-18.4 8.9-20 20-1.6-11.1-8.9-18.4-20-20C11.1 18.4 18.4 11 20 0Z" />
    </svg>
  );
}

function GlobeArtwork() {
  const latitudes = [90, 120, 150, 180, 210, 240, 270];
  const meridians = [0, 25, -25, 50, -50];

  return (
    <div
      data-hero="globe"
      className="relative mx-auto mt-8 aspect-square w-full max-w-[360px] sm:mt-0 lg:max-w-[420px]"
    >
      <div
        data-hero="globe-core"
        className="absolute inset-[19%] rounded-full border border-black/65"
      >
        <svg viewBox="0 0 220 220" className="h-full w-full">
          <circle cx="110" cy="110" r="78" fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="1.2" />
          {latitudes.map((cy) => (
            <ellipse
              key={cy}
              cx="110"
              cy={110}
              rx="78"
              ry={Math.abs(110 - cy) * 0.48}
              fill="none"
              stroke="rgba(0,0,0,0.46)"
              strokeWidth="1"
            />
          ))}
          {meridians.map((rotation) => (
            <ellipse
              key={rotation}
              cx="110"
              cy="110"
              rx="30"
              ry="78"
              fill="none"
              stroke="rgba(0,0,0,0.46)"
              strokeWidth="1"
              transform={`rotate(${rotation} 110 110)`}
            />
          ))}
        </svg>
      </div>

      <div
        data-orbit="outer"
        className="absolute inset-[2%] rounded-full border border-black/55 [transform:rotate(18deg)]"
      >
        <Plane className="absolute -right-3 top-1/2 h-12 w-12 -translate-y-1/2 text-black" />
      </div>
      <div
        data-orbit="mid"
        className="absolute inset-[7%] rounded-full border border-black/55 [transform:rotate(-24deg)]"
      >
        <Plane className="absolute left-8 top-2 h-10 w-10 text-black" />
      </div>
      <div
        data-orbit="inner"
        className="absolute inset-[13%] rounded-full border border-black/55 [transform:rotate(36deg)]"
      >
        <Plane className="absolute bottom-2 right-14 h-11 w-11 text-black" />
      </div>

      <Star className="absolute left-3 top-6 h-10 w-10 text-black/90" />
      <Star className="absolute right-6 top-12 h-6 w-6 text-black/90" />
      <Star className="absolute bottom-8 left-4 h-8 w-8 text-black/90" />
      <Star className="absolute bottom-3 right-12 h-6 w-6 text-black/90" />
    </div>
  );
}

const filters = ["All", "Europe", "Asia", "USA"];

export default function Hero({ featured, searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="grid gap-8 p-2 sm:p-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.85fr)] xl:items-center">
        <div className="space-y-8">
          <div>
            <h1
              data-hero="title"
              className="max-w-[8.5ch] text-balance text-[clamp(3.25rem,8vw,6.25rem)] font-light tracking-[-0.08em] leading-[0.9] text-black"
            >
              Create your next journey
            </h1>
            <p
              data-hero="subtitle"
              className="mt-8 max-w-[24ch] text-[1.12rem] leading-8 text-black/68"
            >
              Collections of inspiring routes and destinations around the world
            </p>
          </div>

          <div data-hero="filters" className="flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full border px-5 py-2.5 text-base transition duration-300 hover:scale-105 ${
                  index === 0
                    ? "border-black bg-black text-white"
                    : "border-black/20 bg-white/55 text-black/76"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <GlobeArtwork />
      </div>

      <div className="space-y-5">
        <label
          data-hero="search"
          className="flex items-center gap-4 rounded-[28px] border border-black/10 bg-white/56 px-5 py-5 shadow-soft"
        >
          <SearchIcon />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Where we go?"
            className="min-w-0 flex-1 bg-transparent text-[1.08rem] text-black outline-none placeholder:text-black/58"
            aria-label="Search destinations and tours"
          />
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/75 transition duration-300 hover:scale-105"
            aria-label={searchQuery ? "Clear search" : "Search options"}
          >
            <FilterIcon />
          </button>
        </label>

        <article
          data-hero="featured"
          className="group overflow-hidden rounded-[34px] border border-black/6 bg-white/82 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
        >
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-[26px] bg-brand-cream">
              <Image
                src={featured.image}
                alt={featured.title}
                width={920}
                height={800}
                unoptimized
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-medium tracking-[-0.06em] leading-none">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-[30ch] text-[1.04rem] leading-8 text-black/68">
                    {featured.description}
                  </p>
                </div>
                <span className="mt-1 text-3xl text-black/75 transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <div className="grid gap-4 border-t border-black/8 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-[2.2rem] font-medium tracking-[-0.06em] leading-none">
                    {featured.price}
                  </p>
                  <p className="mt-2 text-base text-black/58">Average tour price</p>
                </div>
                <div>
                  <p className="text-[2.2rem] font-medium tracking-[-0.06em] leading-none">
                    {featured.stay}
                  </p>
                  <p className="mt-2 text-base text-black/58">Average stay duration</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
