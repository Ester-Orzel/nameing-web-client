import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import type { Product } from "../api";
import { addToCart } from "../cartStorage";
import { useTypewriter } from "../hooks/useTypewriter";
import Icon from "../componenta/Icon";
import bottleImage from "../assets/bottle.webp";
import bannerImage from "../assets/brand-banner.webp";
import giftBoxImage from "../assets/gift-box.webp";
import { brand } from "../data/siteContent";
import {
  hero,
  categoriesTitle,
  categories,
  benefits,
  story,
  personalize,
  stepsTitle,
  steps,
  featured,
  about,
  aboutPoints,
} from "../data/homeContent";

// עמוד הבית: מציג את התוכן מהקובץ data/homeContent.ts
const Home = () => {
  const location = useLocation();

  // השם שהגולשת כותבת בהדגמה. כשהשדה ריק — השם "מוקלד" לבד
  const [customName, setCustomName] = useState("");
  const { text: demoName } = useTypewriter(personalize.demoNames);
  const nameOnBottle = customName || demoName;

  // מוצרים נבחרים — מהשרת (אותו מפתח כמו בעמוד פרטי מוצר, כך שהמידע נשמר במטמון)
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const featuredProducts = products.slice(0, featured.count);

  // המוצר שנוסף עכשיו לסל — כדי להציג "נוסף לסל ✓" לרגע
  const [addedId, setAddedId] = useState<number | null>(null);

  const addProduct = (product: Product) => {
    addToCart({
      product,
      personalization: false,
      customText: "",
      selectedColor: null,
      selectedFont: null,
    });
    setAddedId(product.id);
  };

  useEffect(() => {
    if (addedId === null) return;
    const timer = setTimeout(() => setAddedId(null), 1800);
    return () => clearTimeout(timer);
  }, [addedId]);

  // קישורים כמו "/#about" — גוללים לחלק המתאים בעמוד
  useEffect(() => {
    if (!location.hash) return;
    document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <main>
      <section id="hero">
        <div>
          <h1>
            {hero.title} <em>{hero.titleAccent}</em>
          </h1>
          <p>{hero.text}</p>
          <Link to="/products">{hero.button}</Link>
        </div>
      </section>

      <section id="categories" aria-label={categoriesTitle}>
        {categories.map((category) => (
          <Link key={category.label} to={`/products?category=${encodeURIComponent(category.category)}`}>
            <img src={category.image} alt="" />
            <span>{category.label}</span>
          </Link>
        ))}
      </section>

      <ul id="benefits">
        {benefits.map((benefit) => (
          <li key={benefit.title}>
            <Icon name={benefit.icon} />
            <strong>{benefit.title}</strong>
            <span>{benefit.text}</span>
          </li>
        ))}
      </ul>

      <section id="featured">
        <h2>{featured.title}</h2>

        {isLoading ? (
          <p>{featured.loading}</p>
        ) : isError ? (
          <p>{featured.error}</p>
        ) : (
          <ul>
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} loading="lazy" />
                  <h3>{product.name}</h3>
                </Link>
                <strong>{product.price} ₪</strong>
                <button onClick={() => addProduct(product)}>
                  {addedId === product.id ? featured.added : featured.button}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="personalize">
        <figure>
          <img src={bottleImage} alt={personalize.bottleAlt} />
          <span dir="auto">{nameOnBottle}</span>
        </figure>

        <div>
          <span>{personalize.eyebrow}</span>
          <h2>{personalize.title}</h2>
          <p>{personalize.text}</p>

          <label>
            {personalize.inputLabel}
            <input
              type="text"
              maxLength={personalize.maxLength}
              value={customName}
              placeholder={personalize.inputPlaceholder}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </label>

          <h3>{stepsTitle}</h3>
          <ol>
            {steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="story">
        <img src={bannerImage} alt={story.imageAlt} />
      </section>

      <section id="about">
        <img src={giftBoxImage} alt={about.imageAlt} />
        <div>
          <h2>
            {about.titleStart} <span>{brand.name}?</span>
          </h2>
          <p>{about.text}</p>
        </div>
        <ul>
          {aboutPoints.map((point) => (
            <li key={point.title}>
              <Icon name={point.icon} />
              <strong>{point.title}</strong>
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
