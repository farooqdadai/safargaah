const internationalHero =
  "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=2400&q=80";
const hunzaHero =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80";
const swatHero =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80";
const skarduHero =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80";
const kashmirHero =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80";
const naranHero =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80";
const astoreHero =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80";
const trekkingHero =
  "https://images.unsplash.com/photo-1500534314209-a26db0f0b455?auto=format&fit=crop&w=2400&q=80";
const winterHero =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80";

export const tourCollections = [
  {
    slug: "international",
    label: "International Tours",
    title: "International tours",
    tagline: "City breaks, coastlines, and mountain routes beyond Pakistan.",
    heroImage: internationalHero
  },
  {
    slug: "hunza",
    label: "Hunza Tour Packages",
    title: "Hunza tour packages",
    tagline: "Valley viewpoints, lakes, and glacier roads in the Karakoram.",
    heroImage: hunzaHero
  },
  {
    slug: "swat",
    label: "Swat Tour Packages",
    title: "Swat tour packages",
    tagline: "River bends, pine forests, Kalam lanes, and Malam Jabba snow.",
    heroImage: swatHero
  },
  {
    slug: "skardu",
    label: "Skardu Tour Packages",
    title: "Skardu tour packages",
    tagline: "High-altitude lakes, wide valleys, and clean mountain air.",
    heroImage: skarduHero
  },
  {
    slug: "azad-kashmir",
    label: "Azad Kashmir Tour Packages",
    title: "Azad Kashmir tour packages",
    tagline: "Green valleys, riverside towns, and relaxed scenic drives.",
    heroImage: kashmirHero
  },
  {
    slug: "naran-kaghan",
    label: "Naran Kaghan Tour",
    title: "Naran Kaghan tours",
    tagline: "Lakes, meadows, and forest roads with easy photo stops.",
    heroImage: naranHero
  },
  {
    slug: "astore-minimarg",
    label: "Astore Minimarg Tour Package",
    title: "Astore Minimarg tour packages",
    tagline: "Remote plains, cold rivers, and iconic northern landscapes.",
    heroImage: astoreHero
  },
  {
    slug: "trekking",
    label: "Trekking",
    title: "Trekking routes",
    tagline: "Guided treks, base-camp plans, and trail-first adventures.",
    heroImage: trekkingHero
  },
  {
    slug: "winter",
    label: "Winter Tour Packages",
    title: "Winter tour packages",
    tagline: "Snow routes, warm stays, and calm winter valleys.",
    heroImage: winterHero
  }
];

export function getTourCollection(slug) {
  if (typeof slug !== "string") {
    return null;
  }
  const key = slug.trim().toLowerCase();
  return tourCollections.find((item) => item.slug === key) ?? null;
}

