"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel from "./components/Carousel";
import SiteNav from "./components/SiteNav";

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
    label: "Mountains",
    image: mountainImage,
    headlineLines: ["Pakistan", "Northern", "Peaks"],
    subline: "Karakoram giants, glaciers, crisp alpine air.",
    info: [
      {
        title: "Hunza Valley",
        text: "Terraced villages framed by Rakaposhi and Ultar peaks."
      },
      {
        title: "Skardu",
        text: "Gateway to the Karakoram with lakes and cold deserts."
      },
      {
        title: "Fairy Meadows",
        text: "Meadows beneath Nanga Parbat with stargazing skies."
      }
    ]
  },
  {
    id: "02",
    label: "Lakes",
    image: lakeImage,
    headlineLines: ["Pakistan", "Alpine", "Lakes"],
    subline: "Turquoise water, pine forests, high trails.",
    info: [
      {
        title: "Saif-ul-Malook",
        text: "An emerald lake beneath the Malika Parbat ridgeline."
      },
      {
        title: "Attabad Lake",
        text: "Glacial blue water and dramatic cliffs in Hunza."
      },
      {
        title: "Ratti Gali",
        text: "A remote high-altitude lake surrounded by wildflowers."
      }
    ]
  },
  {
    id: "03",
    label: "Coast",
    image: beachImage,
    headlineLines: ["Pakistan", "Arabian", "Coast"],
    subline: "Sea cliffs, fishing towns, golden sunsets.",
    info: [
      {
        title: "Gwadar",
        text: "Cliffside views, calm coves, and evening sea breeze."
      },
      {
        title: "Ormara",
        text: "Quiet beaches along the Makran Coastal Highway."
      },
      {
        title: "Karachi Coast",
        text: "City energy meets the sea with wide promenades."
      }
    ]
  },
  {
    id: "04",
    label: "Heritage",
    image: heroImage,
    headlineLines: ["Pakistan", "Heritage", "Cities"],
    subline: "Mughal courts, bazaars, ancient ruins.",
    info: [
      {
        title: "Lahore Fort",
        text: "A Mughal citadel with ornate halls and gardens."
      },
      {
        title: "Mohenjo-daro",
        text: "An Indus Valley city with timeless brick streets."
      },
      {
        title: "Taxila",
        text: "Buddhist heritage and hilltop monasteries."
      }
    ]
  },
  {
    id: "05",
    label: "Desert",
    image: fallsImage,
    headlineLines: ["Pakistan", "Desert", "Dunes"],
    subline: "Starry nights, camel trails, folk festivals.",
    info: [
      {
        title: "Thar Desert",
        text: "Golden dunes, music nights, and village crafts."
      },
      {
        title: "Cholistan",
        text: "Vast plains dotted with forts and caravans."
      },
      {
        title: "Derawar Fort",
        text: "A historic fort rising above the desert sands."
      }
    ]
  }
];

const spots = [
  {
    title: "1st place",
    name: "Swat Valley",
    image: mountainImage,
    slug: "swat"
  },
  {
    title: "2nd place",
    name: "Hunza Valley",
    image: lakeImage,
    slug: "hunza"
  },
  {
    title: "3rd place",
    name: "Skardu",
    image: heroImage,
    slug: "skardu"
  },
  {
    title: "4th place",
    name: "Gwadar Coast",
    image: beachImage,
    slug: "gwadar"
  }
];

const videos = [
  {
    title: "Northern Peaks",
    image: mountainImage
  },
  {
    title: "Coastal Drive",
    image: fallsImage
  }
];

const experienceCopy =
  "Pakistan offers every landscape in one journey: alpine passes, turquoise lakes, bustling heritage cities, and dramatic coastlines. Plan your days with hikes, bazaars, and sunsets that feel endless.";

const aboutHighlights = [
  {
    title: "Northern Gateways",
    text: "Snow-fed valleys, glacier roads, and pine forests that stay cool even in summer."
  },
  {
    title: "Heritage Heartlands",
    text: "Ancient cities, royal gardens, and artisan bazaars alive with craft and color."
  },
  {
    title: "Coastal Horizons",
    text: "Sea cliffs, quiet fishing towns, and long drives along the Makran coast."
  },
  {
    title: "Desert Nights",
    text: "Golden dunes, folk music evenings, and warm starlit camps."
  }
];

const aboutTags = ["North", "Culture", "Coast", "Desert"];

const routes = [
  {
    title: "Northern Loop",
    season: "Summer",
    duration: "7 days",
    text: "Hunza, Passu, and Skardu with glacier viewpoints and lake stops.",
    image: mountainImage
  },
  {
    title: "Heritage Trail",
    season: "Autumn",
    duration: "4 days",
    text: "Lahore, Taxila, and Peshawar with bazaars and historic forts.",
    image: heroImage
  },
  {
    title: "Makran Coast",
    season: "Winter",
    duration: "5 days",
    text: "Karachi to Gwadar with sea cliffs, beaches, and sunset drives.",
    image: beachImage
  }
];

