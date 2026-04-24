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

export const services: Record<ServiceSlug, ServiceData> = {
  renovation: {
    title: "Renovation",
    heroLabel: "Full Property Upgrades",
    shortDescription:
      "General renovation support for upgrades, repairs, and property improvement projects.",
    detailDescription:
      "Renovation projects often involve multiple moving parts, and this public page helps visitors understand the service before entering intake.",
    examples: [
      "Full apartment or house renovation planning",
      "Living space modernization and layout improvement",
      "Property upgrades before sale or rental",
    ],
  },
  painting: {
    title: "Painting",
    heroLabel: "Interior And Exterior Finishes",
    shortDescription:
      "Interior and exterior painting work focused on clean finish, preparation, and lasting quality.",
    detailDescription:
      "Painting requests can range from a single room to larger property updates, and a clear intake helps professionals assess timing and scope.",
    examples: [
      "Interior wall and ceiling repainting",
      "Exterior facade refresh projects",
      "Rental turnover painting and finishing",
    ],
  },
  plumbing: {
    title: "Plumbing",
    heroLabel: "Repair And Installation Support",
    shortDescription:
      "Plumbing services for repairs, installations, replacements, and core system improvements.",
    detailDescription:
      "Plumbing projects often require clear issue details, urgency, and site context before the right professional can review the request.",
    examples: [
      "Leak repair and pipe replacement",
      "Bathroom plumbing upgrades",
      "Kitchen fixture installation and replacement",
    ],
  },
  electrical: {
    title: "Electrical",
    heroLabel: "Safe Modern Electrical Work",
    shortDescription:
      "Electrical work for safer homes, upgrades, rewiring, and modern energy-ready systems.",
    detailDescription:
      "Electrical work benefits from a structured intake path so professionals can understand the installation or upgrade requirements early.",
    examples: [
      "Rewiring and electrical panel upgrades",
      "Lighting installation projects",
      "Sockets, switches, and safety improvements",
    ],
  },
  roofing: {
    title: "Roofing",
    heroLabel: "Protection And Durability",
    shortDescription:
      "Roof repair and replacement services built around durability, insulation, and protection.",
    detailDescription:
      "Roofing jobs can differ widely by urgency and scale, so this page frames the service before the request moves into intake.",
    examples: [
      "Roof leak repairs and inspections",
      "Partial or full roof replacement",
      "Insulation and weatherproofing improvements",
    ],
  },
  solar: {
    title: "Solar",
    heroLabel: "Energy Independence",
    shortDescription:
      "Solar installations designed to reduce energy costs and improve long-term efficiency.",
    detailDescription:
      "Solar projects usually start with property context, goals, and location, all of which can be captured more clearly through intake.",
    examples: [
      "Residential solar panel installation",
      "Roof suitability and upgrade requests",
      "Energy-cost reduction projects",
    ],
  },
  "heat-pumps": {
    title: "Heat Pumps",
    heroLabel: "Efficient Heating And Cooling",
    shortDescription:
      "Efficient heating and cooling systems for lower utility costs and year-round comfort.",
    detailDescription:
      "Heat pump requests often depend on building type, efficiency goals, and the current system already in place.",
    examples: [
      "Air-to-water heat pump installation",
      "Heating system modernization",
      "Comfort and efficiency upgrade planning",
    ],
  },
  "windows-doors": {
    title: "Windows & Doors",
    heroLabel: "Comfort, Security, Insulation",
    shortDescription:
      "Window and door upgrades that improve insulation, security, and overall home performance.",
    detailDescription:
      "Window and door upgrades often combine comfort, insulation, and design priorities before matching to professionals.",
    examples: [
      "Window replacement for energy efficiency",
      "Front and interior door upgrades",
      "Insulation and noise-reduction improvements",
    ],
  },
  insulation: {
    title: "Insulation",
    heroLabel: "Thermal Performance Upgrades",
    shortDescription:
      "Insulation improvements that reduce heat loss and create a more energy-efficient property.",
    detailDescription:
      "Insulation requests benefit from understanding the property type and the specific areas that need improved thermal performance.",
    examples: [
      "Roof and attic insulation",
      "Wall insulation improvement projects",
      "Floor insulation and comfort upgrades",
    ],
  },
  bathroom: {
    title: "Bathroom",
    heroLabel: "Practical Premium Bathroom Work",
    shortDescription:
      "Bathroom renovation and installation work for layout upgrades, fixtures, and finishing.",
    detailDescription:
      "Bathroom work can include renovation, replacement, or installation, and intake helps clarify the layout and fit-out scope.",
    examples: [
      "Bathroom renovation and redesign",
      "Shower, sink, and toilet replacement",
      "Tilework and finishing upgrades",
    ],
  },
  kitchen: {
    title: "Kitchen",
    heroLabel: "Kitchen Fit-Out And Renewal",
    shortDescription:
      "Kitchen projects covering renovation, fitting, replacement, and practical layout improvement.",
    detailDescription:
      "Kitchen projects need clear detail around layout, timing, and desired outcome before professional review begins.",
    examples: [
      "Full kitchen renovation projects",
      "Cabinet, countertop, and appliance fitting",
      "Layout optimization and modernization",
    ],
  },
  flooring: {
    title: "Flooring",
    heroLabel: "Surface Renewal And Installation",
    shortDescription:
      "Flooring installation and replacement services across residential and light commercial spaces.",
    detailDescription:
      "Flooring requests vary by material, surface area, and existing condition, making intake the next step for better matching.",
    examples: [
      "Laminate and vinyl floor installation",
      "Tile and hardwood replacement projects",
      "Subfloor repair and leveling work",
    ],
  },
};

