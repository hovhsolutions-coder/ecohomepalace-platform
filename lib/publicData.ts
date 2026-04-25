export type ServiceSlug =
  | "renovation"
  | "painting"
  | "plumbing"
  | "electrical"
  | "roofing"
  | "solar"
  | "heat-pumps"
  | "windows-doors"
  | "insulation"
  | "bathroom"
  | "kitchen"
  | "flooring";

export type CitySlug =
  | "amsterdam"
  | "rotterdam"
  | "brussels"
  | "berlin"
  | "london"
  | "paris"
  | "madrid"
  | "barcelona"
  | "milan"
  | "dubai";

type ServiceData = {
  title: string;
  shortDescription: string;
  detailDescription: string;
  examples: string[];
  heroLabel: string;
};

type CityData = {
  name: string;
  country: string;
  shortDescription: string;
  detailDescription: string;
};

export type FrontendService = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intakeSlug: ServiceSlug;
  routeSlug?: ServiceSlug;
  ctaLabel?: string;
};

export type MarketCity = {
  slug: string;
  name: string;
};

export type MarketCountry = {
  slug: string;
  name: string;
  description: string;
  cities: MarketCity[];
};

export type TrustStat = {
  value: string;
  label: string;
};

export type ReviewCard = {
  name: string;
  city: string;
  quote: string;
  date?: string;
};

export type SearchLink = {
  label: string;
  href: string;
};

export const services: Record<ServiceSlug, ServiceData> = {
  renovation: {
    title: "Renovation",
    heroLabel: "Whole-home improvements",
    shortDescription:
      "Renovation projects benefit from clearer scope, better timing, and stronger local matching from the start.",
    detailDescription:
      "Eco Home Palace helps homeowners frame renovation work clearly before they compare suitable professionals, making larger projects easier to review and price.",
    examples: [
      "Complete apartment or townhouse renovation",
      "Layout improvements and structural upgrade planning",
      "Interior renewal before moving in or listing a property",
    ],
  },
  painting: {
    title: "Painting",
    heroLabel: "Interior and exterior refresh",
    shortDescription:
      "Painting projects move faster when the finish, access, and timing are defined before contact begins.",
    detailDescription:
      "From single-room refreshes to full exterior painting, a better-prepared request helps homeowners get more relevant offers.",
    examples: [
      "Interior repainting for walls and ceilings",
      "Exterior facade painting and weather protection",
      "Move-in refresh and rental turnover finishing",
    ],
  },
  plumbing: {
    title: "Plumbing",
    heroLabel: "Repairs and system upgrades",
    shortDescription:
      "Plumbing projects often depend on urgency, access, and system context, which is why clear intake matters.",
    detailDescription:
      "Eco Home Palace helps homeowners prepare plumbing requests for repairs, upgrades, and replacements before they reach suitable professionals.",
    examples: [
      "Leak repair and pipe replacement",
      "Kitchen or bathroom fixture upgrades",
      "Drainage and water pressure improvements",
    ],
  },
  electrical: {
    title: "Electrical work",
    heroLabel: "Power, safety, and smart upgrades",
    shortDescription:
      "Electrical projects need clarity around safety, capacity, and future use before professional review starts.",
    detailDescription:
      "We help homeowners prepare electrical requests for rewiring, lighting, charger installation, and panel upgrades.",
    examples: [
      "Panel upgrades and distribution improvements",
      "Lighting, sockets, and switch installation",
      "Home EV charger preparation and installation",
    ],
  },
  roofing: {
    title: "Roofing",
    heroLabel: "Protection and durability",
    shortDescription:
      "Roofing requests move more efficiently when professionals understand the roof type, condition, and urgency.",
    detailDescription:
      "Eco Home Palace helps homeowners prepare roof repair and replacement requests before local matching begins.",
    examples: [
      "Roof inspections and leak repair",
      "Partial or full roof replacement",
      "Drainage, flashing, and weatherproofing work",
    ],
  },
  solar: {
    title: "Solar panels",
    heroLabel: "Sustainable energy upgrades",
    shortDescription:
      "Solar projects start stronger when roof, property, and location context are already clear.",
    detailDescription:
      "Eco Home Palace prepares solar requests for homeowners who want to compare trusted installers for energy savings and long-term value.",
    examples: [
      "Solar panel installation for family homes",
      "Roof suitability and mounting preparation",
      "Solar expansion tied to lower energy bills",
    ],
  },
  "heat-pumps": {
    title: "Heat pump",
    heroLabel: "Efficient heating and cooling",
    shortDescription:
      "Heat pump projects depend on property type, current heating, and insulation quality before matching starts.",
    detailDescription:
      "We help homeowners prepare heat pump requests so professionals can assess fit, complexity, and timing more effectively.",
    examples: [
      "Air-to-water heat pump installation",
      "Low-carbon heating system replacement",
      "Climate comfort upgrades for year-round use",
    ],
  },
  "windows-doors": {
    title: "Window frames",
    heroLabel: "Efficiency and comfort upgrades",
    shortDescription:
      "Window frame projects can improve insulation, comfort, appearance, and long-term property performance.",
    detailDescription:
      "Eco Home Palace helps homeowners prepare window frame and exterior joinery requests before they compare offers.",
    examples: [
      "Window frame replacement for better insulation",
      "Noise reduction and glazing upgrades",
      "Exterior joinery renewal for premium homes",
    ],
  },
  insulation: {
    title: "Insulation",
    heroLabel: "Comfort and energy savings",
    shortDescription:
      "Insulation projects work best when property type and likely heat-loss areas are clear from the beginning.",
    detailDescription:
      "We help homeowners prepare insulation requests for roof, wall, floor, and broader comfort upgrades before matching starts.",
    examples: [
      "Roof and attic insulation",
      "Wall and cavity insulation",
      "Floor insulation and cold-spot improvements",
    ],
  },
  bathroom: {
    title: "Bathroom renovation",
    heroLabel: "Daily comfort and design",
    shortDescription:
      "Bathroom renovation requests combine layout, fixtures, finishes, and installation sequencing.",
    detailDescription:
      "Eco Home Palace helps homeowners prepare bathroom renovation requests for more relevant review by trusted professionals.",
    examples: [
      "Bathroom redesign and layout update",
      "Shower, vanity, and fixture replacement",
      "Tilework, lighting, and finishing upgrades",
    ],
  },
  kitchen: {
    title: "Kitchen renovation",
    heroLabel: "High-value interior upgrade",
    shortDescription:
      "Kitchen projects benefit from clarity around layout, cabinetry, appliances, and expected finish level.",
    detailDescription:
      "We help homeowners prepare kitchen renovation requests so professionals can assess the project with better context from day one.",
    examples: [
      "Full kitchen redesign and installation",
      "Cabinet, countertop, and appliance upgrades",
      "Layout optimization with premium finishes",
    ],
  },
  flooring: {
    title: "Flooring",
    heroLabel: "Surface renewal and finish work",
    shortDescription:
      "Flooring projects depend on material choice, subfloor condition, and access.",
    detailDescription:
      "Eco Home Palace prepares flooring requests before homeowners compare trusted local professionals.",
    examples: [
      "Wood, laminate, and vinyl installation",
      "Tile replacement and surface renewal",
      "Subfloor repair and leveling",
    ],
  },
};

