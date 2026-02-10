import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import { winterTours, winterToursHero } from "./data";

export const metadata = {
  title: "Winter Tours | Safargaah",
  description:
    "Winter tours across Pakistan: Swat, Kalam, Hunza, Murree, and more with cozy stays and snow routes."
};

export default function WinterToursPage() {
  return (
    <main className="page tour-page">
      <section
        className="package-hero package-hero--index tour-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.9) 0%, rgba(4,7,6,0.6) 45%, rgba(4,7,6,0.95) 100%), url(${winterToursHero})`
        }}
      >
        <SiteNav activeTour="winter" />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">Tours • Winter</p>
            <h1>Snow routes, warm stays, clean plans.</h1>
            <p className="package-lede">
              Handpicked winter tours for couples and small groups: Swat Kalam,
              Hunza, Murree, and multi-stop north loops. More seasons and
              booking flows are coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="package-section tour-section">
        <div className="package-section-head reveal">
          <p className="kicker">Winter tours</p>
          <h2>Choose your winter departure</h2>
          <p className="section-sub">
            Tap a card to open the full plan. The Swat Kalam tour includes a
            detailed itinerary and inclusions.
          </p>
        </div>

        <div className="package-grid tour-grid">
          {winterTours.map((tour, index) => (
            <Link
              key={tour.slug}
              href={`/tours/winter/${tour.slug}`}
              className={`package-card tour-card reveal delay-${
                (index % 3) + 1
              }`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.22) 0%, rgba(7,9,8,0.92) 100%), url(${tour.heroImage})`
              }}
            >
              <div className="tour-card-topline">
                <span>{tour.durationLabel}</span>
                <span className="tour-card-sep" aria-hidden="true">
                  •
                </span>
                <span>Start from {tour.priceFrom}</span>
              </div>
              <h2>{tour.title}</h2>
              <p className="tour-card-summary">{tour.summary}</p>
              <div className="tour-card-foot">
                <span className="tour-card-cta">View details</span>
                <span className="tour-card-tag">
                  {tour.details ? "Full plan" : "Preview"}
                </span>
              </div>
            </Link>
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
    </main>
  );
}