const tours = [
  {
    title: "Pakistan Grand Tour",
    duration: "12 days",
    season: "Apr - Oct",
    summary:
      "A full-country journey covering the north, heritage cities, and the Arabian coast.",
    highlights: ["Hunza", "Skardu", "Lahore", "Gwadar"]
  },
  {
    title: "Northern Pakistan Tour",
    duration: "8 days",
    season: "May - Sep",
    summary:
      "High-altitude valleys, alpine lakes, and glacier viewpoints with crisp mountain air.",
    highlights: ["Hunza", "Passu", "Attabad", "Skardu"]
  },
  {
    title: "KPK Discovery Tour",
    duration: "6 days",
    season: "Mar - Nov",
    summary:
      "Swat, Dir, and Kalam with river bends, pine forests, and cultural towns.",
    highlights: ["Swat", "Kalam", "Mingora", "Miandam"]
  }
];

const activities = [
  {
    title: "Scuba Diving",
    tag: "Coast",
    text: "Explore the Arabian Sea with calm-water diving near the Makran coast."
  },
  {
    title: "Sky Diving",
    tag: "North",
    text: "Adventure flights and drop zones with panoramic mountain views."
  },
  {
    title: "Karting",
    tag: "City",
    text: "Track racing experiences in major urban hubs."
  },
  {
    title: "Paragliding",
    tag: "Valleys",
    text: "Glide above emerald valleys and river bends with licensed pilots."
  },
  {
    title: "Jeep Safaris",
    tag: "Desert",
    text: "Off-road trails across dunes and rugged desert plains."
  },
  {
    title: "Whitewater Rafting",
    tag: "Rivers",
    text: "Thrilling rapids along the Swat and Indus river systems."
  }
];

const blogArticles = [
  {
    title: "A Dawn Drive Through the Karakoram",
    date: "Aug 12, 2025",
    tag: "North",
    excerpt:
      "First light over the peaks, empty roads, and the quiet calm of the Hunza valley.",
    image: mountainImage
  },
  {
    title: "Markets, Mosques, and Mughal Gardens",
    date: "Sep 3, 2025",
    tag: "Heritage",
    excerpt:
      "A slow walk through Lahore's old city, from spice lanes to shaded courtyards.",
    image: heroImage
  },
  {
    title: "Makran Coast in One Weekend",
    date: "Oct 18, 2025",
    tag: "Coast",
    excerpt:
      "Sea cliffs, golden sunsets, and a coastal road trip from Karachi to Ormara.",
    image: beachImage
  }
];

const weekendPlans = [
  {
    day: "Saturday",
    theme: "Scenic reset",
    title: "Mountains, viewpoints, and a slow evening",
    items: [
      {
        time: "Morning",
        what: "Depart early",
        detail:
          "Start at sunrise for cooler roads, a chai stop, and the first viewpoint before the crowds."
      },
      {
        time: "Afternoon",
        what: "Hike + lunch",
        detail:
          "Pick a short trail or chairlift ride, then do a lakeside or riverside lunch with time to wander."
      },
      {
        time: "Evening",
        what: "Golden hour",
        detail:
          "Catch sunset from a ridge or hilltop cafe, then keep the night light with local food and a calm walk."
      }
    ]
  },
  {
    day: "Sunday",
    theme: "Heritage + food",
    title: "Old streets, museums, and a clean drive back",
    items: [
      {
        time: "Morning",
        what: "Heritage walk",
        detail:
          "Start with a fort, museum, or old-city lane while it is quiet. Keep it photo-first, shopping later."
      },
      {
        time: "Afternoon",
        what: "Bazaar + chai",
        detail:
          "Do a short bazaar loop for crafts and spices, then a long chai break before heading out."
      },
      {
        time: "Evening",
        what: "Return smooth",
        detail:
          "Leave before dark, build in one scenic stop, and end with street food near home."
      }
    ]
  }
];

const SLIDE_INTERVAL = 7000;

