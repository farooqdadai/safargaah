import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import { getTourCollection } from "../catalog";

export function generateMetadata({ params }) {
  const collection = getTourCollection(params?.category ?? "");
  if (!collection) {
    return {
      title: "Tours | Safargaah",
      description: "Browse curated tour collections across Pakistan."
    };
  }
  return {
    title: `${collection.label} | Safargaah`,
    description: collection.tagline
  };
}

export default function TourCategoryPage({ params }) {
  const collection = getTourCollection(params?.category ?? "");
  if (!collection) {
    notFound();
  }

  return (
    <main className="page tour-page">
      <section
        className="package-hero package-hero--index tour-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.9) 0%, rgba(4,7,6,0.6) 45%, rgba(4,7,6,0.95) 100%), url(${collection.heroImage})`
        }}
      >
        <SiteNav activeTour={collection.slug} />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">Tours</p>
            <h1>{collection.title}</h1>
            <p className="package-lede">{collection.tagline}</p>

            <div className="package-cta">
              <Link className="intent-btn primary" href="/tours">
                Back to tours
              </Link>
              <Link className="intent-btn" href="/tours/winter">
                See winter tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="package-section">
        <div className="package-section-head reveal">
          <p className="kicker">Coming next</p>
          <h2>We are curating this collection</h2>
          <p className="section-sub">
            This page is a placeholder while we add tour cards, detailed
            itineraries, and booking flows.
          </p>
        </div>

        <div className="package-details-grid">
          <article className="detail-card reveal">
            <h3>Route options</h3>
            <p className="detail-lede">
              Multiple plans with realistic driving windows and scenic stops.
            </p>
            <p className="detail-note">
              We will add short, standard, and luxury options as separate tours.
            </p>
          </article>

          <article className="detail-card reveal delay-1">
            <h3>Hotel tiers</h3>
            <p className="detail-lede">
              Standard and premium stays with clear inclusions.
            </p>
            <p className="detail-note">
              Each tour card will show what is included vs. optional add-ons.
            </p>
          </article>

          <article className="detail-card reveal delay-2">
            <h3>Best season</h3>
            <p className="detail-lede">
              Seasonal guidance based on weather and road accessibility.
            </p>
            <p className="detail-note">
              For now, explore our live winter listings to see the format.
            </p>
          </article>
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

