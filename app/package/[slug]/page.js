"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteNav from "../../components/SiteNav";
import { packageCatalog } from "../data";

const normalizeSlug = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  const raw = value.trim().toLowerCase();
  // Accept `/package/certain%20package` and similar inputs.
  const spaced = raw.replace(/\s+/g, "-");
  return spaced.replace(/[^a-z0-9-]/g, "");
};

const formatDate = (iso) => {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("en-PK", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
};

const monthLabel = (date) =>
  new Intl.DateTimeFormat("en-PK", { month: "long", year: "numeric" }).format(
    date
  );

const pad2 = (value) => String(value).padStart(2, "0");

const toIso = (date) =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const getIsoMonthKey = (date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;

function buildCalendarGrid(monthDate) {
  // Monday-first calendar.
  const first = startOfMonth(monthDate);
  const firstDay = (first.getDay() + 6) % 7; // Sun(0)->6, Mon(1)->0
  const totalDays = getDaysInMonth(monthDate);

  const cells = [];
  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ type: "blank", key: `b-${i}` });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const d = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    cells.push({
      type: "day",
      key: `d-${day}`,
      day,
      iso: toIso(d)
    });
  }

  // Pad to complete weeks.
  while (cells.length % 7 !== 0) {
    cells.push({ type: "blank", key: `p-${cells.length}` });
  }

  return cells;
}

