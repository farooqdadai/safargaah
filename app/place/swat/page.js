"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SiteNav from "../../components/SiteNav";

const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=80";
const lakeImage =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80";
const beachImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";
const fallsImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80";
const mountainImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80";

const heroSlides = [
  {
    id: "01",
    label: "Waterfall",
    image: fallsImage,
    headlineLines: ["Swat Valley", "Waterfall", "Trails"],
    subline: "Cold cascades, cedar forests, alpine mist.",
    info: [
      {
        title: "Ushu Falls",
        text: "Cold, powerful cascades near Kalam with misty alpine air."
      },
      {
        title: "Shingrai Falls",
        text: "A forest-side waterfall loved for its icy plunge pool."
      },
      {
        title: "Jarogo Falls",
        text: "A quieter spot surrounded by terraced fields and pine."
      }
    ]
  },
  {
    id: "02",
    label: "Lake",
    image: lakeImage,
    headlineLines: ["Swat Valley", "Highland", "Lakes"],
    subline: "Glassy water, snow peaks, quiet shores.",
    info: [
      {
        title: "Mahodand Lake",
        text: "Glassy waters framed by snow peaks near the Ushu valley."
      },
      {
        title: "Kundol Lake",
        text: "A high-altitude emerald lake reached by a scenic hike."
      },
      {
        title: "Izmis Lake",
        text: "Hidden in the hills, calm and reflective at dawn."
      }
    ]
  },
  {
    id: "03",
    label: "Beach",
    image: beachImage,
    headlineLines: ["Swat Valley", "River", "Bends"],
    subline: "Green meadows, rushing water, cool evenings.",
    info: [
      {
        title: "Fizagat Riverside",
        text: "Pine-lined riverbanks with cool breezes and picnic lawns."
      },
      {
        title: "Kalam Meadows",
        text: "Wide, open valleys where the Swat River bends quietly."
      },
      {
        title: "Madyan Bend",
        text: "A gentle curve of the river, perfect for evening walks."
      }
    ]
  },
  {
    id: "04",
    label: "Highlands",
    image: mountainImage,
    headlineLines: ["Swat Valley", "Highland", "Vistas"],
    subline: "Orchards, ridges, and wide open skies.",
    info: [
      {
        title: "Malakand View",
        text: "Golden ridges with sweeping vistas over the Swat valley."
      },
      {
        title: "Marghazar",
        text: "Hillside orchards and the famous White Palace."
      },
      {
        title: "Miandam Ridge",
        text: "High pine forests with crisp air and quiet trails."
      }
    ]
  },
  {
    id: "05",
    label: "Rainforest",
    image: heroImage,
    headlineLines: ["Swat Valley", "Pine", "Forests"],
    subline: "Quiet trails and the scent of deodar.",
    info: [
      {
        title: "Ushu Forest",
        text: "Tall deodar trees and cool shade near Kalam."
      },
      {
        title: "Miandam Pines",
        text: "Deep green slopes with soft, mossy paths."
      },
      {
        title: "Lush Valleys",
        text: "Hidden streams and fern-covered banks after rain."
      }
    ]
  }
];

const spots = [
  {
    title: "1st place",
    name: "Malam Jabba",
    image: fallsImage
  },
  {
    title: "2nd place",
    name: "Mahodand Lake",
    image: beachImage
  },
  {
    title: "3rd place",
    name: "Kalam Valley",
    image: heroImage
  },
  {
    title: "4th place",
    name: "Bahrain Riverside",
    image: lakeImage
  }
];

const videos = [
  {
    title: "Swat Aerial",
    image: mountainImage
  },
  {
    title: "Kalam Trails",
    image: fallsImage
  }
];

const experienceCopy =
  "Swat offers cool air even at noon, riverside cafes, orchard lanes, and hikes that open into snow-fed lakes. From family-friendly picnic lawns to adventurous ridge walks, every day ends with a view.";

const SLIDE_INTERVAL = 7000;

