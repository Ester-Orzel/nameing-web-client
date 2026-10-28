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
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-text">
          <span className="eyebrow">Personalized gifts</span>
          <h1>
            Gifts that carry <em>their name</em>.
          </h1>
          <p>
            Bottles, bags, jewelry boxes and more, each one personalized with a
            name, an initial or a word you love. The easiest way to give
            something that feels truly personal.
          </p>
          <div className="actions">
            <Link to="/products" className="btn">
              Shop gifts
            </Link>
            <a href="tel:0534166140" className="btn btn-outline">
              Call 053-4166140
            </a>
          </div>
        </div>

        <div className="home-hero-media">
          <img
            src={banner}
            alt="A selection of personalized gifts from ameing"
            width="1600"
            height="1131"
          />
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <span className="eyebrow">Why ameing</span>
          <h2>Why customers choose us</h2>
        </div>

        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature">
              <span className="feature-icon">
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

      <section className="home-section">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three simple steps</h2>
        </div>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {featured.length > 0 && (
        <section className="home-section">
          <div className="section-head section-head-row">
            <div>
              <span className="eyebrow">Favorites</span>
              <h2>Popular gifts</h2>
            </div>
            <Link to="/products" className="link-arrow">
              View all →
            </Link>
          </div>

          <div className="product-grid">
            {featured.map((product) => (
              <div key={product.id} className="product-tile">
                <ProductCard product={product} onAddToCart={() => {}} />

                <button onClick={() => navigate(`/products/${product.id}`)}>
                  View details
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="cta-band">
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
