import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.webp";
import { useTypewriter } from "../hooks/useTypewriter";
import {
  hero,
  demoNames,
  demoCaption,
  explain,
  stepsTitle,
  steps,
  reasonsTitle,
  reasons,
  cta,
} from "../data/homeContent";

// עמוד הבית (דף נחיתה): מציג את התוכן מהקובץ data/homeContent.ts
const Home = () => {
  // השם שמוקלד כרגע על הבקבוק בהדגמה
  const { text, wordIndex } = useTypewriter(demoNames.map((demo) => demo.name));

  // צבע הבקבוק משתנה לפי השם הנוכחי (משתנה CSS שהעיצוב משתמש בו)
  const bottleColor = { "--bottle": demoNames[wordIndex].color } as CSSProperties;

  return (
    <main>
      <section>
        <div>
          <span>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.text}</p>
          <div>
            <Link to="/products">{hero.shopButton}</Link>
            <a href={`tel:${hero.phone}`}>{hero.phoneButton}</a>
          </div>
        </div>

        <figure>
          <div style={bottleColor}>
            <span>{text}</span>
          </div>
          <figcaption>{demoCaption}</figcaption>
        </figure>
      </section>

      <section>
        <div>
          <h2>{explain.title}</h2>
          <p>{explain.text}</p>
        </div>
        <img src={banner} alt={explain.imageAlt} />
      </section>

      <section>
        <h2>{stepsTitle}</h2>
        <ol>
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>{reasonsTitle}</h2>
        <ul>
          {reasons.map((reason) => (
            <li key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
        <Link to="/products">{cta.button}</Link>
      </section>
    </main>
  );
};

export default Home;
