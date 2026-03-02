"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Book", href: "/book" },
  { label: "My trips", href: "/trips" },
  { label: "Profile", href: "/profile" }
];

function getRouteIndex(pathname: string | null) {
  const routeIndex = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
  );

  return routeIndex >= 0 ? routeIndex : 0;
}

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
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(() => getRouteIndex(pathname));
  const menuRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasInitializedRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  const navigatingToRef = useRef<string | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const routeIndex = getRouteIndex(pathname);

    if (navigatingToRef.current === pathname) {
      navigatingToRef.current = null;
      return;
    }

    if (routeIndex !== activeIndexRef.current) {
      setActiveIndex(routeIndex);
      if (hasInitializedRef.current) {
        positionHighlight(routeIndex, false);
      }
    }
  }, [pathname]);

  const positionHighlight = (index: number, immediate = false) => {
    const menu = menuRef.current;
    const highlight = highlightRef.current;
    const button = buttonRefs.current[index];

    if (!menu || !button || !highlight) {
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const targetX = buttonRect.left - menuRect.left;
    const targetY = buttonRect.top - menuRect.top;
    const targetWidth = buttonRect.width;
    const targetHeight = buttonRect.height;

    if (!targetWidth || !targetHeight) {
      return;
    }

    gsap.killTweensOf(highlight);
    gsap.set(highlight, {
      y: targetY,
      height: targetHeight,
      opacity: 1,
      force3D: true
    });

    if (immediate) {
      gsap.set(highlight, {
        x: targetX,
        width: targetWidth,
        force3D: true
      });
      return;
    }

    gsap.to(highlight, {
      x: targetX,
      width: targetWidth,
      duration: 0.54,
      ease: "expo.out",
      overwrite: true,
      force3D: true
    });
  };

  useLayoutEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      positionHighlight(activeIndex, true);
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      positionHighlight(activeIndex, true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    const item = navItems[index];

    if (!item || index === activeIndexRef.current) {
      return;
    }

    setActiveIndex(index);
    activeIndexRef.current = index;
    positionHighlight(index, false);
    navigatingToRef.current = item.href;

    window.setTimeout(() => {
      router.push(item.href);
    }, 48);
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
            ref={highlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-brand-yellow opacity-0 shadow-[0_10px_24px_rgba(253,226,0,0.26),inset_0_1px_0_rgba(255,255,255,0.35)]"
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
              onClick={(event) => {
                event.preventDefault();
                handleSelect(index);
              }}
              className="relative z-10 rounded-full px-4 py-2.5 text-white/82 transition duration-300 hover:scale-[1.03] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="h-11 w-11 overflow-hidden rounded-full border border-black/10 bg-[#f6d2ba]">
            <img
              src={withBasePath("/images/avatar.svg")}
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
