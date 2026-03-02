"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Book", href: "/book" },
  { label: "My trips", href: "/trips" },
  { label: "Profile", href: "/profile" }
];

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ready: false
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const routeIndex = navItems.findIndex((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );

    setActiveIndex(routeIndex >= 0 ? routeIndex : 0);
  }, [pathname]);

  const moveHighlight = (index: number, immediate = false) => {
    const menu = menuRef.current;
    const button = buttonRefs.current[index];

    if (!menu || !button) {
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const targetX = buttonRect.left - menuRect.left;
    const targetY = buttonRect.top - menuRect.top;
    const targetWidth = buttonRect.width;
    const targetHeight = buttonRect.height;

    setHighlightStyle({
      x: targetX,
      y: targetY,
      width: targetWidth,
      height: targetHeight,
      ready: !immediate || targetWidth > 0
    });
  };

  useLayoutEffect(() => {
    moveHighlight(activeIndex, !highlightStyle.ready);
  }, [activeIndex, highlightStyle.ready]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      moveHighlight(activeIndex, true);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => moveHighlight(activeIndex, true);
    window.addEventListener("resize", handleResize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => moveHighlight(activeIndex, true))
        : null;

    if (menuRef.current && resizeObserver) {
      resizeObserver.observe(menuRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) {
      return;
    }

    setActiveIndex(index);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <div
        data-animate="nav"
        className="pointer-events-auto mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-1 py-1 sm:px-2"
      >
        <div className="hidden items-center gap-2 text-[1.65rem] font-medium tracking-[-0.04em] md:flex">
          <PinIcon />
          <span>Wandrly</span>
        </div>

        <div
          ref={menuRef}
          className="relative mx-auto flex items-center rounded-full bg-black p-1.5 text-[0.95rem] font-medium text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] sm:mx-0"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-brand-yellow shadow-[0_10px_24px_rgba(253,226,0,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[transform,width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: highlightStyle.width,
              height: highlightStyle.height,
              transform: `translate3d(${highlightStyle.x}px, ${highlightStyle.y}px, 0)`,
              opacity: highlightStyle.ready ? 1 : 0
            }}
          >
            <span className="whitespace-nowrap px-4 py-2.5 text-black">
              {navItems[activeIndex]?.label}
            </span>
          </span>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              onClick={() => handleSelect(index)}
              className="relative z-10 rounded-full px-4 py-2.5 text-white/82 transition duration-300 hover:scale-[1.03] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="h-11 w-11 overflow-hidden rounded-full border border-black/10 bg-[#f6d2ba]">
            <img
              src="/images/avatar.svg"
              alt="Sandra Perry avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-black">Sandra Perry</p>
            <p className="text-sm text-black/55">@sandra_perry</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-lg font-medium tracking-[-0.04em] md:hidden">
          <PinIcon />
          <span>Wandrly</span>
        </div>
      </div>
    </header>
  );
}
