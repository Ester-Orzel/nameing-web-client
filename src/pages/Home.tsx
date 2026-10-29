import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api";
import type { Product } from "../api";
import { addToCart } from "../cartStorage";
import { useTypewriter } from "../hooks/useTypewriter";
import Icon from "../componenta/Icon";
import heroImage from "../assets/hero-wide.webp";
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

// חלק שנפרש לכל רוחב המסך, והתוכן שלו נשאר באותו רוחב כמו שאר העמוד
const fullWidth = "mx-[calc(50%-50vw)] px-[max(20px,calc((100vw-1240px)/2+20px))]";

// כותרת של חלק בעמוד הבית
const sectionTitle = "text-center text-[clamp(1.7rem,1.2rem+1.6vw,2.4rem)] font-normal";

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
    <main className="mt-0 flex flex-col gap-16 max-sm:gap-12">
      {/* פתיחה: תמונה רחבה, והטקסט בצד שמאל שלה */}
      <section
        id="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
        className={`grid aspect-[2048/736] animate-fade-up items-center bg-blush-deep bg-cover bg-center bg-no-repeat max-md:aspect-auto max-md:items-end max-md:bg-[length:auto_68vw] max-md:bg-[position:88%_top] max-md:pt-[56vw] ${fullWidth}`}
      >
        <div className="flex w-[min(44%,520px)] flex-col items-center justify-self-end text-center max-md:-mx-5 max-md:w-auto max-md:justify-self-stretch max-md:bg-linear-to-b max-md:from-transparent max-md:via-blush/90 max-md:to-blush max-md:px-5 max-md:pt-16 max-md:pb-8">
          <h1 className="mb-3 bg-linear-to-l from-copper-dark via-[#a9614a] to-[#c58a73] bg-clip-text text-[clamp(2.4rem,1rem+4.4vw,5rem)] leading-[1.12] font-normal tracking-tight text-transparent">
            {hero.title} <em className="block not-italic">{hero.titleAccent}</em>
          </h1>
          <p className="mb-7 max-w-[24ch] text-[clamp(1.05rem,0.9rem+0.6vw,1.4rem)] leading-snug text-copper-dark">
            {hero.text}
          </p>
          <Link
            to="/products"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-copper px-8 py-3 font-medium text-white shadow-copper transition hover:-translate-y-px hover:bg-copper-dark hover:text-white"
          >
            {hero.button}
          </Link>
        </div>
      </section>

      {/* קטגוריות — בטלפון גוללים הצידה */}
      <section
        id="categories"
        aria-label={categoriesTitle}
        className="-mt-8 grid scroll-mt-28 grid-cols-5 gap-4 max-lg:grid-cols-3 max-md:mt-0 max-sm:-mx-4 max-sm:snap-x max-sm:auto-cols-[44%] max-sm:grid-flow-col max-sm:grid-cols-none max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-2"
      >
        {categories.map((category) => (
          <Link
            key={category.label}
            to={`/products?category=${encodeURIComponent(category.category)}`}
            className="group flex snap-start flex-col overflow-hidden rounded-[14px] bg-photo text-ink shadow-sm transition duration-300 hover:-translate-y-1 hover:text-copper-dark hover:shadow-lift"
          >
            <img src={category.image} alt="" className="aspect-square w-full bg-photo object-cover transition duration-500 group-hover:scale-105" />
            <span className="relative pt-1 pb-4 text-center text-[1.05rem] font-medium">{category.label}</span>
          </Link>
        ))}
      </section>

      {/* פס יתרונות */}
      <ul className={`m-0 grid list-none grid-cols-4 bg-blush-deep/45 py-7 max-lg:grid-cols-2 max-lg:gap-y-6 ${fullWidth}`}>
        {benefits.map((benefit) => (
          <li
            key={benefit.title}
            className="grid grid-cols-[auto_auto] items-center justify-center justify-items-start gap-x-4 px-6 not-last:border-l not-last:border-line-strong max-lg:even:border-l-0 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-1 max-sm:px-3 max-sm:text-center [&_svg]:col-start-2 [&_svg]:row-span-2 [&_svg]:row-start-1 [&_svg]:size-10 [&_svg]:text-copper-dark max-sm:[&_svg]:order-first"
          >
            <Icon name={benefit.icon} />
            <strong className="font-medium text-ink">{benefit.title}</strong>
            <span className="text-sm text-muted">{benefit.text}</span>
          </li>
        ))}
      </ul>

      {/* מוצרים נבחרים — מהשרת */}
      <section className="flex flex-col items-center">
        <h2 className={`${sectionTitle} mb-8 flex w-full items-center gap-5 before:h-px before:flex-1 before:bg-line-strong before:content-[''] after:h-px after:flex-1 after:bg-line-strong after:content-['']`}>
          {featured.title}
        </h2>

        {isLoading ? (
          <p className="py-8 text-muted">{featured.loading}</p>
        ) : isError ? (
          <p className="py-8 text-muted">{featured.error}</p>
        ) : (
          <ul className="m-0 mb-8 grid w-full list-none grid-cols-4 gap-5 p-0 max-lg:grid-cols-2 max-sm:gap-3">
            {featuredProducts.map((product) => (
              <li key={product.id} className="flex flex-col items-center text-center">
                <Link to={`/products/${product.id}`} className="flex w-full flex-col items-center text-ink hover:text-copper-dark">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="mb-4 aspect-[5/4] w-full rounded-[12px] bg-photo object-cover shadow-sm transition duration-500 hover:shadow-lift"
                  />
                  <h3 className="mb-1 px-2 text-[1.05rem] font-medium max-sm:text-[0.95rem]">{product.name}</h3>
                </Link>
                <strong className="mb-3 text-lg font-bold text-ink">{product.price} ₪</strong>
                <button
                  onClick={() => addProduct(product)}
                  className="min-h-10 bg-[#c48d7b] px-9 py-1.5 text-[0.95rem] font-medium shadow-none hover:bg-copper-dark max-sm:px-5"
                >
                  {addedId === product.id ? featured.added : featured.button}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* נסו בעצמכם: בקבוק אמיתי, והשם מוקלד עליו */}
      <section className="grid items-center gap-12 rounded-[28px] bg-blush-deep/40 p-10 max-md:p-5 md:grid-cols-[0.8fr_1.2fr]">
        <figure className="@container relative m-0 w-full animate-float overflow-hidden rounded-[24px] bg-photo shadow-card max-md:mx-auto max-md:max-w-[320px]">
          <img src={bottleImage} alt={personalize.bottleAlt} className="w-full" />
          <span
            dir="auto"
            className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 font-script text-[16cqw] leading-none font-bold whitespace-nowrap text-[#1f1a1a] after:ml-1 after:inline-block after:h-[0.8em] after:w-[2px] after:animate-caret after:bg-current after:content-['']"
          >
            {nameOnBottle}
          </span>
        </figure>

        <div>
          <span className="mb-3 inline-block rounded-full bg-copper-tint px-4 py-1 text-sm font-medium text-copper-dark">
            {personalize.eyebrow}
          </span>
          <h2 className={`${sectionTitle} mb-4 text-start`}>{personalize.title}</h2>
          <p className="mb-6 max-w-[56ch] text-[1.05rem]">{personalize.text}</p>

          <label className="mb-8 flex max-w-sm flex-col gap-2">
            {personalize.inputLabel}
            <input
              type="text"
              maxLength={personalize.maxLength}
              value={customName}
              placeholder={personalize.inputPlaceholder}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </label>

          <h3 className="mb-4 text-xl font-medium">{stepsTitle}</h3>
          <ol className="m-0 grid list-none gap-3 p-0 [counter-reset:step] sm:grid-cols-2">
            {steps.map((step) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] items-center gap-x-3 rounded-[14px] border border-line bg-white px-4 py-3 [counter-increment:step] before:row-span-2 before:grid before:size-9 before:place-items-center before:rounded-full before:bg-copper-tint before:font-serif before:text-lg before:font-bold before:text-copper-dark before:content-[counter(step)]"
              >
                <strong className="font-medium text-ink">{step.title}</strong>
                <span className="text-sm text-muted">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* באנר המותג */}
      <section className="mx-[calc(50%-50vw)]">
        <img src={bannerImage} alt={story.imageAlt} className="w-full" />
      </section>

      {/* למה NAMEING: יתרונות · טקסט · תמונה */}
      <section
        id="about"
        className={`-mt-10 grid scroll-mt-28 items-center gap-10 bg-blush-deep/40 max-sm:-mt-8 lg:grid-cols-[1.15fr_1.2fr_1fr] ${fullWidth}`}
      >
        <img
          src={giftBoxImage}
          alt={about.imageAlt}
          className="w-full max-lg:mx-auto max-lg:max-w-md max-lg:rounded-[20px] lg:order-3 lg:-ml-[max(20px,calc((100vw-1240px)/2+20px))] lg:w-[calc(100%+max(20px,calc((100vw-1240px)/2+20px)))] lg:max-w-none"
        />
        <div className="py-8">
          <h2 className={`${sectionTitle} mb-4`}>
            {about.titleStart} <span className="font-sans font-medium">{brand.name}?</span>
          </h2>
          <p className="text-center text-[1.02rem] leading-loose">{about.text}</p>
        </div>
        <ul className="m-0 grid list-none grid-cols-3 gap-2 p-0 py-8 lg:order-first">
          {aboutPoints.map((point) => (
            <li
              key={point.title}
              className="flex flex-col items-center gap-1 px-2 text-center not-last:border-l not-last:border-line-strong max-sm:text-sm [&_svg]:mb-2 [&_svg]:size-10 [&_svg]:text-copper-dark"
            >
              <Icon name={point.icon} />
              <strong className="font-medium text-ink">{point.title}</strong>
              <span className="text-sm text-muted">{point.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
