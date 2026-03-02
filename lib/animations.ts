import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DEFAULT_DURATION = 0.7;
const DEFAULT_EASE = "power3.out";
const DEFAULT_STAGGER = 0.1;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollAnimationConfig = {
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
};

function animateOnScroll(
  targets: Element[] | Element,
  vars: ScrollAnimationConfig,
  trigger: Element | null | undefined
) {
  if (!trigger) {
    return;
  }

  gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: 0,
      x: 0,
      scale: 1,
      ...vars.from
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: DEFAULT_DURATION,
      ease: DEFAULT_EASE,
      immediateRender: false,
      ...vars.to,
      scrollTrigger: {
        trigger,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true
      }
    }
  );
}

export function initLandingAnimations(root: HTMLElement) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotionQuery.matches) {
    gsap.set(
      [
        "[data-animate='nav']",
        "[data-hero='title']",
        "[data-hero='subtitle']",
        "[data-hero='filters'] > *",
        "[data-hero='globe']",
        "[data-hero='search']",
        "[data-hero='featured']",
        "[data-animate='destination-card']",
        "[data-animate='tour-pill']",
        "[data-animate='tour-card']",
        "[data-animate='profile-hero']",
        "[data-animate='profile-card']"
      ],
      { clearProps: "all" }
    );
    return () => undefined;
  }

  gsap.defaults({
    duration: DEFAULT_DURATION,
    ease: DEFAULT_EASE
  });

  const ctx = gsap.context(() => {
    const nav = root.querySelector("[data-animate='nav']");
    const title = root.querySelector("[data-hero='title']");
    const subtitle = root.querySelector("[data-hero='subtitle']");
    const globe = root.querySelector("[data-hero='globe']");
    const search = root.querySelector("[data-hero='search']");
    const featured = root.querySelector("[data-hero='featured']");
    const filterPills = gsap.utils.toArray<HTMLElement>("[data-hero='filters'] > *");
    const destinationCards = gsap.utils.toArray<HTMLElement>("[data-animate='destination-card']");
    const tourPills = gsap.utils.toArray<HTMLElement>("[data-animate='tour-pill']");
    const tourCards = gsap.utils.toArray<HTMLElement>("[data-animate='tour-card']");
    const profileHero = root.querySelector("[data-animate='profile-hero']");
    const profileCards = gsap.utils.toArray<HTMLElement>("[data-animate='profile-card']");

    const intro = gsap.timeline({ defaults: { ease: DEFAULT_EASE, duration: DEFAULT_DURATION } });

    if (nav) {
      intro.fromTo(
        nav,
        { opacity: 0, y: -22 },
        { opacity: 1, y: 0, immediateRender: false, clearProps: "opacity,transform" },
        0
      );
    }
    if (title) {
      intro.fromTo(
        title,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, immediateRender: false, clearProps: "opacity,transform" },
        0.08
      );
    }
    if (subtitle) {
      intro.fromTo(
        subtitle,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, immediateRender: false, clearProps: "opacity,transform" },
        0.16
      );
    }
    if (globe) {
      intro.fromTo(
        globe,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, immediateRender: false, clearProps: "opacity,transform" },
        0.16
      );
    }
    if (filterPills.length > 0) {
      intro.fromTo(
        filterPills,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          immediateRender: false,
          clearProps: "opacity,transform"
        },
        0.24
      );
    }
    if (search) {
      intro.fromTo(
        search,
        { opacity: 0, x: 48 },
        { opacity: 1, x: 0, immediateRender: false, clearProps: "opacity,transform" },
        0.2
      );
    }
    if (featured) {
      intro.fromTo(
        featured,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, immediateRender: false, clearProps: "opacity,transform" },
        0.28
      );
    }
    if (profileHero) {
      intro.fromTo(
        profileHero,
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, immediateRender: false, clearProps: "opacity,transform" },
        0.18
      );
    }

    gsap.to("[data-hero='globe-core']", {
      rotate: 360,
      duration: 42,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%"
    });

    gsap.to("[data-orbit='outer']", {
      rotate: 360,
      duration: 14,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%"
    });

    gsap.to("[data-orbit='mid']", {
      rotate: -360,
      duration: 18,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%"
    });

    gsap.to("[data-orbit='inner']", {
      rotate: 360,
      duration: 22,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%"
    });

    if (destinationCards.length > 0) {
      animateOnScroll(
        destinationCards,
        {
          from: { y: 50, opacity: 0 },
          to: { stagger: 0.12 }
        },
        destinationCards[0].parentElement
      );
    }

    if (tourPills.length > 0) {
      animateOnScroll(
        tourPills,
        {
          from: { y: 24, opacity: 0 },
          to: { stagger: 0.08 }
        },
        tourPills[0].parentElement
      );
    }

    if (tourCards.length > 0) {
      animateOnScroll(
        tourCards,
        {
          from: { y: 50, opacity: 0 },
          to: { stagger: DEFAULT_STAGGER }
        },
        tourCards[0].parentElement
      );
    }

    if (profileCards.length > 0) {
      animateOnScroll(
        profileCards,
        {
          from: { y: 42, opacity: 0 },
          to: { stagger: 0.1 }
        },
        profileCards[0].parentElement
      );
    }

    ScrollTrigger.refresh();
  }, root);

  return () => {
    ctx.revert();
  };
}
