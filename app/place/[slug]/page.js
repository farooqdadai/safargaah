"use client";

import SiteNav from "../../components/SiteNav";

const fallbackImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=80";

const prettyTitle = (slug) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function PlacePage({ params }) {
  const title = prettyTitle(params.slug);

  return (
    <main className="page">
      <section
        className="hero place-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.88) 0%, rgba(4,7,6,0.68) 48%, rgba(4,7,6,0.94) 100%), url(${fallbackImage})`
        }}
      >
        <SiteNav activePlace={params.slug} />

        <div className="nav-divider" />

        <div className="hero-center">
          <div className="hero-title reveal delay-1">
            <h1>
              <span>{title}</span>
              <span>Coming Soon</span>
            </h1>
            <p className="hero-subline">
              We are curating experiences, routes, and guides for this
              destination.
            </p>
          </div>
        </div>

        <div className="hero-bottom reveal delay-2">
          <div className="swipe">Back to home</div>
          <div className="hero-microcopy">
            <div className="micro-block">
              <p className="micro-title">Explore</p>
              <p className="micro-copy">Discover more Pakistan destinations.</p>
            </div>
            <div className="micro-block">
              <p className="micro-title">Plan</p>
              <p className="micro-copy">Routes, stays, and local guidance.</p>
            </div>
            <div className="micro-block">
              <p className="micro-title">Return</p>
              <p className="micro-copy">Check back for updates soon.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          Copyright 2026 Pakistan Tourism. All rights reserved.
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
