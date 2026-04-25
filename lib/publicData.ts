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

export type Testimonial = {
  name: string;
  city: string;
  quote: string;
  rating: string;
};

export const services: Record<ServiceSlug, ServiceData> = {
  renovation: {
    title: "Renovation",
    heroLabel: "Whole-home upgrades",
    shortDescription:
      "Large renovation projects, layout changes, and coordinated upgrades for quality-conscious homeowners.",
    detailDescription:
      "Renovation projects often involve planning, budgeting, and timing across multiple trades. Eco Home Palace turns that complexity into a clearer matching request.",
    examples: [
      "Full apartment or townhouse renovation planning",
      "Open-plan living upgrades with structural changes",
      "Investment-property renovation before rent or sale",
    ],
  },
  painting: {
    title: "Painting",
    heroLabel: "Interior and exterior finishing",
    shortDescription:
      "Professional painting support for crisp finishes, protective coatings, and polished property refreshes.",
    detailDescription:
      "Painting work moves faster when professionals understand scope, access, and finish expectations upfront.",
    examples: [
      "Interior wall and ceiling repainting",
      "Exterior facade refresh and protection",
      "Move-in and rental turnover finishing",
    ],
  },
  plumbing: {
    title: "Plumbing",
    heroLabel: "Repairs and installations",
    shortDescription:
      "Plumbing support for leak repairs, fixture replacements, system upgrades, and practical home improvements.",
    detailDescription:
      "Plumbing requests benefit from clear project context, urgency, and property details before review starts.",
    examples: [
      "Leak repair and pipe replacement",
      "Kitchen and bathroom fixture upgrades",
      "Water pressure and drainage improvements",
    ],
  },
  electrical: {
    title: "Electrical work",
    heroLabel: "Power, safety, and smart upgrades",
    shortDescription:
      "Electrical work for rewiring, distribution upgrades, lighting, EV charging, and safer modern homes.",
    detailDescription:
      "Electrical projects often combine compliance, power needs, and future-ready upgrades, so matching starts with better intake detail.",
    examples: [
      "Consumer unit and panel upgrades",
      "Lighting design, sockets, and switch replacement",
      "EV charger preparation and installation",
    ],
  },
  roofing: {
    title: "Roofing",
    heroLabel: "Durability and weather protection",
    shortDescription:
      "Roof repair and replacement projects built around longevity, insulation, and weather resilience.",
    detailDescription:
      "Roofing work varies by urgency, access, and roof condition, making a structured request important from the start.",
    examples: [
      "Roof leak repairs and inspections",
      "Partial or full roof replacement",
      "Flashing, drainage, and weatherproofing work",
    ],
  },
  solar: {
    title: "Solar panels",
    heroLabel: "Smart energy independence",
    shortDescription:
      "Solar panel projects designed to reduce energy costs and improve long-term home performance.",
    detailDescription:
      "Solar requests start stronger when the platform captures location, roof context, and homeowner goals before matching.",
    examples: [
      "Residential solar panel installation",
      "Roof suitability and mounting preparation",
      "Solar upgrades tied to energy savings goals",
    ],
  },
  "heat-pumps": {
    title: "Heat pump",
    heroLabel: "Efficient comfort systems",
    shortDescription:
      "Heat pump and climate-control upgrades focused on efficiency, comfort, and future-ready home systems.",
    detailDescription:
      "Heat pump projects depend on property type, insulation quality, and current heating setup, which makes intake clarity valuable.",
    examples: [
      "Air-to-water heat pump installation",
      "Low-carbon heating modernization",
      "Cooling and comfort upgrades for year-round use",
    ],
  },
  "windows-doors": {
    title: "Window frames",
    heroLabel: "Comfort, security, insulation",
    shortDescription:
      "Window frame and exterior joinery upgrades for thermal performance, curb appeal, and quieter interiors.",
    detailDescription:
      "Window and frame projects often combine insulation, design, and installation complexity that benefits from a better prepared request.",
    examples: [
      "Window frame replacement for better insulation",
      "Noise-reduction and comfort upgrades",
      "Exterior frame renewal for premium homes",
    ],
  },
  insulation: {
    title: "Insulation",
    heroLabel: "Thermal performance upgrades",
    shortDescription:
      "Insulation improvements that cut heat loss, support energy savings, and improve day-to-day comfort.",
    detailDescription:
      "Insulation projects move faster when professionals know where thermal losses occur and what type of property they are assessing.",
    examples: [
      "Roof and attic insulation projects",
      "Wall and cavity insulation improvement",
      "Floor insulation and comfort upgrades",
    ],
  },
  bathroom: {
    title: "Bathroom renovation",
    heroLabel: "Premium bathroom upgrades",
    shortDescription:
      "Bathroom renovation projects for better layouts, upgraded finishes, and high-comfort daily use.",
    detailDescription:
      "Bathroom work combines design choices, plumbing scope, and installation sequencing, making intake detail especially helpful.",
    examples: [
      "Bathroom redesign with new layout planning",
      "Shower, vanity, and fixture replacement",
      "Tilework, lighting, and premium finishing",
    ],
  },
  kitchen: {
    title: "Kitchen renovation",
    heroLabel: "High-value kitchen renewal",
    shortDescription:
      "Kitchen renovation support for cabinetry, layout upgrades, appliances, and refined everyday functionality.",
    detailDescription:
      "Kitchen projects need clarity around layout, finishes, appliances, and timing before professionals can price and plan effectively.",
    examples: [
      "Full kitchen redesign and installation",
      "Cabinet, countertop, and appliance fitting",
      "Layout optimization with premium finishes",
    ],
  },
  flooring: {
    title: "Flooring",
    heroLabel: "Surface renewal and installation",
    shortDescription:
      "Flooring projects across wood, laminate, vinyl, and tile for residential upgrades and fit-outs.",
    detailDescription:
      "Flooring work depends on materials, subfloor conditions, and property access, which the platform can capture before matching.",
    examples: [
      "Wood, laminate, and vinyl installation",
      "Tile replacement and surface renewal",
      "Subfloor leveling and repair work",
    ],
  },
};

