export default function BookPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex min-h-screen max-w-[1440px] items-center px-4 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <section className="w-full rounded-[38px] border border-black/6 bg-white/72 p-8 shadow-soft sm:p-10">
          <p className="text-sm uppercase tracking-[0.16em] text-black/42">Book</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,5.6rem)] font-light tracking-[-0.08em] leading-[0.92] text-black">
            Booking flow is coming next.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.08rem] leading-8 text-black/64">
            The routing is in place so the navbar works naturally. This screen can become the full
            booking experience in the next iteration.
          </p>
        </section>
      </main>
    </div>
  );
}
