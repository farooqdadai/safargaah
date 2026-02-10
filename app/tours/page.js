import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { tourCollections } from "./catalog";

export const metadata = {
  title: "Tours | Safargaah",
  description:
    "Browse tour collections across Pakistan: winter packages, Hunza, Swat, Skardu, trekking, and more."
};

const heroImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80";

export default function ToursIndexPage() {
  return (
    <main className="page tour-page">
      <section
        className="package-hero package-hero--index tour-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.9) 0%, rgba(4,7,6,0.6) 45%, rgba(4,7,6,0.95) 100%), url(${heroImage})`
        }}
      >
        <SiteNav />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">Tours</p>
            <h1>Pick a collection. Start planning.</h1>
            <p className="package-lede">
              Browse tour collections and seasonal packages. Winter tours are
              live now, and more destinations are being added.
            </p>
          </div>
        </div>
      </section>

      <section className="package-section tour-section">
        <div className="package-section-head reveal">
          <p className="kicker">Tour collections</p>
          <h2>Explore tours by destination and season</h2>
          <p className="section-sub">
            Click a collection to see available tours. This page will expand as
            we add Hunza, Skardu, Kashmir, and international routes.
          </p>
        </div>

        <div className="package-grid tour-grid">
          {tourCollections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/tours/${collection.slug}`}
              className={`package-card tour-card reveal delay-${
                (index % 3) + 1
              }`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.18) 0%, rgba(7,9,8,0.92) 100%), url(${collection.heroImage})`
              }}
            >
              <div className="package-card-top">
                <span className="package-pill">Tours</span>
                <span className="package-pill">
                  {collection.slug === "international" ? "International" : "Pakistan"}
                </span>
              </div>
              <h2>{collection.label}</h2>
              <p className="tour-card-summary">{collection.tagline}</p>
              <div className="tour-card-foot">
                <span className="tour-card-cta">Explore</span>
                <span className="tour-card-tag">
                  {collection.slug === "winter" ? "Live" : "Coming soon"}
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