export const publicServiceCatalog: FrontendService[] = [
  {
    slug: "solar-panels",
    title: "Solar panels",
    eyebrow: "Clean energy",
    description:
      "Roof-ready solar matching for homeowners focused on energy savings and smart upgrades.",
    intakeSlug: "solar",
    routeSlug: "solar",
  },
  {
    slug: "home-battery",
    title: "Home battery",
    eyebrow: "Energy storage",
    description:
      "Battery-ready energy projects for homeowners who want more control over usage and backup capacity.",
    intakeSlug: "solar",
    routeSlug: "solar",
  },
  {
    slug: "heat-pump",
    title: "Heat pump",
    eyebrow: "Efficient comfort",
    description:
      "Low-carbon heating and cooling projects matched to experienced local specialists.",
    intakeSlug: "heat-pumps",
    routeSlug: "heat-pumps",
  },
  {
    slug: "ev-charger",
    title: "EV charger",
    eyebrow: "Home charging",
    description:
      "Electrical and charging-point requests prepared for households adding EV infrastructure.",
    intakeSlug: "electrical",
    routeSlug: "electrical",
  },
  {
    slug: "insulation",
    title: "Insulation",
    eyebrow: "Energy efficiency",
    description:
      "Thermal upgrades that improve comfort, efficiency, and long-term property performance.",
    intakeSlug: "insulation",
    routeSlug: "insulation",
  },
  {
    slug: "window-frames",
    title: "Window frames",
    eyebrow: "Envelope upgrades",
    description:
      "Window frame and exterior joinery projects for insulation, acoustic comfort, and style.",
    intakeSlug: "windows-doors",
    routeSlug: "windows-doors",
  },
  {
    slug: "air-conditioning",
    title: "Air conditioning",
    eyebrow: "Cooling comfort",
    description:
      "Cooling and climate-control requests for properties that need smarter seasonal comfort.",
    intakeSlug: "heat-pumps",
    routeSlug: "heat-pumps",
  },
  {
    slug: "renovation",
    title: "Renovation",
    eyebrow: "Whole-home work",
    description:
      "Multi-trade renovation projects matched with professionals who can assess scope fast.",
    intakeSlug: "renovation",
    routeSlug: "renovation",
  },
  {
    slug: "bathroom-renovation",
    title: "Bathroom renovation",
    eyebrow: "Luxury daily use",
    description:
      "Bathroom transformations with the right mix of plumbing, finishes, and installation detail.",
    intakeSlug: "bathroom",
    routeSlug: "bathroom",
  },
  {
    slug: "kitchen-renovation",
    title: "Kitchen renovation",
    eyebrow: "High-value interiors",
    description:
      "Kitchen upgrades covering layout, cabinetry, appliances, and premium finishing work.",
    intakeSlug: "kitchen",
    routeSlug: "kitchen",
  },
  {
    slug: "electrical-work",
    title: "Electrical work",
    eyebrow: "Safe and future-ready",
    description:
      "Electrical projects ranging from rewiring and lighting to smart-home and power upgrades.",
    intakeSlug: "electrical",
    routeSlug: "electrical",
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    eyebrow: "Practical home systems",
    description:
      "Repairs, upgrades, and plumbing installations prepared for faster professional review.",
    intakeSlug: "plumbing",
    routeSlug: "plumbing",
  },
];

