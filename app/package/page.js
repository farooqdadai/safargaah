"use client";

import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { packageCatalog } from "./data";

export default function PackagesIndexPage() {
  return (
    <main className="page package-page">
      <section
        className="package-hero package-hero--index"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.88) 0%, rgba(4,7,6,0.68) 48%, rgba(4,7,6,0.94) 100%), url(${packageCatalog[0]?.heroImage})`
        }}
      >
        <SiteNav />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">
              Packages{" "}
              <span className="urdu-inline" lang="ur" dir="rtl">
                پیکجز
              </span>
            </p>
            <h1>Tour packages across Pakistan</h1>
            <p className="package-lede">
              Choose a complete multi-day tour. Dates and detailed booking flows
              are coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="package-section">
        <div className="package-grid">
          {packageCatalog.map((pkg, index) => (
            <Link
              key={pkg.slug}
              href={`/package/${pkg.slug}`}
              className={`package-card reveal delay-${(index % 3) + 1}`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.15) 0%, rgba(7,9,8,0.88) 100%), url(${pkg.heroImage})`
              }}
            >
              <div className="package-card-top">
                <span className="package-pill">{pkg.durationLabel}</span>
                <span className="package-pill">{pkg.season}</span>
              </div>
              <h2>{pkg.title}</h2>
              <p>{pkg.summary}</p>
              <div className="package-highlights">
                {pkg.route.map((stop) => (
                  <span key={stop}>{stop}</span>
                ))}
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

