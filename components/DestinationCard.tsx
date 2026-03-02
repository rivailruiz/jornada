import Image from "next/image";

type DestinationCardProps = {
  title: string;
  image: string;
  price: string;
  tours: string;
};

export default function DestinationCard({
  title,
  image,
  price,
  tours
}: DestinationCardProps) {
  return (
    <article
      data-animate="destination-card"
      className="group relative overflow-hidden rounded-[28px] border border-black/6 bg-white/72 p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_22px_54px_rgba(15,23,42,0.14)]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-[2rem] font-medium tracking-[-0.045em] text-black">{title}</h3>
        <span className="text-2xl text-black/70 transition duration-300 group-hover:translate-x-1">
          ↗
        </span>
      </div>

      <div className="overflow-hidden rounded-[22px] bg-brand-cream">
        <Image
          src={image}
          alt={title}
          width={700}
          height={560}
          unoptimized
          className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1 text-[1.02rem] text-black/72">
        <p className="font-medium text-black/82">{price}</p>
        <p>{tours}</p>
      </div>
    </article>
  );
}