export const cities: Record<CitySlug, CityData> = {
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    shortDescription:
      "A premium launch market for renovation, energy, and high-intent homeowner requests.",
    detailDescription:
      "Amsterdam is an active Eco Home Palace market where homeowners use structured matching to move from interest to qualified project requests quickly.",
  },
  rotterdam: {
    name: "Rotterdam",
    country: "Netherlands",
    shortDescription:
      "A practical urban market for energy upgrades, renovation, and modern home improvement work.",
    detailDescription:
      "Rotterdam supports homeowners looking for a clearer path from service discovery into qualified matching.",
  },
  brussels: {
    name: "Brussels",
    country: "Belgium",
    shortDescription:
      "An international home-services market suited to renovation, energy, and interior upgrades.",
    detailDescription:
      "Brussels is presented as a strong city for premium matching across practical and high-value home projects.",
  },
  berlin: {
    name: "Berlin",
    country: "Germany",
    shortDescription:
      "A high-demand city for renovation, climate upgrades, and electrical modernization.",
    detailDescription:
      "Berlin is one of the core markets where service intent and city context combine before intake begins.",
  },
  london: {
    name: "London",
    country: "United Kingdom",
    shortDescription:
      "A broad premium market for major interior, energy, and comfort-focused home upgrades.",
    detailDescription:
      "London is featured as a city where homeowners can quickly frame project scope before professional review starts.",
  },
  paris: {
    name: "Paris",
    country: "France",
    shortDescription:
      "A strong apartment and renovation market with demand across insulation, electrical, and premium upgrades.",
    detailDescription:
      "Paris supports a premium matching narrative for homeowners who want clarity before comparing offers.",
  },
  madrid: {
    name: "Madrid",
    country: "Spain",
    shortDescription:
      "A growing city for insulation, renovation, and comfort-improvement projects.",
    detailDescription:
      "Madrid helps extend Eco Home Palace across Southern Europe with a practical, conversion-driven request flow.",
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    shortDescription:
      "A design-conscious market for renovation, window upgrades, and energy-efficiency work.",
    detailDescription:
      "Barcelona gives homeowners a premium starting point for city-aware service discovery and intake.",
  },
  milan: {
    name: "Milan",
    country: "Italy",
    shortDescription:
      "A premium urban market where design-led interiors and performance upgrades overlap.",
    detailDescription:
      "Milan reflects the broader platform vision: polished demand capture with a premium first impression.",
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    shortDescription:
      "A premium expansion market for ambitious home upgrades, energy systems, and property improvement.",
    detailDescription:
      "Dubai represents the global reach of Eco Home Palace and the premium positioning of the public platform.",
  },
};

