import { Link } from "react-router-dom";
import { brand, contact, customerService } from "../data/siteContent";
import Icon from "./Icon";
import nMark from "../assets/n-mark.png";

// תחתית האתר — מופיעה בכל העמודים
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <div>
        <section>
          <Link to="/" aria-label={`${brand.name} — לדף הבית`}>
            <img src={nMark} alt="" />
            <span>{brand.name}</span>
          </Link>
          <p>{brand.about}</p>
        </section>

        <nav aria-label="ניווט באתר">
          <h3>ניווט</h3>
          <Link to="/">דף הבית</Link>
          <Link to="/products">מוצרים</Link>
          <Link to="/cart">סל קניות</Link>
          <Link to="/my-account">האזור האישי</Link>
        </nav>

        <section>
          <h3>החשבון שלי</h3>
          <Link to="/login">התחברות</Link>
          <Link to="/register">הרשמה</Link>
        </section>

        <section>
          <h3>שירות לקוחות</h3>
          <ul>
            {customerService.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>צרו קשר</h3>
          <a href={contact.phoneLink}>
            <Icon name="phone" />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" />
            {contact.email}
          </a>
        </section>
      </div>

      <p>
        © {year} {brand.name} · {brand.tagline}
      </p>
    </footer>
  );
}

export default Footer;
