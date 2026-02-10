import Link from "next/link";
import { tourCollections } from "../tours/catalog";

const places = [
  { label: "Swat Valley", slug: "swat" },
  { label: "Hunza Valley", slug: "hunza" },
  { label: "Skardu", slug: "skardu" },
  { label: "Gwadar Coast", slug: "gwadar" }
];

export default function SiteNav({ activePlace, activeTour }) {
  return (
    <div className="hero-top">
      <Link href="/" className="logo">
        <span className="logo-dot" />
        <span>Safargaah</span>
      </Link>
      <nav className="hero-nav">
        <div className="nav-dropdown">
          <button
            type="button"
            className="nav-item nav-trigger"
            aria-haspopup="menu"
          >
            Places
            <span className="nav-caret" aria-hidden="true" />
          </button>
          <div className="dropdown-menu" role="menu">
            {places.map((place) => (
              <Link
                key={place.slug}
                className={`dropdown-item ${
                  activePlace === place.slug ? "active" : ""
                }`}
                href={`/place/${place.slug}`}
                role="menuitem"
              >
                {place.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-dropdown">
          <button
            type="button"
            className="nav-item nav-trigger"
            aria-haspopup="menu"
          >
            Tours
            <span className="nav-caret" aria-hidden="true" />
          </button>
          <div className="dropdown-menu" role="menu">
            {tourCollections.map((tour) => (
              <Link
                key={tour.slug}
                className={`dropdown-item ${
                  activeTour === tour.slug ? "active" : ""
                }`}
                href={`/tours/${tour.slug}`}
                role="menuitem"
              >
                {tour.label}
              </Link>
            ))}
          </div>
        </div>

        <span className="nav-item disabled" aria-disabled="true">
          Treks
        </span>
        <span className="nav-item disabled" aria-disabled="true">
          Reviews
        </span>
        <span className="nav-item disabled" aria-disabled="true">
          Contact
        </span>
      </nav>
    </div>
  );
}