export const countryMarkets: MarketCountry[] = [
  {
    slug: "netherlands",
    name: "Netherlands",
    description:
      "High-intent energy and renovation projects across major Dutch homeowner markets.",
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
      "Strong demand for heat pumps, insulation, and modern electrical work in top German cities.",
    cities: [
      { slug: "berlin", name: "Berlin" },
      { slug: "hamburg", name: "Hamburg" },
      { slug: "munich", name: "Munich" },
      { slug: "cologne", name: "Cologne" },
      { slug: "frankfurt", name: "Frankfurt" },
      { slug: "dusseldorf", name: "Dusseldorf" },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    description:
      "Premium home-improvement demand across major UK cities with strong quote comparison potential.",
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
      "Apartment-led renovation and energy-efficiency demand in France's biggest homeowner markets.",
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
      "Renovation, climate comfort, and insulation projects in high-density Spanish cities.",
    cities: [
      { slug: "madrid", name: "Madrid" },
      { slug: "barcelona", name: "Barcelona" },
      { slug: "valencia", name: "Valencia" },
      { slug: "seville", name: "Seville" },
      { slug: "malaga", name: "Malaga" },
      { slug: "bilbao", name: "Bilbao" },
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    description:
      "Premium interior and building-envelope upgrades across Italy's major urban markets.",
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
      "Compact, high-value home-improvement markets with strong cross-city contractor demand.",
    cities: [
      { slug: "brussels", name: "Brussels" },
      { slug: "antwerp", name: "Antwerp" },
      { slug: "ghent", name: "Ghent" },
      { slug: "bruges", name: "Bruges" },
      { slug: "leuven", name: "Leuven" },
      { slug: "liege", name: "Liege" },
    ],
  },
  {
    slug: "united-states",
    name: "United States",
    description:
      "Large homeowner markets with strong demand for premium energy, renovation, and charging projects.",
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
      "Premium, design-led property upgrades across fast-moving UAE homeowner markets.",
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
      "Fast-growing urban home-upgrade markets with strong appetite for quality professional matching.",
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

export const homeHowItWorks = [
  {
    step: 1,
    title: "Select your project",
    desc: "Choose the service that best matches your home improvement plans.",
  },
  {
    step: 2,
    title: "Add country and city",
    desc: "We use location context to prepare a more relevant matching request.",
  },
  {
    step: 3,
    title: "Review with confidence",
    desc: "Your request is prepared before it moves toward suitable professionals.",
  },
  {
    step: 4,
    title: "Get matched fast",
    desc: "Matching usually starts within 24 hours after you submit your intake.",
  },
];

export const cityHowItWorks = [
  {
    step: "1",
    title: "Choose your city market",
    description:
      "Start from the city that best reflects where the project will happen.",
  },
  {
    step: "2",
    title: "Select the right service",
    description:
      "Use the city context to narrow down the service you need and move faster.",
  },
  {
    step: "3",
    title: "Submit your request",
    description:
      "Continue into intake with local context already prepared for matching.",
  },
];

export const serviceHowItWorks = [
  {
    step: "1",
    title: "Choose the right service",
    description:
      "Start from the service page that best matches your project goals.",
  },
  {
    step: "2",
    title: "Add your location",
    description:
      "Share city and country context so professionals can review the request properly.",
  },
  {
    step: "3",
    title: "Move into matching",
    description:
      "Your request is then prepared for suitable professional review.",
  },
];

export const combinationHowItWorks = [
  {
    step: "1",
    title: "Choose the best-fit combination",
    description:
      "Start with a service and city combination that already reflects your project intent.",
  },
  {
    step: "2",
    title: "Prepare the request",
    description:
      "Continue into intake with stronger service and location context already in place.",
  },
  {
    step: "3",
    title: "Begin matching",
    description:
      "Your request is prepared for suitable local professionals within the matching flow.",
  },
];

export const trustPoints = [
  {
    title: "Prepared requests",
    desc: "Projects are framed before they reach suitable professionals.",
  },
  {
    title: "Fast local matching",
    desc: "Most matching flows begin within 24 hours of intake submission.",
  },
  {
    title: "High-intent homeowners",
    desc: "The experience is designed to capture clear, conversion-ready requests.",
  },
  {
    title: "Premium international direction",
    desc: "Eco Home Palace is built as a luxury lead-generation platform for major markets.",
  },
];

export const combinationTrustPoints = [
  "Project matching starts with better service and city context",
  "Requests are free and without obligation",
  "Qualified local matching begins quickly after intake",
];

export const publicTrustPoints = [
  "Free project request",
  "No obligation",
  "Matching based on your project",
  "Response within 24 hours",
  "International platform vision",
];

export const trustStats: TrustStat[] = [
  {
    value: "10,000+",
    label: "homeowners matched",
  },
  {
    value: "4.8/5",
    label: "average rating",
  },
  {
    value: "10+",
    label: "countries active",
  },
];

export const heroChecks = [
  "Free and without obligation",
  "Prepared request flow before matching",
  "Trusted local professional focus",
];

export const testimonials: Testimonial[] = [
  {
    name: "Sanne de Vries",
    city: "Amsterdam",
    quote:
      "The request flow felt clear and premium. We received serious responses for our solar project much faster than expected.",
    rating: "5/5",
  },
  {
    name: "James Fletcher",
    city: "London",
    quote:
      "Instead of chasing contractors one by one, we submitted one structured request and compared strong options for our renovation.",
    rating: "5/5",
  },
  {
    name: "Claire Moreau",
    city: "Paris",
    quote:
      "The platform made our bathroom renovation request feel prepared and credible before we even had the first call.",
    rating: "4.8/5",
  },
];

export const popularProjectSearches = [
  {
    label: "Solar panels in Amsterdam",
    href: "/solar/amsterdam",
  },
  {
    label: "Heat pump in Berlin",
    href: "/heat-pumps/berlin",
  },
  {
    label: "EV charger in London",
    href: "/electrical/london",
  },
  {
    label: "Renovation in Paris",
    href: "/renovation/paris",
  },
  {
    label: "Insulation in Madrid",
    href: "/insulation/madrid",
  },
  {
    label: "Home battery in Dubai",
    href: "/solar/dubai",
  },
];

export const installerBenefits = [
  "Receive qualified homeowner requests from premium markets",
  "Review projects with service and city context already prepared",
  "Grow visibility as Eco Home Palace expands internationally",
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
