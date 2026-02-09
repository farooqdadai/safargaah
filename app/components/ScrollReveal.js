"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealNow = (el) => {
      // Double rAF ensures we get a first paint at the "hidden" state so the transition is visible.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("in-view");
        });
      });
    };

    if (reducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => {
          el.classList.remove("pending");
          el.classList.add("in-view");
        });
      const mutationObserver = new MutationObserver(() => {
        document
          .querySelectorAll(".reveal")
          .forEach((el) => {
            el.classList.remove("pending");
            el.classList.add("in-view");
          });
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      return () => mutationObserver.disconnect();
    }

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.remove("pending");
        revealNow(el);
      });
      return undefined;
    }

    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      return (
        rect.bottom >= vh * 0.1 &&
        rect.top <= vh * 0.9 &&
        rect.right >= vw * 0.1 &&
        rect.left <= vw * 0.9
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pending");
            revealNow(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    const queue = (el) => {
      if (el.classList.contains("in-view")) {
        return;
      }
      if (isInViewport(el)) {
        el.classList.remove("pending");
        revealNow(el);
        return;
      }
      el.classList.add("pending");
      observer.observe(el);
    };

    const observeNew = (root = document) => {
      if (root?.nodeType === 1 && root.matches?.(".reveal")) {
        queue(root);
      }
      if (typeof root.querySelectorAll === "function") {
        root.querySelectorAll(".reveal").forEach((el) => queue(el));
      }
    };

    observeNew();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // React may insert via DocumentFragment; querySelectorAll works on both Elements and Fragments.
          if (node?.nodeType !== 1 && node?.nodeType !== 11) {
            return;
          }
          observeNew(node);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Safety net: never leave content hidden if the observer fails for any reason.
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.in-view)")
        .forEach((el) => {
          el.classList.remove("pending");
          revealNow(el);
        });
    }, 1800);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
