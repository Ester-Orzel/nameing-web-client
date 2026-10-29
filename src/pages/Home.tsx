import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import { useTypewriter } from "../hooks/useTypewriter";
import Icon from "../componenta/Icon";
import heroImage from "../assets/hero.webp";
import bottleImage from "../assets/bottle.webp";
import bannerImage from "../assets/brand-banner.webp";
import giftBoxImage from "../assets/gift-box.webp";
import nMark from "../assets/n-mark.png";
import { brand } from "../data/siteContent";
import {
  hero,
  categoriesTitle,
  categories,
  benefits,
  personalize,
  stepsTitle,
  steps,
  featured,
  story,
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
        <img src={heroImage} alt={hero.imageAlt} />
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
              maxLength={10}
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
                <img src={product.imageUrl} alt={product.name} loading="lazy" />
                <span>{featured.badge}</span>
                <h3>{product.name}</h3>
                <strong>₪{product.price}</strong>
                <Link to={`/products/${product.id}`}>{featured.button}</Link>
              </li>
            ))}
          </ul>
        )}

        <Link to="/products">{featured.allButton}</Link>
      </section>

      <section id="story">
        <img src={bannerImage} alt={story.imageAlt} />
        <p>{story.text}</p>
      </section>

      <section id="about">
        <img src={giftBoxImage} alt={about.imageAlt} />
        <div>
          <h2>
            <img src={nMark} alt="" />
            {about.titleStart} <span>{brand.name}?</span>
          </h2>
          <p>{about.text}</p>
          <ul>
            {aboutPoints.map((point) => (
              <li key={point.title}>
                <Icon name={point.icon} />
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
