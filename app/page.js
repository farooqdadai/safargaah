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

const highlightImages = {
  Hunza: mountainImage,
  Skardu: lakeImage,
  Lahore: heroImage,
  Gwadar: beachImage,
  Passu: mountainImage,
  Attabad: lakeImage,
  Swat: mountainImage,
  Dir: mountainImage,
  Kalam: fallsImage,
  Mingora: heroImage,
  Miandam: mountainImage
};

const getTourImages = (highlights) => {
  const mapped =
    highlights?.map((name) => highlightImages[name]).filter(Boolean) ?? [];
  const fallback = [mountainImage, lakeImage, heroImage, beachImage];
  const source = mapped.length ? mapped : fallback;
  return Array.from({ length: 4 }, (_, idx) => source[idx % source.length]);
};

function TourMediaCarousel({ images, label }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const onKeyDown = (event) => {
    if (images.length <= 1) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className="tour-media"
      tabIndex={0}
      role="group"
      aria-label={label}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      {images.map((image, idx) => (
        <div
          key={`${idx}-${image}`}
          className={`tour-media-slide ${idx === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="tour-media-btn prev"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            {"\u2190"}
          </button>
          <button
            type="button"
            className="tour-media-btn next"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            {"\u2192"}
          </button>
          <div className="tour-media-dots" aria-hidden="true">
            {images.map((_, idx) => (
              <span
                key={`dot-${idx}`}
                className={`tour-dot ${idx === index ? "active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
  "Safargaah brings Pakistan into one clean plan: alpine passes, turquoise lakes, heritage streets, and dramatic coastlines. Build your route with hikes, bazaars, and sunsets that feel endless.";

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
    image: mountainImage,
    days: 7,
    seasons: ["summer"],
    regions: ["north"],
    styles: ["balanced", "adventure"]
  },
  {
    title: "Heritage Trail",
    season: "Autumn",
    duration: "4 days",
    text: "Lahore, Taxila, and Peshawar with bazaars and historic forts.",
    image: heroImage,
    days: 4,
    seasons: ["autumn", "winter", "spring"],
    regions: ["heritage"],
    styles: ["culture", "balanced"]
  },
  {
    title: "Makran Coast",
    season: "Winter",
    duration: "5 days",
    text: "Karachi to Gwadar with sea cliffs, beaches, and sunset drives.",
    image: beachImage,
    days: 5,
    seasons: ["winter", "autumn", "spring"],
    regions: ["coast"],
    styles: ["balanced", "adventure"]
  }
];

const tours = [
  {
    id: "pakistan-grand",
    title: "Pakistan Grand Tour",
    duration: "12 days",
    season: "Apr - Oct",
    days: 12,
    seasons: ["spring", "summer", "autumn"],
    regions: ["north", "heritage", "coast"],
    styles: ["balanced", "culture"],
    groups: ["family", "friends", "couple"],
    startCities: ["Islamabad", "Lahore", "Karachi"],
    summary:
      "A full-country journey covering the north, heritage cities, and the Arabian coast.",
    highlights: ["Hunza", "Skardu", "Lahore", "Gwadar"]
  },
  {
    id: "north-pakistan",
    title: "Northern Pakistan Tour",
    duration: "8 days",
    season: "May - Sep",
    days: 8,
    seasons: ["summer"],
    regions: ["north"],
    styles: ["adventure", "balanced"],
    groups: ["friends", "couple", "family", "solo"],
    startCities: ["Islamabad", "Lahore"],
    summary:
      "High-altitude valleys, alpine lakes, and glacier viewpoints with crisp mountain air.",
    highlights: ["Hunza", "Passu", "Attabad", "Skardu"]
  },
  {
    id: "kpk-discovery",
    title: "KPK Discovery Tour",
    duration: "6 days",
    season: "Mar - Nov",
    days: 6,
    seasons: ["spring", "summer", "autumn"],
    regions: ["north"],
    styles: ["balanced", "family", "culture"],
    groups: ["family", "friends", "couple"],
    startCities: ["Islamabad"],
    summary:
      "Swat, Dir, and Kalam with river bends, pine forests, and cultural towns.",
    highlights: ["Swat", "Kalam", "Mingora", "Miandam"]
  }
];

const activities = [
  {
    id: "scuba",
    title: "Scuba Diving",
    tag: "Coast",
    category: "Water",
    seasons: ["winter", "spring", "autumn"],
    regions: ["coast"],
    text: "Explore the Arabian Sea with calm-water diving near the Makran coast."
  },
  {
    id: "skydiving",
    title: "Sky Diving",
    tag: "North",
    category: "Air",
    seasons: ["summer", "autumn", "spring"],
    regions: ["north"],
    text: "Adventure flights and drop zones with panoramic mountain views."
  },
  {
    id: "karting",
    title: "Karting",
    tag: "City",
    category: "City",
    seasons: ["winter", "spring", "summer", "autumn"],
    regions: ["heritage"],
    text: "Track racing experiences in major urban hubs."
  },
  {
    id: "paragliding",
    title: "Paragliding",
    tag: "Valleys",
    category: "Air",
    seasons: ["summer", "autumn", "spring"],
    regions: ["north"],
    text: "Glide above emerald valleys and river bends with licensed pilots."
  },
  {
    id: "jeep-safaris",
    title: "Jeep Safaris",
    tag: "Desert",
    category: "Land",
    seasons: ["winter", "autumn", "spring"],
    regions: ["desert"],
    text: "Off-road trails across dunes and rugged desert plains."
  },
  {
    id: "whitewater",
    title: "Whitewater Rafting",
    tag: "Rivers",
    category: "Water",
    seasons: ["summer", "spring"],
    regions: ["north"],
    text: "Thrilling rapids along the Swat and Indus river systems."
  }
];

const weekendItineraries = [
  {
    id: "isb-north",
    title: "North Pakistan weekend from Islamabad",
    city: "Islamabad",
    region: "north",
    seasons: ["spring", "summer", "autumn"],
    style: "adventure",
    days: [
      {
        day: "Saturday",
        theme: "Valleys + viewpoints",
        title: "Drive north, hike light, sunset ridge",
        items: [
          {
            time: "Morning",
            what: "Early departure",
            detail:
              "Leave at sunrise for cooler traffic and a quick breakfast stop on the way."
          },
          {
            time: "Afternoon",
            what: "Viewpoint + short trail",
            detail:
              "Pick one easy hike or chairlift-style ride, then lunch with river views."
          },
          {
            time: "Evening",
            what: "Golden hour",
            detail:
              "Catch sunset from a ridge cafe, then keep the night simple with local food."
          }
        ]
      },
      {
        day: "Sunday",
        theme: "Lakes + return",
        title: "Water stop, souvenirs, and an easy drive back",
        items: [
          {
            time: "Morning",
            what: "Lake or riverside stop",
            detail:
              "Do a calm morning loop near water while it is quiet and the light is soft."
          },
          {
            time: "Afternoon",
            what: "Local market + chai",
            detail:
              "Grab a small craft, dried fruit, or snacks, then take a long chai break."
          },
          {
            time: "Evening",
            what: "Return before dark",
            detail:
              "Start back early enough to avoid night driving, with one scenic stop on the way."
          }
        ]
      }
    ]
  },
  {
    id: "lhr-heritage",
    title: "Heritage weekend from Lahore",
    city: "Lahore",
    region: "heritage",
    seasons: ["winter", "spring", "autumn"],
    style: "culture",
    days: [
      {
        day: "Saturday",
        theme: "Old city",
        title: "Fort, food streets, and artisan lanes",
        items: [
          {
            time: "Morning",
            what: "Heritage walk",
            detail:
              "Start early for a fort, museum, or old-city lane before it gets busy."
          },
          {
            time: "Afternoon",
            what: "Bazaars + lunch",
            detail:
              "Do a short bazaar loop for crafts and spices, then lunch in a historic neighborhood."
          },
          {
            time: "Evening",
            what: "Courtyard dinner",
            detail:
              "End with music, tea, and a calm dinner in a shaded courtyard spot."
          }
        ]
      },
      {
        day: "Sunday",
        theme: "Day trip",
        title: "Nearby history, then a relaxed return",
        items: [
          {
            time: "Morning",
            what: "Short day trip",
            detail:
              "Pick one nearby historic site for a clean half-day plan with minimal driving."
          },
          {
            time: "Afternoon",
            what: "Shopping + chai",
            detail:
              "Keep shopping tight, then do a long chai break to reset."
          },
          {
            time: "Evening",
            what: "Easy finish",
            detail:
              "Return early and end with street food or dessert."
          }
        ]
      }
    ]
  },
  {
    id: "khi-coast",
    title: "Makran coast weekend from Karachi",
    city: "Karachi",
    region: "coast",
    seasons: ["winter", "spring", "autumn"],
    style: "balanced",
    days: [
      {
        day: "Saturday",
        theme: "Coastal drive",
        title: "Sea cliffs, beaches, and sunset stops",
        items: [
          {
            time: "Morning",
            what: "Start early",
            detail:
              "Leave in the morning for the cleanest drive and cooler coastal air."
          },
          {
            time: "Afternoon",
            what: "Beach time",
            detail:
              "Pick one calm beach stop, then lunch with sea views and a short walk."
          },
          {
            time: "Evening",
            what: "Sunset viewpoint",
            detail:
              "Watch golden hour from a cliffside viewpoint and keep the night light."
          }
        ]
      },
      {
        day: "Sunday",
        theme: "Water + return",
        title: "Optional scuba, then a smooth return",
        items: [
          {
            time: "Morning",
            what: "Adventure slot",
            detail:
              "If you want, book a water activity in the morning when seas are calmer."
          },
          {
            time: "Afternoon",
            what: "Souvenirs + chai",
            detail:
              "Grab snacks, saltwater souvenirs, and take a long break before you head back."
          },
          {
            time: "Evening",
            what: "Return early",
            detail:
              "Aim to return before late night traffic and finish with dinner at home."
          }
        ]
      }
    ]
  }
];

const trustBadges = [
  {
    title: "Local guides",
    text: "Curated partners who know the roads, seasons, and shortcuts."
  },
  {
    title: "Vetted transport",
    text: "Route-first planning for comfort, safety, and realistic timings."
  },
  {
    title: "Support on trip",
    text: "One contact point for changes, detours, and quick re-plans."
  }
];

const testimonials = [
  {
    name: "A. Khan",
    city: "Islamabad",
    text: "The itinerary felt realistic. We did not rush, and the north stops were perfectly paced."
  },
  {
    name: "S. Ahmed",
    city: "Karachi",
    text: "Loved the coast plan. Clear stops, good timing, and the adventure add-ons were easy."
  },
  {
    name: "H. Malik",
    city: "Lahore",
    text: "Heritage weekend was spot on. We avoided crowds and still saw the highlights."
  }
];

const travelMoments = [
  {
    season: "Spring",
    title: "Blossoms + fresh greens",
    where: "Hunza, Swat, Kaghan",
    when: "Mar-Apr"
  },
  {
    season: "Summer",
    title: "High passes + lake days",
    where: "Skardu, Hunza, Passu",
    when: "Jun-Aug"
  },
  {
    season: "Autumn",
    title: "Golden valleys + heritage nights",
    where: "Hunza, Lahore, Peshawar",
    when: "Oct-Nov"
  },
  {
    season: "Winter",
    title: "Coast drives + desert camps",
    where: "Makran, Cholistan, Thar",
    when: "Dec-Feb"
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
  const [activeWeekendId, setActiveWeekendId] = useState(
    weekendItineraries[0].id
  );
  const pointerStartRef = useRef(null);
  const heroAnimTimerRef = useRef(null);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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

  const activeWeekend =
    weekendItineraries.find((itinerary) => itinerary.id === activeWeekendId) ||
    weekendItineraries[0];

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

      <section className="about">
        <div className="about-grid">
          <div className="about-content reveal">
            <p className="kicker">What Safargaah offers</p>
            <h2>Tours, weekends, and local clarity.</h2>
            <p className="about-copy">
              Safargaah helps you plan Pakistan with complete tours, weekend
              itineraries, and single-day adventures. Start with signature
              spots, then pick the pace that fits your time.
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

      <section className="tours" id="tours">
        <div className="tours-head reveal">
          <div>
            <p className="kicker">Complete tours</p>
            <h2>North Pakistan, heritage cities, and the coast</h2>
          </div>
          <div className="tours-actions">
            <div className="carousel-controls">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => toursApi?.scrollPrev()}
                aria-label="Previous tours"
              >
                {"\u2190"}
              </button>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => toursApi?.scrollNext()}
                aria-label="Next tours"
              >
                {"\u2192"}
              </button>
            </div>
            <Link href="/#tours" className="intent-btn primary">
              Show all packages
            </Link>
          </div>
        </div>

        <Carousel
          className="tours-carousel reveal"
          options={{ loop: true, align: "start" }}
          onApi={setToursApi}
        >
          {tours.map((tour) => {
            const images = getTourImages(tour.highlights);
            return (
              <article key={tour.id} className="tour-card">
                <TourMediaCarousel
                  images={images}
                  label={`${tour.title} photo preview`}
                />
                <div className="tour-body">
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
                </div>
              </article>
            );
          })}
        </Carousel>
      </section>

      <section className="weekend" id="weekend">
        <div className="weekend-intent-head reveal">
          <p className="kicker">Weekend freedom</p>
          <h2>Only free on weekends? Pick an adventure or follow a plan.</h2>
          <p className="weekend-sub">
            Single experiences work for a one-day escape, and weekend plans give
            you a full two-day loop.
          </p>
        </div>

        <div className="weekend-intent-grid">
          <div className="weekend-intent-card reveal">
            <div className="weekend-subhead">
              <p className="kicker">Single experiences</p>
              <h3>Quick adventures you can do in a day</h3>
            </div>
            <div className="adventures-grid">
              {activities.map((activity, index) => (
                <article
                  key={activity.id}
                  className={`activity-card reveal delay-${(index % 3) + 1}`}
                >
                  <div className="activity-tag">
                    {activity.category} • {activity.tag}
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="weekend-intent-card reveal">
            <div className="weekend-plan-head">
              <div>
                <p className="kicker">Weekend plans</p>
                <h3>{activeWeekend.title}</h3>
                <p className="weekend-meta">Start from {activeWeekend.city}</p>
              </div>
              <label className="field">
                <span>Itinerary</span>
                <select
                  value={activeWeekendId}
                  onChange={(event) => setActiveWeekendId(event.target.value)}
                >
                  {weekendItineraries.map((itinerary) => (
                    <option key={itinerary.id} value={itinerary.id}>
                      {itinerary.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="weekend-grid">
              {activeWeekend.days.map((plan, index) => (
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
          </div>
        </div>
      </section>

      <section className="favorites">
        <div className="favorites-head reveal">
          <p className="kicker">Destinations</p>
          <h2>Signature spots of Pakistan</h2>
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

      <section className="routes">
        <div className="routes-head reveal">
          <div>
            <p className="kicker">Seasonal routes</p>
            <h2>Routes across Pakistan by season</h2>
          </div>
          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => routesApi?.scrollPrev()}
              aria-label="Previous routes"
            >
              {"\u2190"}
            </button>
            <button
              type="button"
              className="carousel-btn"
              onClick={() => routesApi?.scrollNext()}
              aria-label="Next routes"
            >
              {"\u2192"}
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

      <section className="moments" id="moments">
        <div className="moments-head reveal">
          <p className="kicker">When to go</p>
          <h2>When Pakistan looks its best</h2>
        </div>

        <div className="moments-grid">
          {travelMoments.map((moment, index) => (
            <article
              key={moment.title}
              className={`moment-card reveal delay-${index + 1}`}
            >
              <div className="moment-top">
                <span className="moment-season">{moment.season}</span>
                <span className="moment-when">{moment.when}</span>
              </div>
              <h3>{moment.title}</h3>
              <p>{moment.where}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust" id="trust">
        <div className="trust-head reveal">
          <p className="kicker">Trust</p>
          <h2>Built for Pakistan travel</h2>
        </div>

        <div className="trust-grid">
          <div className="trust-cards">
            {trustBadges.map((badge, index) => (
              <article
                key={badge.title}
                className={`trust-card reveal delay-${index + 1}`}
              >
                <h3>{badge.title}</h3>
                <p>{badge.text}</p>
              </article>
            ))}
          </div>

          <div className="trust-quotes">
            {testimonials.map((quote, index) => (
              <article
                key={`${quote.name}-${quote.city}`}
                className={`quote-card reveal delay-${index + 1}`}
              >
                <p className="quote-text">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="quote-meta">
                  {quote.name} • {quote.city}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="experience"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,7,6,0.85) 0%, rgba(5,7,6,0.92) 100%), url(${mountainImage})`
        }}
      >
        <div className="experience-text reveal">
          <p className="kicker">Ready to plan</p>
          <h2>Build your next Safargaah escape</h2>
          <button type="button" className="play-line">
            <span className="play-btn" aria-hidden="true">
              <span />
            </span>
            start with a weekend plan
          </button>
          <p className="experience-copy">{experienceCopy}</p>
          <div className="experience-ctas">
            <button
              type="button"
              className="intent-btn primary"
              onClick={() => scrollTo("tours")}
            >
              Book a complete tour
            </button>
            <button
              type="button"
              className="intent-btn"
              onClick={() => scrollTo("weekend")}
            >
              Weekend plan
            </button>
          </div>
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

