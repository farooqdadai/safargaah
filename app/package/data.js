const mountainImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=80";
const lakeImage =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=80";
const heritageImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=80";
const coastImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80";
const fallsImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=80";

const withNights = (stays) =>
  stays.reduce((total, stay) => total + (stay.nights ?? 0), 0);

export const packageCatalog = [
  {
    slug: "north-pakistan",
    title: "Northern Pakistan Tour",
    tag: "Tour package",
    heroImage: mountainImage,
    durationDays: 8,
    durationLabel: "8 days / 7 nights",
    season: "May - Sep",
    startCity: "Islamabad",
    summary:
      "Hunza, Passu, Attabad, and Skardu with glacier viewpoints, lakes, and calm valley nights.",
    route: ["Hunza", "Passu", "Attabad", "Skardu"],
    pickup: {
      city: "Islamabad",
      window: "05:30 - 07:00",
      point: "F-7 / Blue Area pickup points",
      note: "Exact pickup pin is shared 24 hours before departure."
    },
    dropoff: {
      city: "Islamabad",
      window: "18:00 - 22:00",
      point: "Same pickup points",
      note: "Timing depends on road conditions and rest stops."
    },
    stays: [
      { place: "Naran", nights: 2, type: "Roadside lodge" },
      { place: "Hunza", nights: 2, type: "Boutique guesthouse" },
      { place: "Skardu", nights: 3, type: "Hotel near bazaar" }
    ],
    get nights() {
      return withNights(this.stays);
    },
    visits: [
      "Kaghan Valley drive and river stops",
      "Attabad Lake boat stop (seasonal)",
      "Passu cones + Hussaini bridge area",
      "Hunza viewpoints + village lanes",
      "Skardu bazaars + lakes and valleys"
    ],
    included: [
      "Transport for the full route",
      "Hotel stays for all nights",
      "Daily breakfast",
      "Driver fuel + tolls",
      "Basic first-aid and on-trip support"
    ],
    notIncluded: [
      "Lunch and dinner",
      "Entry tickets (forts, parks, boat)",
      "Personal shopping and snacks",
      "Any activity fees (boating, chairlift, etc.)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pickup + drive to Naran",
        from: "Islamabad",
        to: "Naran",
        sleep: "Naran",
        highlights: ["Pickup", "Breakfast stop", "River viewpoints"]
      },
      {
        day: 2,
        title: "Naran to Hunza (full scenic drive)",
        from: "Naran",
        to: "Hunza",
        sleep: "Hunza",
        highlights: ["Photo stops", "Valley viewpoints", "Easy evening walk"]
      },
      {
        day: 3,
        title: "Hunza day: villages + viewpoints",
        from: "Hunza",
        to: "Hunza",
        sleep: "Hunza",
        highlights: ["Local lanes", "Fort area (optional)", "Sunset ridge"]
      },
      {
        day: 4,
        title: "Passu + Attabad, then continue to Skardu",
        from: "Hunza",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Passu cones", "Attabad Lake stop", "Long-drive breaks"]
      },
      {
        day: 5,
        title: "Skardu day: lakes + bazaar evening",
        from: "Skardu",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Lake stop", "Local market", "Cafes and sunset"]
      },
      {
        day: 6,
        title: "Skardu valley loop (easy pace)",
        from: "Skardu",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Viewpoints", "Village lunch stop", "Free time"]
      },
      {
        day: 7,
        title: "Return drive to Naran",
        from: "Skardu",
        to: "Naran",
        sleep: "Naran",
        highlights: ["Scenic stops", "Chai breaks", "Early dinner"]
      },
      {
        day: 8,
        title: "Drop-off back to Islamabad",
        from: "Naran",
        to: "Islamabad",
        sleep: null,
        highlights: ["Breakfast", "Safe return", "Drop-off"]
      }
    ],
    departures: [
      {
        date: "2026-03-21",
        status: "Open",
        seatsLeft: 12,
        price: "PKR 189,000",
        meetTime: "06:00"
      },
      {
        date: "2026-04-11",
        status: "Limited",
        seatsLeft: 4,
        price: "PKR 189,000",
        meetTime: "06:00"
      },
      {
        date: "2026-05-09",
        status: "Open",
        seatsLeft: 10,
        price: "PKR 199,000",
        meetTime: "05:45"
      },
      {
        date: "2026-06-13",
        status: "Open",
        seatsLeft: 9,
        price: "PKR 205,000",
        meetTime: "05:45"
      },
      {
        date: "2026-07-18",
        status: "Open",
        seatsLeft: 11,
        price: "PKR 209,000",
        meetTime: "05:30"
      },
      {
        date: "2026-08-15",
        status: "Limited",
        seatsLeft: 3,
        price: "PKR 209,000",
        meetTime: "05:30"
      }
    ],
    aliases: ["northern-pakistan-tour", "north-pakistan-tour", "certain-package"]
  },
  {
    slug: "pakistan-grand",
    title: "Pakistan Grand Tour",
    tag: "Tour package",
    heroImage: heritageImage,
    durationDays: 12,
    durationLabel: "12 days / 11 nights",
    season: "Apr - Oct",
    startCity: "Islamabad",
    summary:
      "A full-country journey that combines northern scenery, heritage cities, and the Makran coast.",
    route: ["Hunza", "Skardu", "Lahore", "Gwadar"],
    pickup: {
      city: "Islamabad",
      window: "06:00 - 07:30",
      point: "Blue Area / F-7 pickup points",
      note: "Pickup options vary by start city. We confirm before departure."
    },
    dropoff: {
      city: "Karachi",
      window: "16:00 - 21:00",
      point: "Main city drop points",
      note: "Drop city depends on the selected route option."
    },
    stays: [
      { place: "Naran", nights: 2, type: "Lodge" },
      { place: "Hunza", nights: 3, type: "Guesthouse" },
      { place: "Skardu", nights: 3, type: "Hotel" },
      { place: "Lahore", nights: 2, type: "City hotel" },
      { place: "Gwadar", nights: 1, type: "Seaside stay" }
    ],
    get nights() {
      return withNights(this.stays);
    },
    visits: [
      "Karakoram valleys + lakes",
      "Skardu lakes and viewpoints",
      "Lahore heritage lanes and food streets",
      "Makran coastal highway stops",
      "Gwadar viewpoints and beaches"
    ],
    included: [
      "Transport for the full route",
      "Hotel stays for all nights",
      "Daily breakfast",
      "Driver fuel + tolls",
      "Support for route changes and stops"
    ],
    notIncluded: [
      "Lunch and dinner",
      "Entry tickets",
      "Personal shopping",
      "Activities (boating, jeep, etc.)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pickup + drive north",
        from: "Islamabad",
        to: "Naran",
        sleep: "Naran",
        highlights: ["Pickup", "River stops", "Evening rest"]
      },
      {
        day: 2,
        title: "Naran to Hunza",
        from: "Naran",
        to: "Hunza",
        sleep: "Hunza",
        highlights: ["Valley viewpoints", "Photo stops", "Village walk"]
      },
      {
        day: 3,
        title: "Hunza day",
        from: "Hunza",
        to: "Hunza",
        sleep: "Hunza",
        highlights: ["Local markets", "Fort area (optional)", "Sunset spots"]
      },
      {
        day: 4,
        title: "Hunza to Skardu",
        from: "Hunza",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Long scenic drive", "Breaks", "Evening bazaar"]
      },
      {
        day: 5,
        title: "Skardu day",
        from: "Skardu",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Lakes", "Viewpoints", "Free time"]
      },
      {
        day: 6,
        title: "Skardu day",
        from: "Skardu",
        to: "Skardu",
        sleep: "Skardu",
        highlights: ["Valley loop", "Cafe stops", "Easy pace"]
      },
      {
        day: 7,
        title: "Skardu to Lahore (travel day)",
        from: "Skardu",
        to: "Lahore",
        sleep: "Lahore",
        highlights: ["Travel day", "Rest", "Evening food"]
      },
      {
        day: 8,
        title: "Lahore heritage day",
        from: "Lahore",
        to: "Lahore",
        sleep: "Lahore",
        highlights: ["Old city lanes", "Bazaars", "Courtyard dinner"]
      },
      {
        day: 9,
        title: "Fly/drive south to Karachi",
        from: "Lahore",
        to: "Karachi",
        sleep: "Karachi",
        highlights: ["Transfer", "Coast evening", "Rest"]
      },
      {
        day: 10,
        title: "Makran coastal drive",
        from: "Karachi",
        to: "Gwadar",
        sleep: "Gwadar",
        highlights: ["Sea cliffs", "Stops", "Sunset"]
      },
      {
        day: 11,
        title: "Gwadar day + return",
        from: "Gwadar",
        to: "Karachi",
        sleep: "Karachi",
        highlights: ["Viewpoints", "Beach time", "Return drive"]
      },
      {
        day: 12,
        title: "Drop-off",
        from: "Karachi",
        to: "Karachi",
        sleep: null,
        highlights: ["Breakfast", "Drop-off", "End"]
      }
    ],
    departures: [
      { date: "2026-03-28", status: "Open", seatsLeft: 10, price: "PKR 329,000", meetTime: "06:30" },
      { date: "2026-04-25", status: "Open", seatsLeft: 12, price: "PKR 329,000", meetTime: "06:30" },
      { date: "2026-05-23", status: "Limited", seatsLeft: 5, price: "PKR 339,000", meetTime: "06:15" },
      { date: "2026-06-20", status: "Open", seatsLeft: 11, price: "PKR 345,000", meetTime: "06:15" }
    ],
    aliases: ["pakistan-grand-tour"]
  },
  {
    slug: "kpk-discovery",
    title: "KPK Discovery Tour",
    tag: "Tour package",
    heroImage: fallsImage,
    durationDays: 6,
    durationLabel: "6 days / 5 nights",
    season: "Mar - Nov",
    startCity: "Islamabad",
    summary:
      "Swat, Dir, and Kalam with riverside towns, pine forests, and cool valley air.",
    route: ["Swat", "Kalam", "Mingora", "Miandam"],
    pickup: {
      city: "Islamabad",
      window: "06:00 - 07:30",
      point: "Main pickup points",
      note: "Exact pickup pin is shared before departure."
    },
    dropoff: {
      city: "Islamabad",
      window: "17:00 - 21:00",
      point: "Same pickup points",
      note: "Timing depends on traffic and stops."
    },
    stays: [
      { place: "Swat", nights: 2, type: "Hotel" },
      { place: "Kalam", nights: 2, type: "Guesthouse" },
      { place: "Dir", nights: 1, type: "Lodge" }
    ],
    get nights() {
      return withNights(this.stays);
    },
    visits: [
      "Riverside stops and local markets",
      "Pine forest viewpoints",
      "Kalam valley loops",
      "Easy hikes + photo points"
    ],
    included: [
      "Transport for the full route",
      "Hotel stays for all nights",
      "Daily breakfast",
      "Driver fuel + tolls",
      "On-trip support"
    ],
    notIncluded: [
      "Lunch and dinner",
      "Entry tickets",
      "Personal shopping",
      "Activity fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pickup + drive to Swat",
        from: "Islamabad",
        to: "Swat",
        sleep: "Swat",
        highlights: ["Pickup", "Lunch stop", "Evening market walk"]
      },
      {
        day: 2,
        title: "Swat day: viewpoints + river bends",
        from: "Swat",
        to: "Swat",
        sleep: "Swat",
        highlights: ["Chairlift (optional)", "River stops", "Cafe evening"]
      },
      {
        day: 3,
        title: "Swat to Kalam",
        from: "Swat",
        to: "Kalam",
        sleep: "Kalam",
        highlights: ["Forest roads", "Waterfall stop", "Sunset"]
      },
      {
        day: 4,
        title: "Kalam valley loop",
        from: "Kalam",
        to: "Kalam",
        sleep: "Kalam",
        highlights: ["Meadows", "Riverside tea", "Free time"]
      },
      {
        day: 5,
        title: "Kalam to Dir",
        from: "Kalam",
        to: "Dir",
        sleep: "Dir",
        highlights: ["Scenic drive", "Local food", "Early rest"]
      },
      {
        day: 6,
        title: "Return + drop-off",
        from: "Dir",
        to: "Islamabad",
        sleep: null,
        highlights: ["Breakfast", "Stops", "Drop-off"]
      }
    ],
    departures: [
      { date: "2026-03-07", status: "Open", seatsLeft: 14, price: "PKR 129,000", meetTime: "06:30" },
      { date: "2026-04-04", status: "Open", seatsLeft: 12, price: "PKR 129,000", meetTime: "06:30" },
      { date: "2026-05-16", status: "Limited", seatsLeft: 6, price: "PKR 135,000", meetTime: "06:15" }
    ],
    aliases: ["kpk-discovery-tour"]
  }
];