export default function PackageDetailPage({ params }) {
  const incoming = params?.slug ?? "";
  const slug = normalizeSlug(incoming);

  const pkg = useMemo(() => {
    const direct = packageCatalog.find((p) => p.slug === slug);
    if (direct) {
      return direct;
    }
    return packageCatalog.find((p) => (p.aliases ?? []).includes(slug)) ?? null;
  }, [slug]);

  const departures = useMemo(() => pkg?.departures ?? [], [pkg]);
  const departuresByDate = useMemo(() => {
    const map = new Map();
    departures.forEach((dep) => map.set(dep.date, dep));
    return map;
  }, [departures]);

  const departureDates = useMemo(
    () => new Set(departures.map((dep) => dep.date)),
    [departures]
  );

  const initialDeparture = useMemo(() => {
    const todayIso = toIso(new Date());
    return (
      departures.find((dep) => dep.date >= todayIso) ??
      departures[0] ??
      null
    );
  }, [departures]);

  const [selectedDate, setSelectedDate] = useState(
    initialDeparture?.date ?? ""
  );

  const [monthCursor, setMonthCursor] = useState(() => {
    if (initialDeparture?.date) {
      const dt = new Date(`${initialDeparture.date}T00:00:00`);
      return startOfMonth(dt);
    }
    return startOfMonth(new Date());
  });

  useEffect(() => {
    if (!initialDeparture?.date) {
      return;
    }
    setSelectedDate(initialDeparture.date);
    const dt = new Date(`${initialDeparture.date}T00:00:00`);
    setMonthCursor(startOfMonth(dt));
  }, [initialDeparture?.date]);

  const selectedDeparture = selectedDate
    ? departuresByDate.get(selectedDate) ?? null
    : null;

  const calendarCells = useMemo(
    () => buildCalendarGrid(monthCursor),
    [monthCursor]
  );

  const monthHasDepartures = useMemo(() => {
    const key = getIsoMonthKey(monthCursor);
    return departures.some((dep) => dep.date.startsWith(key));
  }, [departures, monthCursor]);

  if (!pkg) {
    return (
      <main className="page package-page">
        <section className="package-section package-notfound">
          <SiteNav />
          <div className="package-section-head reveal">
            <p className="kicker">
              Package{" "}
              <span className="urdu-inline" lang="ur" dir="rtl">
                پیکج
              </span>
            </p>
            <h1>Package not found</h1>
            <p className="section-sub">
              The package you opened does not exist yet. Pick one from the list
              below.
            </p>
          </div>

          <div className="package-grid">
            {packageCatalog.map((item, index) => (
              <Link
                key={item.slug}
                href={`/package/${item.slug}`}
                className={`package-card reveal delay-${(index % 3) + 1}`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(7,9,8,0.15) 0%, rgba(7,9,8,0.88) 100%), url(${item.heroImage})`
                }}
              >
                <div className="package-card-top">
                  <span className="package-pill">{item.durationLabel}</span>
                  <span className="package-pill">{item.season}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <div className="package-highlights">
                  {item.route.map((stop) => (
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

  return (
    <main className="page package-page">
      <section
        className="package-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4,7,6,0.86) 0%, rgba(4,7,6,0.7) 50%, rgba(4,7,6,0.94) 100%), url(${pkg.heroImage})`
        }}
      >
        <SiteNav />

        <div className="package-hero-grid">
          <div className="package-hero-copy reveal">
            <p className="kicker">
              {pkg.tag}{" "}
              <span className="urdu-inline" lang="ur" dir="rtl">
                پیکج
              </span>
            </p>
            <h1>{pkg.title}</h1>
            <p className="package-lede">{pkg.summary}</p>

            <div className="package-stats">
              <div className="package-stat">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{pkg.durationLabel}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">Season</span>
                <span className="stat-value">{pkg.season}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">Start</span>
                <span className="stat-value">{pkg.startCity}</span>
              </div>
              <div className="package-stat">
                <span className="stat-label">Nights</span>
                <span className="stat-value">{pkg.nights}</span>
              </div>
            </div>

            <div className="package-cta">
              <a className="intent-btn primary" href="#departures">
                See dates
              </a>
              <a className="intent-btn" href="#itinerary">
                View plan
              </a>
            </div>
          </div>

          <aside className="package-hero-panel reveal delay-1">
            <div className="panel-top">
              <span className="package-pill">Pickup: {pkg.pickup.city}</span>
              <span className="package-pill">Route: {pkg.route.length} stops</span>
            </div>
            <h2>Next departure</h2>
            {selectedDeparture ? (
              <div className="panel-dep">
                <p className="panel-date">{formatDate(selectedDeparture.date)}</p>
                <div className="panel-meta">
                  <span className={`dep-status ${selectedDeparture.status.toLowerCase()}`}>
                    {selectedDeparture.status}
                  </span>
                  <span>{selectedDeparture.seatsLeft} seats left</span>
                  <span>Meet {selectedDeparture.meetTime}</span>
                </div>
                <p className="panel-price">{selectedDeparture.price}</p>
                <a className="intent-btn" href="#departures">
                  Open calendar
                </a>
              </div>
            ) : (
              <p className="section-sub">
                Departure dates will be published soon.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className="package-section" id="departures">
        <div className="package-section-head reveal">
          <p className="kicker">
            Calendar{" "}
            <span className="urdu-inline" lang="ur" dir="rtl">
              کیلنڈر
            </span>
          </p>
          <h2>Upcoming departure dates</h2>
          <p className="section-sub">
            Pick a date to see availability and meeting time. This is a preview
            of our schedule. A full booking page is coming next.
          </p>
        </div>

        <div className="package-dates-grid">
          <div className="calendar-card reveal">
            <div className="calendar-head">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setMonthCursor((prev) => addMonths(prev, -1))}
                aria-label="Previous month"
              >
                {"\u2190"}
              </button>
              <div className="calendar-title">{monthLabel(monthCursor)}</div>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => setMonthCursor((prev) => addMonths(prev, 1))}
                aria-label="Next month"
              >
                {"\u2192"}
              </button>
            </div>

            <div className="calendar-weekdays" aria-hidden="true">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d} className="calendar-weekday">
                  {d}
                </span>
              ))}
            </div>

            <div className="calendar-grid" role="grid" aria-label="Departures">
              {calendarCells.map((cell) => {
                if (cell.type === "blank") {
                  return <span key={cell.key} className="calendar-blank" />;
                }

                const isDeparture = departureDates.has(cell.iso);
                const isSelected = selectedDate === cell.iso;
                const isToday = cell.iso === toIso(new Date());

                if (!isDeparture) {
                  return (
                    <span
                      key={cell.key}
                      className={`calendar-day muted ${isToday ? "today" : ""}`}
                      aria-disabled="true"
                    >
                      {cell.day}
                    </span>
                  );
                }

                return (
                  <button
                    key={cell.key}
                    type="button"
                    className={`calendar-day departure ${
                      isSelected ? "selected" : ""
                    } ${isToday ? "today" : ""}`}
                    onClick={() => setSelectedDate(cell.iso)}
                    aria-label={`Departure ${formatDate(cell.iso)}`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            <p className="calendar-note">
              {monthHasDepartures
                ? "Highlighted dates are scheduled departures."
                : "No departures this month. Move to the next month."}
            </p>
          </div>

          <div className="departure-card reveal delay-1">
            <h3>Selected date</h3>
            {selectedDeparture ? (
              <div className="dep-card">
                <p className="dep-date">{formatDate(selectedDeparture.date)}</p>
                <div className="dep-row">
                  <span className={`dep-status ${selectedDeparture.status.toLowerCase()}`}>
                    {selectedDeparture.status}
                  </span>
                  <span>{selectedDeparture.seatsLeft} seats left</span>
                </div>
                <div className="dep-row subtle">
                  <span>Meet time</span>
                  <span>{selectedDeparture.meetTime}</span>
                </div>
                <div className="dep-row subtle">
                  <span>Pickup</span>
                  <span>{pkg.pickup.city}</span>
                </div>
                <div className="dep-row subtle">
                  <span>Price</span>
                  <span>{selectedDeparture.price}</span>
                </div>
                <p className="dep-foot">
                  Booking flow is coming next. For now, use this page as a plan
                  reference.
                </p>
              </div>
            ) : (
              <p className="section-sub">Select a highlighted date to preview.</p>
            )}

            <div className="dep-list">
              <p className="dep-list-title">Next departures</p>
              {departures.slice(0, 6).map((dep) => (
                <button
                  key={dep.date}
                  type="button"
                  className={`dep-list-item ${
                    dep.date === selectedDate ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(dep.date);
                    const dt = new Date(`${dep.date}T00:00:00`);
                    setMonthCursor(startOfMonth(dt));
                  }}
                >
                  <span className="dep-list-date">{formatDate(dep.date)}</span>
                  <span className="dep-list-meta">
                    {dep.status} • {dep.seatsLeft} left
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="package-section" id="details">
        <div className="package-section-head reveal">
          <p className="kicker">
            Trip details{" "}
            <span className="urdu-inline" lang="ur" dir="rtl">
              تفصیل
            </span>
          </p>
          <h2>Pickup, stays, visits, and drop-off</h2>
          <p className="section-sub">
            A clear overview of how the trip works from start to finish.
          </p>
        </div>

        <div className="package-details-grid">
          <article className="detail-card reveal">
            <h3>Pickup</h3>
            <p className="detail-lede">
              Start from {pkg.pickup.city} in the early morning.
            </p>
            <ul className="detail-list">
              <li>
                <span className="detail-k">Window</span>
                <span className="detail-v">{pkg.pickup.window}</span>
              </li>
              <li>
                <span className="detail-k">Point</span>
                <span className="detail-v">{pkg.pickup.point}</span>
              </li>
              <li>
                <span className="detail-k">Note</span>
                <span className="detail-v">{pkg.pickup.note}</span>
              </li>
            </ul>
          </article>

          <article className="detail-card reveal delay-1">
            <h3>Stays</h3>
            <p className="detail-lede">{pkg.nights} nights across the route.</p>
            <ul className="detail-list">
              {pkg.stays.map((stay) => (
                <li key={stay.place}>
                  <span className="detail-k">{stay.place}</span>
                  <span className="detail-v">
                    {stay.nights} nights • {stay.type}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="detail-card reveal delay-2">
            <h3>Visits</h3>
            <p className="detail-lede">Key stops and experiences.</p>
            <ul className="detail-bullets">
              {pkg.visits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="detail-card reveal delay-3">
            <h3>Included</h3>
            <p className="detail-lede">What is covered in the package.</p>
            <ul className="detail-bullets">
              {pkg.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="detail-note">
              Not included: {pkg.notIncluded.join(", ")}.
            </p>
          </article>

          <article className="detail-card reveal delay-4">
            <h3>Drop-off</h3>
            <p className="detail-lede">We end back in {pkg.dropoff.city}.</p>
            <ul className="detail-list">
              <li>
                <span className="detail-k">Window</span>
                <span className="detail-v">{pkg.dropoff.window}</span>
              </li>
              <li>
                <span className="detail-k">Point</span>
                <span className="detail-v">{pkg.dropoff.point}</span>
              </li>
              <li>
                <span className="detail-k">Note</span>
                <span className="detail-v">{pkg.dropoff.note}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="package-section" id="itinerary">
        <div className="package-section-head reveal">
          <p className="kicker">
            Itinerary{" "}
            <span className="urdu-inline" lang="ur" dir="rtl">
              منصوبہ
            </span>
          </p>
          <h2>Day-by-day plan</h2>
          <p className="section-sub">
            A realistic flow with rest stops, sightseeing windows, and overnight
            stays.
          </p>
        </div>

        <div className="itinerary-grid">
          {pkg.itinerary.map((day, index) => (
            <article
              key={day.day}
              className={`itinerary-card reveal delay-${(index % 4) + 1}`}
            >
              <div className="itinerary-top">
                <span className="itinerary-day">Day {day.day}</span>
                <span className="itinerary-sleep">
                  {day.sleep ? `Night: ${day.sleep}` : "Drop-off"}
                </span>
              </div>
              <h3>{day.title}</h3>
              <p className="itinerary-route">
                {day.from} → {day.to}
              </p>
              <div className="itinerary-tags">
                {day.highlights.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="package-back">
          <Link href="/package" className="intent-btn">
            Back to packages
          </Link>
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
