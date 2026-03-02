type TourCardProps = {
  title: string;
  price: string;
  duration: string;
  rating: string;
  description: string;
};

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.8" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10.5h17" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m12 4 2.35 4.76L19.6 9.5l-3.8 3.7.9 5.3L12 16l-4.7 2.5.9-5.3-3.8-3.7 5.25-.74L12 4Z" />
    </svg>
  );
}

export default function TourCard({
  title,
  price,
  duration,
  rating,
  description
}: TourCardProps) {
  return (
    <article
      data-animate="tour-card"
      className="group relative overflow-hidden rounded-[30px] border border-black/6 bg-white/72 p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_54px_rgba(15,23,42,0.12)]"
    >
      <span className="pointer-events-none absolute inset-0 rounded-[30px] border border-transparent transition duration-300 group-hover:border-brand-yellow" />

      <div className="flex items-start justify-between gap-6">
        <h3 className="max-w-[9ch] text-[2.05rem] font-medium tracking-[-0.05em] leading-[0.95]">
          {title}
        </h3>
        <div className="text-right">
          <p className="text-[2rem] font-medium tracking-[-0.05em]">{price}</p>
          <p className="text-sm text-black/56">per person</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/14 px-4 py-2 text-sm text-black/78">
          <CalendarIcon />
          {duration}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-black/14 px-4 py-2 text-sm text-black/78">
          <StarIcon />
          {rating}
        </span>
      </div>

      <p className="mt-5 text-[1.02rem] leading-7 text-black/70">{description}</p>
    </article>
  );
}