export const publicServiceCatalog: FrontendService[] = [
  {
    slug: "solar-panels",
    title: "Solar panels",
    eyebrow: "Clean energy",
    description:
      "Generate your own energy and reduce your electricity bill with trusted local installers.",
    intakeSlug: "solar",
    routeSlug: "solar",
    ctaLabel: "Get quotes",
  },
  {
    slug: "home-battery",
    title: "Home battery",
    eyebrow: "Energy storage",
    description:
      "Store more of your energy and increase your control over daily household usage.",
    intakeSlug: "solar",
    routeSlug: "solar",
    ctaLabel: "Get quotes",
  },
  {
    slug: "heat-pump",
    title: "Heat pump",
    eyebrow: "Efficient comfort",
    description:
      "Efficient heating with lower energy costs and better year-round comfort.",
    intakeSlug: "heat-pumps",
    routeSlug: "heat-pumps",
    ctaLabel: "Get quotes",
  },
  {
    slug: "ev-charger",
    title: "EV charger",
    eyebrow: "Home charging",
    description:
      "Prepare your home for electric driving with safe, future-ready charging installation.",
    intakeSlug: "electrical",
    routeSlug: "electrical",
    ctaLabel: "Get quotes",
  },
  {
    slug: "insulation",
    title: "Insulation",
    eyebrow: "Energy efficiency",
    description:
      "Improve comfort and reduce heat loss instantly with the right insulation solution.",
    intakeSlug: "insulation",
    routeSlug: "insulation",
    ctaLabel: "Get quotes",
  },
  {
    slug: "window-frames",
    title: "Window frames",
    eyebrow: "Envelope upgrades",
    description:
      "Upgrade insulation, appearance, and comfort with modern window frame solutions.",
    intakeSlug: "windows-doors",
    routeSlug: "windows-doors",
    ctaLabel: "Get quotes",
  },
  {
    slug: "air-conditioning",
    title: "Air conditioning",
    eyebrow: "Cooling comfort",
    description:
      "Create a smarter indoor climate with reliable cooling and comfort upgrades.",
    intakeSlug: "heat-pumps",
    routeSlug: "heat-pumps",
    ctaLabel: "Get quotes",
  },
  {
    slug: "renovation",
    title: "Renovation",
    eyebrow: "Whole-home upgrades",
    description:
      "Plan and compare renovation work with professionals who understand scope and timing.",
    intakeSlug: "renovation",
    routeSlug: "renovation",
    ctaLabel: "Get quotes",
  },
  {
    slug: "bathroom-renovation",
    title: "Bathroom renovation",
    eyebrow: "Comfort and value",
    description:
      "Transform your bathroom with a clearer request and more relevant local offers.",
    intakeSlug: "bathroom",
    routeSlug: "bathroom",
    ctaLabel: "Get quotes",
  },
  {
    slug: "kitchen-renovation",
    title: "Kitchen renovation",
    eyebrow: "High-value interior",
    description:
      "Upgrade layout, function, and finishes with a better-prepared project request.",
    intakeSlug: "kitchen",
    routeSlug: "kitchen",
    ctaLabel: "Get quotes",
  },
  {
    slug: "electrical-work",
    title: "Electrical work",
    eyebrow: "Safety and power",
    description:
      "Match electrical work with suitable professionals for safe and future-ready upgrades.",
    intakeSlug: "electrical",
    routeSlug: "electrical",
    ctaLabel: "Get quotes",
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    eyebrow: "Practical home systems",
    description:
      "Fix, upgrade, or replace core plumbing work with trusted local professionals.",
    intakeSlug: "plumbing",
    routeSlug: "plumbing",
    ctaLabel: "Get quotes",
  },
];

