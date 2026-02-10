import Link from "next/link";
import SiteNav from "../../../components/SiteNav";
import { winterTours } from "../data";

const normalizeSlug = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  const raw = value.trim().toLowerCase();
  const spaced = raw.replace(/\s+/g, "-");
  return spaced.replace(/[^a-z0-9-]/g, "");
};

export function generateMetadata({ params }) {
  const slug = normalizeSlug(params?.slug ?? "");
  const tour = winterTours.find((item) => item.slug === slug) ?? null;
  if (!tour) {
    return {
      title: "Tour Not Found | Safargaah",
      description: "This tour does not exist yet. Pick a winter tour instead."
    };
  }
  return {
    title: `${tour.title} | Safargaah`,
    description: tour.summary
  };
}

export default function WinterTourDetailPage({ params }) {
  const slug = normalizeSlug(params?.slug ?? "");
  const tour = winterTours.find((item) => item.slug === slug) ?? null;

  if (!tour) {
    return (
      <main className="page tour-page">
        <section className="package-section package-notfound">
          <SiteNav activeTour="winter" />
          <div className="package-section-head reveal">
            <p className="kicker">Winter tour</p>
            <h1>Tour not found</h1>
            <p className="section-sub">
              The tour you opened does not exist yet. Pick one from the list
              below.
            </p>
          </div>

          <div className="package-grid tour-grid">
            {winterTours.map((item, index) => (
              <Link
                key={item.slug}
                href={`/tour/winter/${item.slug}`}
                className={`package-card tour-card reveal delay-${
                  (index % 3) + 1
                }`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.22) 0%, rgba(7,9,8,0.92) 100%), url(${item.heroImage})`
                }}
              >
                <div className="tour-card-topline">
                  <span>{item.durationLabel}</span>
                  <span className="tour-card-sep" aria-hidden="true">
                    •
                  </span>
                  <span>Start from {item.priceFrom}</span>
                </div>
                <h2>{item.title}</h2>
                <p className="tour-card-summary">{item.summary}</p>
                <div className="tour-card-foot">
                  <span className="tour-card-cta">View details</span>
                  <span className="tour-card-tag">
                    {item.details ? "Full plan" : "Preview"}
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

  const details = tour.details;

  const duration =
    details?.additionalInfo?.find((item) => item.label === "Duration")?.value ??
    tour.durationLabel;
  const people =
    details?.additionalInfo?.find((item) => item.label === "Person")?.value ??
    "Small group";
  const price =
    details?.additionalInfo?.find((item) => item.label === "Price")?.value ??
    `From ${tour.priceFrom}`;
  const location =
    details?.additionalInfo?.find((item) => item.label === "Location")?.value ??
    "Pakistan";

  return (
    <main className="page tour-page">
      <section
        className="package-hero tour-detail-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.88) 0%, rgba(4,7,6,0.66) 48%, rgba(4,7,6,0.94) 100%), url(${tour.heroImage})`
        }}
      >
        <SiteNav activeTour="winter" />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">Winter tour</p>
            <h1>{tour.title}</h1>
            <p className="package-lede">
              {details?.description ?? tour.summary}
            </p>

            <div className="package-stats">
              <div className="package-stat">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{duration}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">Price</span>
                <span className="stat-value">{price}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">People</span>
                <span className="stat-value">{people}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">Location</span>
                <span className="stat-value">{location}</span>
              </div>
            </div>

            <div className="package-cta">
              <Link className="intent-btn primary" href="/tour/winter">
                Back to winter tours
              </Link>
              {details?.itinerary?.length ? (
                <a className="intent-btn" href="#itinerary">
                  View plan
                </a>
              ) : (
                <a className="intent-btn" href="#details">
                  See overview
                </a>
              )}
            </div>
          </div>

          <aside className="package-hero-panel reveal delay-1">
            <div className="panel-top">
              <span className="package-pill">Season: Winter</span>
              <span className="package-pill">{tour.durationLabel}</span>
            </div>
            <h2>{details?.inclusiveLabel ?? "Tour overview"}</h2>
            {details ? (
              <>
                <p className="section-sub">{details.headline}</p>
                <p className="detail-note">
                  Not included: {(details.notIncluded ?? []).join(" ")}
                </p>
              </>
            ) : (
              <p className="section-sub">
                Full itinerary and inclusions will be added soon. For now, use
                this page as a preview card.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className="package-section" id="details">
        <div className="package-section-head reveal">
          <p className="kicker">Tour details</p>
          <h2>Included, not included, and trip notes</h2>
          <p className="section-sub">
            Clear inclusions and a realistic day-by-day flow.
          </p>
        </div>

        {details ? (
          <div className="package-details-grid">
            <article className="detail-card reveal">
              <h3>Included</h3>
              <p className="detail-lede">{details.inclusiveLabel}</p>
              <ul className="detail-bullets">
                {details.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="detail-card reveal delay-1">
              <h3>Not included</h3>
              <p className="detail-lede">Plan for meals and tickets.</p>
              <ul className="detail-bullets">
                {details.notIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="detail-card reveal delay-2">
              <h3>Additional info</h3>
              <p className="detail-lede">Quick facts for planning.</p>
              <ul className="detail-list">
                {details.additionalInfo.map((row) => (
                  <li key={row.label}>
                    <span className="detail-k">{row.label}</span>
                    <span className="detail-v">{row.value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ) : (
          <div className="package-details-grid">
            <article className="detail-card reveal">
              <h3>Preview</h3>
              <p className="detail-lede">
                We are still compiling the full winter plan for this tour.
              </p>
              <p className="detail-note">
                Next updates will include hotel options, route stops, and a
                day-by-day itinerary.
              </p>
            </article>

            <article className="detail-card reveal delay-1">
              <h3>Want it sooner?</h3>
              <p className="detail-lede">
                Tell us your dates, pickup city, and travel style.
              </p>
              <p className="detail-note">
                Booking flow is coming next. For now, this is a curated preview.
              </p>
            </article>
          </div>
        )}
      </section>

      {details?.itinerary?.length ? (
        <section className="package-section" id="itinerary">
          <div className="package-section-head reveal">
            <p className="kicker">Itinerary</p>
            <h2>Day-by-day plan</h2>
            <p className="section-sub">
              A simple flow with sightseeing windows and overnight stays.
            </p>
          </div>

          <div className="itinerary-grid">
            {details.itinerary.map((day, index) => (
              <article
                key={day.day}
                className={`itinerary-card reveal delay-${(index % 4) + 1}`}
              >
                <div className="itinerary-top">
                  <span className="itinerary-day">Day {day.day}</span>
                  <span className="itinerary-sleep">
                    {day.stay ? `Stay: ${day.stay}` : "Return"}
                  </span>
                </div>
                <h3>{day.title}</h3>
                {day.sightseeing?.length ? (
                  <div className="itinerary-tags">
                    {day.sightseeing.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p className="detail-note">Drive day with rest stops.</p>
                )}
              </article>
            ))}
          </div>

          <div className="package-back">
            <Link href="/tour/winter" className="intent-btn">
              Back to winter tours
            </Link>
          </div>
        </section>
      ) : null}

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