export const cities: Record<CitySlug, CityData> = {
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    shortDescription:
      "A major launch market for premium renovation, energy, and home improvement requests.",
    detailDescription:
      "Amsterdam is positioned as an early public platform city where visitors can explore service coverage and move into intake with local context.",
  },
  rotterdam: {
    name: "Rotterdam",
    country: "Netherlands",
    shortDescription:
      "A practical urban market for renovation, repair, and energy-efficiency projects.",
    detailDescription:
      "Rotterdam is presented as a city where homeowners can explore trusted service categories before continuing to a matching request.",
  },
  brussels: {
    name: "Brussels",
    country: "Belgium",
    shortDescription:
      "An international city with strong demand across renovation and home upgrade categories.",
    detailDescription:
      "Brussels is part of the public platform preview, helping visitors understand service coverage before intake begins.",
  },
  berlin: {
    name: "Berlin",
    country: "Germany",
    shortDescription:
      "A high-demand city for renovation, painting, electrical, and energy upgrade work.",
    detailDescription:
      "Berlin is featured as a public launch city where service exploration and local context come together before matching starts.",
  },
  london: {
    name: "London",
    country: "United Kingdom",
    shortDescription:
      "A broad home services market suited for premium public discovery and intake routing.",
    detailDescription:
      "London appears as part of the public platform layer to support service discovery before a request moves into intake.",
  },
  paris: {
    name: "Paris",
    country: "France",
    shortDescription:
      "A strong city for renovation, insulation, painting, and apartment-focused upgrade work.",
    detailDescription:
      "Paris is positioned as a city preview where users can discover service pages, combination pages, and then continue into intake.",
  },
  madrid: {
    name: "Madrid",
    country: "Spain",
    shortDescription:
      "A growing market for practical repair, renovation, and comfort-improvement projects.",
    detailDescription:
      "Madrid helps extend the public city layer and gives visitors a local-market context before they submit a request.",
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    shortDescription:
      "A design-conscious city for renovation, windows, insulation, and bathroom projects.",
    detailDescription:
      "Barcelona is shown as part of the international public footprint for service discovery and local request entry.",
  },
  milan: {
    name: "Milan",
    country: "Italy",
    shortDescription:
      "A premium urban market where style, comfort, and modernization projects overlap.",
    detailDescription:
      "Milan is part of the public platform preview, helping users move from market exploration into structured intake.",
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    shortDescription:
      "A premium expansion market for ambitious home improvement and energy-related projects.",
    detailDescription:
      "Dubai represents the broader global platform vision, connecting public discovery with a clear intake path.",
  },
};

export const serviceOrder = Object.keys(services) as ServiceSlug[];
export const cityOrder = Object.keys(cities) as CitySlug[];

export const popularServiceSlugs: ServiceSlug[] = [
  "renovation",
  "painting",
  "plumbing",
  "electrical",
  "solar",
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
    title: "Choose your project",
    desc: "Select the type of work you need from 12+ professional categories",
  },
  {
    step: 2,
    title: "Tell us your city",
    desc: "We match you with verified professionals in your local area",
  },
  {
    step: 3,
    title: "Describe the work",
    desc: "Share details about your project, timeline, and requirements",
  },
  {
    step: 4,
    title: "Get connected",
    desc: "Receive responses from trusted professionals ready to help",
  },
];

export const cityHowItWorks = [
  {
    step: "1",
    title: "Choose the city",
    description: "Start from the city page that best matches where the work will happen.",
  },
  {
    step: "2",
    title: "Pick the right service",
    description: "Explore the service categories that are most relevant for your project.",
  },
  {
    step: "3",
    title: "Continue into intake",
    description: "Submit your request with clear local context so matching can begin.",
  },
];

export const serviceHowItWorks = [
  {
    step: "1",
    title: "Choose this service",
    description: "Start from the service page that best matches the work you want done.",
  },
  {
    step: "2",
    title: "Share your project details",
    description: "Use intake to describe location, requirements, and any timeline expectations.",
  },
  {
    step: "3",
    title: "Get matched",
    description: "Your request can then move into the matching flow for professional review.",
  },
];

export const combinationHowItWorks = [
  {
    step: "1",
    title: "Choose your request",
    description: "Start from the service and city combination that best matches your project.",
  },
  {
    step: "2",
    title: "Share project details",
    description: "Use intake to explain the work, location, and any timing expectations.",
  },
  {
    step: "3",
    title: "Move into matching",
    description: "Your request can then proceed to professional review and local matching.",
  },
];

export const trustPoints = [
  {
    title: "Verified Professionals",
    desc: "Every expert is vetted for quality, licenses, and experience.",
  },
  {
    title: "Fast Response",
    desc: "Get connected with available professionals within 24 hours.",
  },
  {
    title: "Clear Project Intake",
    desc: "Structured intake helps professionals understand your project before contact.",
  },
  {
    title: "Premium Platform Direction",
    desc: "Eco Home Palace is built around a high-trust, premium public experience.",
  },
];

export const combinationTrustPoints = [
  "Structured request flow for clearer project matching",
  "Local-market positioning before intake begins",
  "Free request submission with no obligation",
];

export const publicTrustPoints = [
  "Free project request",
  "No obligation",
  "Matching based on your project",
  "Response within 24 hours",
  "International platform vision",
];

export const popularProjectSearches = [
  {
    label: "Solar professionals in Berlin",
    href: "/solar/berlin",
  },
  {
    label: "Renovation experts in Amsterdam",
    href: "/renovation/amsterdam",
  },
  {
    label: "Bathroom renovation in London",
    href: "/bathroom/london",
  },
  {
    label: "Electricians in Paris",
    href: "/electrical/paris",
  },
];

export function getServiceBySlug(slug: string) {
  return services[slug as ServiceSlug];
}

export function getCityBySlug(slug: string) {
  return cities[slug as CitySlug];
}
