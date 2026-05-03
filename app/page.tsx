import HeroScan from "@/components/HeroScan";

const solutions = [
  {
    title: "Solar Energy Systems",
    description:
      "High-efficiency solar installations designed for long-term performance and energy savings.",
    href: "/solar",
  },
  {
    title: "Home Battery Systems",
    description:
      "Store energy intelligently and gain more independence from rising utility costs.",
    href: "#",
  },
  {
    title: "Heat Pumps",
    description:
      "Efficient heating and cooling solutions built for comfort, performance, and sustainability.",
    href: "#",
  },
  {
    title: "EV Charging",
    description:
      "Smart home charging setups for modern electric driving and future-ready living.",
    href: "#",
  },
  {
    title: "Windows & Doors",
    description:
      "Premium insulation, clean design, and high-end finishes for better comfort and efficiency.",
    href: "#",
  },
  {
    title: "Renovation Services",
    description:
      "High-quality renovation solutions focused on performance, aesthetics, and long-term value.",
    href: "#",
  },
];

const steps = [
  "Request Your Quote",
  "Receive Your Custom Plan",
  "Professional Installation",
  "Optimize & Save",
];

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-lg font-semibold tracking-wide">Eco Home Palace</div>

          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <a href="#solutions" className="transition hover:text-white">
              Solutions
            </a>
            <a href="#process" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#about" className="transition hover:text-white">
              Why Choose Us
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Get Quote
          </a>
        </div>
      </section>

      <HeroScan />

      <section id="solutions" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-white/50">
              Solutions
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Complete Solutions for Modern Living
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Integrated systems designed to reduce costs, improve comfort, and
              future-proof your home.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution) => (
              <a
                key={solution.title}
                href={solution.href}
                className="block rounded-[1.75rem] border border-white/10 bg-white/5 p-8 transition hover:border-white/30 hover:bg-white/8"
              >
                <h3 className="text-2xl font-semibold">{solution.title}</h3>
                <p className="mt-4 leading-7 text-white/65">
                  {solution.description}
                </p>
                <span className="mt-8 inline-flex text-sm font-semibold text-white">
                  Learn More →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-white/50">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              A Simple, Proven Process
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.75rem] border border-white/10 bg-black p-8"
              >
                <div className="text-sm text-white/40">Step {index + 1}</div>
                <h3 className="mt-4 text-2xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/50">
              Why Choose Us
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Designed for Performance. Built for the Future.
            </h2>
          </div>

          <div className="grid gap-5">
            {[
              "Fully integrated home improvement solutions",
              "Premium-quality systems and finishes",
              "Clean, modern installations with strong aesthetics",
              "Long-term performance and energy savings",
              "One point of contact from advice to execution",
              "Future-ready setup for scaling and upgrades",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center md:p-16">
          <p className="text-sm uppercase tracking-[0.22em] text-white/50">
            Start Today
          </p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Start Your Energy Upgrade Today
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Request a custom quote and discover what is possible for your home,
            property, or next renovation project.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="rounded-full bg-white px-6 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Get Your Custom Quote
            </a>
            <a
              href="#solutions"
              className="rounded-full border border-white/20 px-6 py-4 font-medium text-white transition hover:border-white"
            >
              View Solutions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
