const winterHeroImage =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80";

const snowRidgeImage =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80";
const glacierValleyImage =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80";
const nightBazaarImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80";
const pineForestImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80";
const coastlineImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80";

export const winterToursHero = winterHeroImage;

export const winterTours = [
  {
    slug: "swat-kalam-4-days",
    title: "4 Days Swat Kalam Tour",
    durationLabel: "4 Days, 3 Nights",
    priceFrom: "PKR 70,000",
    heroImage: snowRidgeImage,
    summary:
      "A standard winter trip for couples with Mingora markets, Kalam forests, and Malam Jabba chairlifts.",
    details: {
      headline: "Swat Kalam and Malam Jabba standard trip for couples",
      description:
        "Costing PKR 70,000 with 3 nights stay at standard hotels: 1 night in Mingora, 1 night in Malam Jabba, and 1 night in Kalam with basic gas heating, hot water, and neat rooms. Book your 4 days trip to Swat with team PakistanTravelGuide and enjoy your winter vacations.",
      inclusiveLabel: "Inclusive: Standard",
      included: [
        "Toyota Corolla car",
        "Fuel",
        "Hotel stay (1 room)",
        "Sightseeing",
        "Toll taxes + parking fee",
        "Driver accommodation + food"
      ],
      notIncluded: ["Any sort of tickets and meals are not included."],
      itinerary: [
        {
          day: 1,
          title: "Pick up from Islamabad and depart for Mingora",
          sightseeing: [
            "Mingora (biggest bazaar and capital of Swat Valley)",
            "Fiza Ghat (riverside stop)",
            "White Palace"
          ],
          stay: "Swat Continental Hotel"
        },
        {
          day: 2,
          title: "Departure for Kalam",
          sightseeing: ["Madyan", "Bahrain", "Ushu Forest", "Kalam"],
          stay: "Eagle Nest Kalam"
        },
        {
          day: 3,
          title: "Departure for Malam Jabba",
          sightseeing: ["Malam Jabba", "Zipline chairlift"],
          stay: "Eagle Nest Kalam Malam Jabba"
        },
        {
          day: 4,
          title: "Departure back to Islamabad",
          sightseeing: [],
          stay: null
        }
      ],
      additionalInfo: [
        { label: "Duration", value: "4 days, 3 nights" },
        { label: "Person", value: "2 persons" },
        { label: "Price", value: "PKR 70,000" },
        { label: "Location", value: "Swat, Kalam" }
      ]
    }
  },
  {
    slug: "hunza-by-air-winters",
    title: "Hunza by Air in Winters",
    durationLabel: "5 Days, 4 Nights",
    priceFrom: "PKR 160,000",
    heroImage: glacierValleyImage,
    summary:
      "Fly closer to the peaks, then slow down in Hunza with winter viewpoints, warm stays, and clear stargazing.",
    details: null
  },
  {
    slug: "hunza-winter-tour-lifetime",
    title: "Hunza Winter Tour - A lifetime Experience",
    durationLabel: "6 Days, 5 Nights",
    priceFrom: "PKR 161,000",
    heroImage: winterHeroImage,
    summary:
      "A longer Hunza winter loop with serene villages, high viewpoints, and a calmer, quieter valley rhythm.",
    details: null
  },
  {
    slug: "luxury-swat-4-days",
    title: "4 Days Luxury Swat Tour",
    durationLabel: "4 Days, 3 Nights",
    priceFrom: "PKR 177,000",
    heroImage: pineForestImage,
    summary:
      "A premium Swat winter escape with upgraded stays, flexible pacing, and curated viewpoints.",
    details: null
  },
  {
    slug: "winter-tour-package-6-days",
    title: "6 Days Winter Tour Package",
    durationLabel: "6 Days, 5 Nights",
    priceFrom: "PKR 135,000",
    heroImage: snowRidgeImage,
    summary:
      "A multi-stop winter package designed for comfort with scenic breaks, easy sightseeing, and warm nights.",
    details: null
  },
  {
    slug: "winters-pakistan-9-days",
    title: "9 Days Winters Pakistan Tour",
    durationLabel: "9 Days, 8 Nights",
    priceFrom: "Price on request",
    heroImage: nightBazaarImage,
    summary:
      "An extended winter journey connecting multiple regions. Ideal if you want variety across landscapes.",
    details: null
  },
  {
    slug: "glimpse-of-winters-2026",
    title: "4 Days Glimpse of Winters 2026",
    durationLabel: "4 Days, 3 Nights",
    priceFrom: "Price on request",
    heroImage: winterHeroImage,
    summary:
      "A short winter teaser trip focused on snow views, relaxed stops, and quick scenic drives.",
    details: null
  },
  {
    slug: "murree-nathiagali-kashmir-6-days",
    title: "6 Days Murree NathiaGali Azad Kashmir Tour Package",
    durationLabel: "6 Days, 5 Nights",
    priceFrom: "PKR 99,000",
    heroImage: coastlineImage,
    summary:
      "A winter hill-stations route with forest towns, viewpoints, and easy day plans for couples and families.",
    details: null
  }
];