export const homepageServiceHighlights: FrontendService[] = [
  {
    slug: "solar-panels-home",
    title: "Solar Panels",
    eyebrow: "Clean energy",
    description:
      "Generate your own energy and reduce your electricity bill.",
    intakeSlug: "solar",
    routeSlug: "solar",
    ctaLabel: "Get quotes",
  },
  {
    slug: "heat-pumps-home",
    title: "Heat Pumps",
    eyebrow: "Efficient comfort",
    description: "Efficient heating with lower energy costs.",
    intakeSlug: "heat-pumps",
    routeSlug: "heat-pumps",
    ctaLabel: "Get quotes",
  },
  {
    slug: "insulation-home",
    title: "Insulation",
    eyebrow: "Better comfort",
    description:
      "Improve comfort and reduce heat loss instantly.",
    intakeSlug: "insulation",
    routeSlug: "insulation",
    ctaLabel: "Get quotes",
  },
  {
    slug: "windows-renovation-home",
    title: "Windows & Renovation",
    eyebrow: "Value upgrades",
    description:
      "Upgrade your home for efficiency and value.",
    intakeSlug: "renovation",
    routeSlug: "renovation",
    ctaLabel: "Get quotes",
  },
];

export const cities: Record<CitySlug, CityData> = {
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    shortDescription:
      "Amsterdam is a key market for solar, renovation, insulation, and premium energy upgrades.",
    detailDescription:
      "Eco Home Palace helps Amsterdam homeowners move from project interest to trusted local matching with a clearer request flow.",
  },
  rotterdam: {
    name: "Rotterdam",
    country: "Netherlands",
    shortDescription:
      "Rotterdam is a strong market for renovation, sustainable upgrades, and practical home improvement projects.",
    detailDescription:
      "Eco Home Palace helps Rotterdam homeowners prepare clearer requests before comparing suitable local professionals.",
  },
  brussels: {
    name: "Brussels",
    country: "Belgium",
    shortDescription:
      "Brussels is a premium international market for renovation, insulation, and energy upgrades.",
    detailDescription:
      "Eco Home Palace gives Brussels homeowners a structured path into local project matching with trusted professionals.",
  },
  berlin: {
    name: "Berlin",
    country: "Germany",
    shortDescription:
      "Berlin is one of our strongest markets for heat pumps, solar, and electrical upgrades.",
    detailDescription:
      "Eco Home Palace helps Berlin homeowners compare suitable local professionals with clearer service and location context.",
  },
  london: {
    name: "London",
    country: "United Kingdom",
    shortDescription:
      "London is a broad market for renovation, insulation, EV charging, and premium home upgrades.",
    detailDescription:
      "Eco Home Palace helps London homeowners prepare stronger requests before comparing suitable professionals.",
  },
  paris: {
    name: "Paris",
    country: "France",
    shortDescription:
      "Paris is a major city for apartment renovation, insulation, and electrical modernization.",
    detailDescription:
      "Eco Home Palace helps Paris homeowners move into matching with more trust, structure, and local relevance.",
  },
  madrid: {
    name: "Madrid",
    country: "Spain",
    shortDescription:
      "Madrid is a growing market for insulation, climate comfort, and high-intent renovation work.",
    detailDescription:
      "Eco Home Palace helps Madrid homeowners frame their project clearly before local professional review begins.",
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    shortDescription:
      "Barcelona blends renovation demand with design-led home upgrades and insulation work.",
    detailDescription:
      "Eco Home Palace gives Barcelona homeowners a premium path into trusted local comparison.",
  },
  milan: {
    name: "Milan",
    country: "Italy",
    shortDescription:
      "Milan is a premium market for renovation, bathrooms, kitchens, and design-focused upgrades.",
    detailDescription:
      "Eco Home Palace helps Milan homeowners prepare higher-quality requests before matching starts.",
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    shortDescription:
      "Dubai is a fast-growing premium market for energy systems, cooling, and high-value home improvement work.",
    detailDescription:
      "Eco Home Palace helps Dubai homeowners move into matching with trust, clarity, and local context already in place.",
  },
};