export default function Home() {
  const HERO_LEN = heroSlides.length;
  const [heroIndex, setHeroIndex] = useState(3); // Start on slide "03" (real index 2).
  const [heroNoTransition, setHeroNoTransition] = useState(false);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const pointerStartRef = useRef(null);
  const heroAnimTimerRef = useRef(null);

  const armHeroFallback = useCallback(() => {
    if (heroAnimTimerRef.current) {
      window.clearTimeout(heroAnimTimerRef.current);
    }
    heroAnimTimerRef.current = window.setTimeout(() => {
      setHeroAnimating(false);
    }, 1100);
  }, []);

  useEffect(() => {
    if (isPaused || activeVideo || heroAnimating) {
      return undefined;
    }

    const timer = setInterval(() => {
      setHeroAnimating(true);
      armHeroFallback();
      setHeroIndex((prev) => prev + 1);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [activeVideo, armHeroFallback, heroAnimating, isPaused]);

  useEffect(() => {
    if (!activeVideo) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeVideo]);

  const activeSlideIndex =
    ((heroIndex - 1) % HERO_LEN + HERO_LEN) % HERO_LEN;
  const activeSlide = heroSlides[activeSlideIndex];
  const heroTrackSlides = [
    heroSlides[HERO_LEN - 1],
    ...heroSlides,
    heroSlides[0]
  ];

  const snapHeroTo = (nextIndex) => {
    setHeroNoTransition(true);
    setHeroIndex(nextIndex);
    requestAnimationFrame(() => setHeroNoTransition(false));
  };

  const handleHeroTransitionEnd = () => {
    if (heroIndex === 0) {
      snapHeroTo(HERO_LEN);
    } else if (heroIndex === HERO_LEN + 1) {
      snapHeroTo(1);
    }
    if (heroAnimTimerRef.current) {
      window.clearTimeout(heroAnimTimerRef.current);
      heroAnimTimerRef.current = null;
    }
    setHeroAnimating(false);
  };

  const goTo = (index) => {
    if (heroAnimating) {
      return;
    }
    setHeroAnimating(true);
    armHeroFallback();
    setHeroIndex(index + 1);
  };

  const goNext = () => {
    if (heroAnimating) {
      return;
    }
    setHeroAnimating(true);
    armHeroFallback();
    setHeroIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (heroAnimating) {
      return;
    }
    setHeroAnimating(true);
    armHeroFallback();
    setHeroIndex((prev) => prev - 1);
  };

  const handlePointerDown = (event) => {
    pointerStartRef.current = event.clientX;
    setIsPaused(true);
  };

  const handlePointerUp = (event) => {
    if (pointerStartRef.current === null) {
      setIsPaused(false);
      return;
    }

    const delta = event.clientX - pointerStartRef.current;
    pointerStartRef.current = null;

    if (Math.abs(delta) > 60) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    setIsPaused(false);
  };

  const handlePointerLeave = () => {
    pointerStartRef.current = null;
    setIsPaused(false);
  };

  const openVideo = (video) => {
    setActiveVideo(video);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <main className="page">
      <section
        className="hero"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <div className="hero-slides" aria-hidden="true">
          <div
            className={`hero-slides-track ${
              heroNoTransition ? "no-transition" : ""
            }`}
            style={{
              transform: `translateX(-${heroIndex * 100}%)`
            }}
            onTransitionEnd={handleHeroTransitionEnd}
          >
            {heroTrackSlides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="hero-slide"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.88) 0%, rgba(4,7,6,0.68) 48%, rgba(4,7,6,0.94) 100%), url(${slide.image})`
                }}
              />
            ))}
          </div>
        </div>

        <SiteNav activePlace="swat" />

        <div className="hero-center" key={activeSlide.id}>
          <div className="hero-title reveal delay-1">
            <h1>
              {activeSlide.headlineLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-subline">{activeSlide.subline}</p>
          </div>

          <div className="hero-steps reveal delay-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`step-btn ${
                  index === activeSlideIndex ? "active" : ""
                }`}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${slide.id}`}
              >
                <span className="step-number">{slide.id}</span>
                <span className="step-line" />
              </button>
            ))}
          </div>
        </div>

        <div className="hero-bottom reveal delay-3">
          <div className="swipe">Swipe &gt;&gt;</div>
          <div className="hero-microcopy">
            {activeSlide.info.map((info) => (
              <div key={info.title} className="micro-block">
                <p className="micro-title">{info.title}</p>
                <p className="micro-copy">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="favorites">
        <div className="favorites-head reveal">
          <p className="kicker">Swat offers</p>
          <h2>signature spots and scenic escapes</h2>
        </div>

        <div className="card-grid">
          {spots.map((spot, index) => (
            <article
              key={spot.name}
              className={`spot-card reveal delay-${index + 1}`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.08) 0%, rgba(7,9,8,0.75) 100%), url(${spot.image})`
              }}
            >
              <div>
                <p className="spot-title">{spot.title}</p>
                <h3 className="spot-name">{spot.name}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="brand-divider">
          <span />
          <div className="brand-mark">SG</div>
          <span />
        </div>
      </section>

      <section
        className="experience"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,7,6,0.85) 0%, rgba(5,7,6,0.92) 100%), url(${mountainImage})`
        }}
      >
        <div className="experience-text reveal">
          <p className="kicker">Swat offers</p>
          <h2>Travel and enjoy your holiday</h2>
          <button type="button" className="play-line">
            <span className="play-btn" aria-hidden="true">
              <span />
            </span>
            choose your Swat escape
          </button>
          <p className="experience-copy">{experienceCopy}</p>
        </div>

        <div className="experience-media reveal delay-1">
          {videos.map((video, index) => (
            <button
              key={video.title}
              type="button"
              className={`video-card ${index === 0 ? "large" : "small"}`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(5,7,6,0.2) 0%, rgba(5,7,6,0.82) 100%), url(${video.image})`
              }}
              onClick={() => openVideo(video)}
            >
              <div className="video-top">
                <span className="video-label">Video {index + 1}</span>
                <span className="video-time">02:45</span>
              </div>
              <div className="video-bottom">
                <span className="video-title">{video.title}</span>
                <span className="play-btn small" aria-hidden="true">
                  <span />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          Copyright 2026 Safargaah. All rights reserved.
        </div>
        <div className="socials">
          {["IG", "YT", "TW"].map((label) => (
            <span key={label} className="social">
              {label}
            </span>
          ))}
        </div>
      </footer>

      {activeVideo && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={closeVideo} />
          <div
            className="modal-card"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={closeVideo}>
              Close
            </button>
            <div className="modal-body">
              <div className="modal-placeholder">
                <span className="modal-title">{activeVideo.title}</span>
                <p>Video coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