export default function Home() {
  const HERO_LEN = heroSlides.length;
  // Track index: [0] is clone(last), [1..HERO_LEN] are real slides, [HERO_LEN+1] is clone(first).
  const [heroIndex, setHeroIndex] = useState(3); // Start on slide "03" (real index 2).
  const [heroNoTransition, setHeroNoTransition] = useState(false);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [routesApi, setRoutesApi] = useState(null);
  const [toursApi, setToursApi] = useState(null);
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

        <SiteNav />

        <div className="nav-divider" />

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
          <p className="kicker">Pakistan offers</p>
          <h2>signature spots and scenic escapes</h2>
        </div>

        <div className="card-grid">
          {spots.map((spot, index) => (
            <Link
              key={spot.name}
              className={`spot-card reveal delay-${index + 1}`}
              href={`/place/${spot.slug}`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.08) 0%, rgba(7,9,8,0.75) 100%), url(${spot.image})`
              }}
            >
              <div>
                <p className="spot-title">{spot.title}</p>
                <h3 className="spot-name">{spot.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="brand-divider">
          <span />
          <div className="brand-mark">SG</div>
          <span />
        </div>
      </section>

      <section className="about">
        <div className="about-grid">
          <div className="about-content reveal">
            <p className="kicker">About Pakistan</p>
            <h2>One country, every landscape.</h2>
            <p className="about-copy">
              Pakistan blends alpine passes, vibrant heritage cities, desert
              routes, and the Arabian Sea into one continuous journey. Move
              from snow-capped ridges to riverside markets in a single day, and
              still end the evening by the coast.
            </p>
            <div className="about-tags">
              {aboutTags.map((tag) => (
                <span key={tag} className="about-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="about-cards">
            {aboutHighlights.map((item, index) => (
              <article
                key={item.title}
                className={`about-card reveal delay-${index + 1}`}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="routes">
        <div className="routes-head reveal">
          <div>
            <p className="kicker">Signature journeys</p>
            <h2>Seasonal routes across Pakistan</h2>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => routesApi?.scrollPrev()}
              aria-label="Previous routes"
            >
              ←
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => routesApi?.scrollNext()}
              aria-label="Next routes"
            >
              →
            </button>
          </div>
        </div>

        <Carousel
          className="routes-carousel reveal"
          options={{ loop: true, align: "start" }}
          onApi={setRoutesApi}
        >
          {routes.map((route) => (
            <article
              key={route.title}
              className="route-card"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.2) 0%, rgba(7,9,8,0.85) 100%), url(${route.image})`
              }}
            >
              <div className="route-top">
                <span className="route-season">{route.season}</span>
                <span className="route-duration">{route.duration}</span>
              </div>
              <div className="route-bottom">
                <h3>{route.title}</h3>
                <p>{route.text}</p>
                <span className="route-line" aria-hidden="true" />
              </div>
            </article>
          ))}
        </Carousel>

        <div className="routes-footer">
          <span className="routes-note">Curated itineraries for every season</span>
          <span className="routes-pulse" aria-hidden="true" />
        </div>
      </section>

      <section className="tours">
        <div className="tours-head reveal">
          <div>
            <p className="kicker">Tour details</p>
            <h2>Pakistan tours made for every traveler</h2>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => toursApi?.scrollPrev()}
              aria-label="Previous tours"
            >
              ←
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => toursApi?.scrollNext()}
              aria-label="Next tours"
            >
              →
            </button>
          </div>
        </div>

        <Carousel
          className="tours-carousel reveal"
          options={{ loop: true, align: "start" }}
          onApi={setToursApi}
        >
          {tours.map((tour) => (
            <article key={tour.title} className="tour-card">
              <div className="tour-meta">
                <span>{tour.duration}</span>
                <span>{tour.season}</span>
              </div>
              <h3>{tour.title}</h3>
              <p>{tour.summary}</p>
              <div className="tour-highlights">
                {tour.highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      <section className="weekend">
        <div className="weekend-head reveal">
          <p className="kicker">Weekend plans</p>
          <h2>Saturday + Sunday, mapped out</h2>
          <p className="weekend-sub">
            Two days, one clean itinerary. Start from your city, swap stops by
            season, and keep the pace relaxed.
          </p>
        </div>

        <div className="weekend-grid">
          {weekendPlans.map((plan, index) => (
            <article
              key={plan.day}
              className={`day-card reveal delay-${index + 1}`}
            >
              <div className="day-top">
                <span className="day-label">{plan.day}</span>
                <span className="day-theme">{plan.theme}</span>
              </div>
              <h3>{plan.title}</h3>
              <ul className="day-list">
                {plan.items.map((item) => (
                  <li key={item.time} className="day-slot">
                    <span className="day-time">{item.time}</span>
                    <div>
                      <p className="day-what">{item.what}</p>
                      <p className="day-detail">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className="activities"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,7,6,0.82) 0%, rgba(5,7,6,0.94) 100%), url(${heroImage})`
        }}
      >
        <div className="activities-head reveal">
          <p className="kicker">Experiences</p>
          <h2>Adventure, culture, and adrenaline</h2>
        </div>

        <div className="activities-grid">
          {activities.map((activity, index) => (
            <article
              key={activity.title}
              className={`activity-card reveal delay-${index + 1}`}
            >
              <div className="activity-tag">{activity.tag}</div>
              <h3>{activity.title}</h3>
              <p>{activity.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="blog">
        <div className="blog-head reveal">
          <p className="kicker">Journal</p>
          <h2>Stories from across Pakistan</h2>
        </div>

        <div className="blog-grid">
          {blogArticles.map((article, index) => (
            <article
              key={article.title}
              className={`blog-card reveal delay-${index + 1}`}
            >
              <div
                className="blog-image"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(6,8,7,0.15) 0%, rgba(6,8,7,0.75) 100%), url(${article.image})`
                }}
              />
              <div className="blog-body">
                <div className="blog-meta">
                  <span>{article.date}</span>
                  <span>{article.tag}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="blog-link">
                  Read story
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="experience"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,7,6,0.85) 0%, rgba(5,7,6,0.92) 100%), url(${mountainImage})`
        }}
      >
        <div className="experience-text reveal">
          <p className="kicker">Pakistan offers</p>
          <h2>Travel and enjoy your holiday</h2>
          <button type="button" className="play-line">
            <span className="play-btn" aria-hidden="true">
              <span />
            </span>
            choose your Pakistan escape
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