export const countryMarkets: MarketCountry[] = [
  {
    slug: "netherlands",
    name: "Netherlands",
    description:
      "A leading market for solar, insulation, renovation, and comfort-focused home upgrades.",
    cities: [
      { slug: "amsterdam", name: "Amsterdam" },
      { slug: "rotterdam", name: "Rotterdam" },
      { slug: "the-hague", name: "The Hague" },
      { slug: "utrecht", name: "Utrecht" },
      { slug: "eindhoven", name: "Eindhoven" },
      { slug: "nijmegen", name: "Nijmegen" },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    description:
      "Strong demand for heat pumps, insulation, solar, and electrical modernization.",
    cities: [
      { slug: "berlin", name: "Berlin" },
      { slug: "hamburg", name: "Hamburg" },
      { slug: "munich", name: "Munich" },
      { slug: "cologne", name: "Cologne" },
      { slug: "frankfurt", name: "Frankfurt" },
      { slug: "dusseldorf", name: "Düsseldorf" },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    description:
      "A large market for insulation, EV charging, renovation, and energy-efficiency projects.",
    cities: [
      { slug: "london", name: "London" },
      { slug: "manchester", name: "Manchester" },
      { slug: "birmingham", name: "Birmingham" },
      { slug: "leeds", name: "Leeds" },
      { slug: "glasgow", name: "Glasgow" },
      { slug: "liverpool", name: "Liverpool" },
    ],
  },
  {
    slug: "france",
    name: "France",
    description:
      "A strong market for apartment renovation, insulation, and electrical upgrades.",
    cities: [
      { slug: "paris", name: "Paris" },
      { slug: "lyon", name: "Lyon" },
      { slug: "marseille", name: "Marseille" },
      { slug: "toulouse", name: "Toulouse" },
      { slug: "nice", name: "Nice" },
      { slug: "bordeaux", name: "Bordeaux" },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    description:
      "A growing region for insulation, cooling, renovation, and comfort-focused projects.",
    cities: [
      { slug: "madrid", name: "Madrid" },
      { slug: "barcelona", name: "Barcelona" },
      { slug: "valencia", name: "Valencia" },
      { slug: "seville", name: "Seville" },
      { slug: "malaga", name: "Málaga" },
      { slug: "bilbao", name: "Bilbao" },
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    description:
      "Premium demand for renovation, windows, kitchens, bathrooms, and energy upgrades.",
    cities: [
      { slug: "rome", name: "Rome" },
      { slug: "milan", name: "Milan" },
      { slug: "naples", name: "Naples" },
      { slug: "turin", name: "Turin" },
      { slug: "florence", name: "Florence" },
      { slug: "bologna", name: "Bologna" },
    ],
  },
  {
    slug: "belgium",
    name: "Belgium",
    description:
      "A compact market with strong demand for renovation, insulation, and energy improvement projects.",
    cities: [
      { slug: "brussels", name: "Brussels" },
      { slug: "antwerp", name: "Antwerp" },
      { slug: "ghent", name: "Ghent" },
      { slug: "bruges", name: "Bruges" },
      { slug: "leuven", name: "Leuven" },
      { slug: "liege", name: "Liège" },
    ],
  },
  {
    slug: "united-states",
    name: "United States",
    description:
      "Large urban markets for solar, home energy, cooling, renovation, and electrical upgrades.",
    cities: [
      { slug: "new-york", name: "New York" },
      { slug: "los-angeles", name: "Los Angeles" },
      { slug: "chicago", name: "Chicago" },
      { slug: "houston", name: "Houston" },
      { slug: "miami", name: "Miami" },
      { slug: "dallas", name: "Dallas" },
    ],
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    description:
      "A premium market for cooling, solar, batteries, and design-led property upgrades.",
    cities: [
      { slug: "dubai", name: "Dubai" },
      { slug: "abu-dhabi", name: "Abu Dhabi" },
      { slug: "sharjah", name: "Sharjah" },
      { slug: "ajman", name: "Ajman" },
      { slug: "ras-al-khaimah", name: "Ras Al Khaimah" },
    ],
  },
  {
    slug: "india",
    name: "India",
    description:
      "Fast-growing urban markets for cooling, electrical, renovation, and energy-efficient upgrades.",
    cities: [
      { slug: "mumbai", name: "Mumbai" },
      { slug: "delhi", name: "Delhi" },
      { slug: "bengaluru", name: "Bengaluru" },
      { slug: "hyderabad", name: "Hyderabad" },
      { slug: "chennai", name: "Chennai" },
      { slug: "pune", name: "Pune" },
    ],
  },
];

export const serviceOrder = Object.keys(services) as ServiceSlug[];
export const cityOrder = Object.keys(cities) as CitySlug[];

export const popularServiceSlugs: ServiceSlug[] = [
  "solar",
  "heat-pumps",
  "insulation",
  "renovation",
  "electrical",
  "bathroom",
];

export const featuredCitySlugs: CitySlug[] = [
  "amsterdam",
  "berlin",
  "london",
  "paris",
  "dubai",
];

export const heroTrustBar = [
  "4.8/5 homeowner rating",
  "Verified professionals",
  "Active in 10+ countries",
];

export const heroChecks = [
  "Free",
  "No obligation",
  "Only trusted professionals",
];

export const homeHowItWorks = [
  {
    step: "1",
    title: "Tell us about your home",
    desc: "Answer a few quick questions about your property and needs.",
  },
  {
    step: "2",
    title: "Get matched with certified professionals",
    desc: "We connect you with trusted experts in your area.",
  },
  {
    step: "3",
    title: "Receive and compare offers",
    desc: "Choose the best solution based on price, quality and reviews.",
  },
];

export const authorityStats: TrustStat[] = [
  { value: "10,000+", label: "homeowners matched" },
  { value: "10+", label: "countries active" },
  { value: "4.8/5", label: "homeowner rating" },
];

export const partnerMarks = [
  "Professional network",
  "Sustainable home upgrades",
  "Verified local professionals",
  "Premium homeowner support",
];

export const featuredTestimonial = {
  quote:
    "We found a reliable installer within 24 hours and now save hundreds every month.",
  name: "Mark",
  city: "Rotterdam",
};

export const homeownerReviews: ReviewCard[] = [
  {
    name: "Sophie",
    city: "Amsterdam",
    quote: "Everything was arranged quickly and professionally.",
    date: "2026",
  },
  {
    name: "Daniel",
    city: "Berlin",
    quote: "We received multiple offers and saved over €2,000 per year.",
    date: "2026",
  },
  {
    name: "Luca",
    city: "Milan",
    quote: "Simple, fast and reliable platform.",
    date: "2026",
  },
];

export const testimonials = homeownerReviews.map((item) => ({
  ...item,
  rating: "4.8/5",
}));

export const trustStats: TrustStat[] = [
  { value: "10,000+", label: "homeowners matched" },
  { value: "4.8/5", label: "average rating" },
  { value: "10+", label: "countries active" },
];

export const publicTrustPoints = [
  "Free project request",
  "No obligation",
  "Matching based on your project",
  "Response within 24 hours",
  "International platform vision",
  "Professionals reviewed for service area, expertise, availability and customer communication",
];

export const popularProjectSearches: SearchLink[] = [
  { label: "Solar panels in Amsterdam", href: "/solar/amsterdam" },
  { label: "Heat pump in Berlin", href: "/heat-pumps/berlin" },
  { label: "EV charger in London", href: "/electrical/london" },
  { label: "Renovation in Paris", href: "/renovation/paris" },
  { label: "Insulation in Madrid", href: "/insulation/madrid" },
  { label: "Home battery in Dubai", href: "/solar/dubai" },
];

export const regionSpotlight = {
  title: "Available in your region",
  currentRegion: "Netherlands",
  description:
    "Showing results for Netherlands. Eco Home Palace starts with a global platform experience and then helps you move into the right local market when you are ready.",
  cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
};

export const cityHowItWorks = [
  {
    step: "1",
    title: "Choose your project category",
    description:
      "Start with the type of upgrade or installation you want for your home.",
  },
  {
    step: "2",
    title: "Add local project context",
    description:
      "Use city and country details to prepare a more relevant matching request.",
  },
  {
    step: "3",
    title: "Compare suitable professionals",
    description:
      "Continue into intake and receive a clearer path toward trusted local offers.",
  },
];

export const serviceHowItWorks = [
  {
    step: "1",
    title: "Choose the right project path",
    description:
      "Start with the service that best matches the outcome you want for your home.",
  },
  {
    step: "2",
    title: "Add local information",
    description:
      "Share where the project is located so the request is more relevant from the start.",
  },
  {
    step: "3",
    title: "Move into comparison",
    description:
      "Continue into intake and prepare the request for trusted local professionals.",
  },
];

export const combinationHowItWorks = [
  {
    step: "1",
    title: "Start with a strong local fit",
    description:
      "This page already combines the right service with the city where the project will happen.",
  },
  {
    step: "2",
    title: "Prepare your project request",
    description:
      "Continue into intake with stronger service and location context already in place.",
  },
  {
    step: "3",
    title: "Compare suitable professionals",
    description:
      "Your request moves toward trusted local professionals who fit the project.",
  },
];

export const installerBenefits = [
  "Receive project requests from homeowners with clear intent and location context",
  "Join a premium international platform focused on sustainable home solutions",
  "Spend less time qualifying and more time responding to relevant opportunities",
];

export const footerCityLinks = [
  { label: "Amsterdam", href: "/cities/amsterdam" },
  { label: "Berlin", href: "/cities/berlin" },
  { label: "London", href: "/cities/london" },
  { label: "Paris", href: "/cities/paris" },
  { label: "Dubai", href: "/cities/dubai" },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleCaseSlug(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getServiceBySlug(slug: string) {
  return services[slug as ServiceSlug];
}

export function getCityBySlug(slug: string) {
  return cities[slug as CitySlug];
}

export function getCountryBySlug(slug: string) {
  return countryMarkets.find((country) => country.slug === slug);
}

export function getFrontendServiceBySlug(slug: string) {
  return publicServiceCatalog.find((service) => service.slug === slug);
}

export function formatServiceLabel(value?: string) {
  if (!value) {
    return "";
  }

  const normalized = value.toLowerCase();
  const directMatch =
    publicServiceCatalog.find((service) => service.slug === normalized) ??
    publicServiceCatalog.find((service) => service.intakeSlug === normalized) ??
    serviceOrder.find((slug) => slug === normalized);

  if (!directMatch) {
    return value.includes("-") ? titleCaseSlug(value) : value;
  }

  if (typeof directMatch === "string") {
    return services[directMatch].title;
  }

  return directMatch.title;
}

export function formatCityLabel(value?: string) {
  if (!value) {
    return "";
  }

  const normalized = value.toLowerCase();
  const routeCity = cities[normalized as CitySlug];
  if (routeCity) {
    return routeCity.name;
  }

  for (const country of countryMarkets) {
    const match = country.cities.find((city) => city.slug === normalized);
    if (match) {
      return match.name;
    }
  }

  return value.includes("-") ? titleCaseSlug(value) : value;
}

export function getCountrySlugFromName(name: string) {
  return slugify(name);
}
