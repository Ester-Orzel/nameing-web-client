import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import ProductCard from "../componenta/ProductCard";
import banner from "../assets/banner.webp";

// Landing page — the first page visitors see
const FEATURES = [
  {
    title: "Made just for them",
    text: "Every gift is personalized with a name, an initial or a word that means something.",
    icon: (
      <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3z" />
    ),
  },
  {
    title: "Your style, your choice",
    text: "Pick the color and the text, and we print it exactly the way you imagined.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="8.5" cy="10" r="1.2" />
        <circle cx="12" cy="7.5" r="1.2" />
        <circle cx="15.5" cy="10" r="1.2" />
        <path d="M12 21a2.5 2.5 0 0 1 0-5h1.5a2.5 2.5 0 0 0 0-5" />
      </>
    ),
  },
  {
    title: "Quality you can feel",
    text: "Carefully chosen products and crisp, lasting printing that looks good for years.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Ready to give",
    text: "Each item is prepared with care, so it is ready to hand over the moment it arrives.",
    icon: (
      <>
        <rect x="3.5" y="9" width="17" height="11" rx="2" />
        <path d="M2.5 9h19M12 9v11" />
        <path d="M12 9c-1.5-3-5-3.5-5-1.2C7 9 12 9 12 9zm0 0c1.5-3 5-3.5 5-1.2C17 9 12 9 12 9z" />
      </>
    ),
  },
  {
    title: "Personal service",
    text: "Real people on the other end of the line, happy to help you choose the right gift.",
    icon: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
  },
  {
    title: "Simple ordering",
    text: "Choose, personalize and check out in a few minutes, from your phone or computer.",
    icon: (
      <>
        <path d="M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </>
    ),
  },
];

const STEPS = [
  { title: "Choose a gift", text: "Browse the collection and find the item you love." },
  { title: "Make it personal", text: "Add a name or an initial and pick your color." },
  { title: "We do the rest", text: "We print it, prepare it and deliver it to your door." },
];

const Home = () => {
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => getProducts(),
  });

  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-14 sm:gap-20">
      <section className="grid items-center gap-8 pt-2 md:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="[&_em]:text-copper [&_h1]:mb-4 [&_h1]:text-[clamp(2.3rem,1.4rem+3.4vw,3.8rem)] [&_h1]:leading-[1.08] [&>p]:mb-6 [&>p]:max-w-[46ch] [&>p]:text-[1.12rem] [&>p]:text-muted max-sm:[&_.btn]:flex-[1_1_100%]">
          <span className="eyebrow">Personalized gifts</span>
          <h1>
            Gifts that carry <em>their name</em>.
          </h1>
          <p>
            Bottles, bags, jewelry boxes and more, each one personalized with a
            name, an initial or a word you love. The easiest way to give
            something that feels truly personal.
          </p>
          <div className="flex flex-wrap items-center gap-3 max-sm:[&>*]:flex-[1_1_100%]">
            <Link to="/products" className="btn">
              Shop gifts
            </Link>
            <a href="tel:0534166140" className="btn btn-outline">
              Call 053-4166140
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line bg-blush-deep shadow-lift md:-rotate-1 [&_img]:h-auto [&_img]:w-full">
          <img
            src={banner}
            alt="A selection of personalized gifts from ameing"
            width="1600"
            height="1131"
          />
        </div>
      </section>

      <section>
        <div className="mb-7 max-w-[640px] [&_h2]:m-0 [&_h2]:text-[clamp(1.6rem,1.2rem+1.5vw,2.3rem)]">
          <span className="eyebrow">Why ameing</span>
          <h2>Why customers choose us</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-card [&_h3]:mb-1.5 [&_h3]:text-xl [&_p]:text-muted">
              <span className="mb-4 inline-grid size-12 place-items-center rounded-[14px] bg-copper-tint text-copper-dark [&_svg]:size-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {feature.icon}
                </svg>
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-7 max-w-[640px] [&_h2]:m-0 [&_h2]:text-[clamp(1.6rem,1.2rem+1.5vw,2.3rem)]">
          <span className="eyebrow">How it works</span>
          <h2>Three simple steps</h2>
        </div>

        <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-dashed border-line-strong bg-linear-160 from-white to-soft p-6 [&_h3]:mb-1 [&_h3]:text-xl [&_p]:text-muted">
              <span className="mb-3.5 inline-grid size-10 place-items-center rounded-full bg-linear-135 from-[#d9a088] via-copper to-copper-dark font-serif text-lg font-bold text-white shadow-copper">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="mb-7 max-w-[640px] [&_h2]:m-0 [&_h2]:text-[clamp(1.6rem,1.2rem+1.5vw,2.3rem)] flex max-w-none flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-end sm:gap-4">
            <div>
              <span className="eyebrow">Favorites</span>
              <h2>Popular gifts</h2>
            </div>
            <Link to="/products" className="font-bold whitespace-nowrap">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-6">
            {featured.map((product) => (
              <div key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift [&>button]:mx-2.5 [&>button]:mb-3 [&>button]:px-2 [&>button]:text-sm [&>button]:whitespace-normal sm:[&>button]:mx-4 sm:[&>button]:mb-4 sm:[&>button]:text-base">
                <ProductCard product={product} onAddToCart={() => {}} />

                <button className="btn" onClick={() => navigate(`/products/${product.id}`)}>
                  View details
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl bg-linear-135 from-[#d9a088] via-copper to-copper-dark px-6 py-10 text-center text-white shadow-lift sm:py-14 [&_h2]:text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] [&_h2]:text-white [&_p]:mb-6 [&_p]:text-[1.08rem] [&_p]:opacity-90">
        <h2>Ready to create something personal?</h2>
        <p>Find the perfect gift and make it theirs in just a few clicks.</p>
        <Link to="/products" className="btn btn-light">
          Start shopping
        </Link>
      </section>
    </div>
  );
};

export default Home;
