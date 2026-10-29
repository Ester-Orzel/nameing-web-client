import { Link } from "react-router-dom";
import { brand, contact, customerService } from "../data/siteContent";
import Icon from "./Icon";
import nMark from "../assets/n-mark.png";

// עיצוב משותף לעמודות בתחתית
const column = "flex flex-col gap-2";
const title = "mb-3 text-[0.8rem] font-bold tracking-[0.12em] text-copper-dark";
const link = "flex items-center gap-2 text-body hover:text-copper-dark [&_svg]:size-5 [&_svg]:text-copper";

// תחתית האתר — מופיעה בכל העמודים
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-auto border-t border-line bg-blush-deep/60 text-[0.95rem]">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <section className={column}>
          <Link
            to="/"
            dir="ltr"
            className="mb-2 flex items-center justify-end gap-3 text-ink"
            aria-label={`${brand.name} — לדף הבית`}
          >
            <img src={nMark} alt="" className="h-11 w-auto" />
            <span className="font-serif text-[1.7rem] font-semibold tracking-[0.12em] text-copper-dark">
              {brand.name}
            </span>
          </Link>
          <p className="max-w-[30ch] text-muted">{brand.about}</p>
        </section>

        <nav aria-label="ניווט באתר" className={column}>
          <h3 className={title}>ניווט</h3>
          <Link to="/" className={link}>דף הבית</Link>
          <Link to="/products" className={link}>מוצרים</Link>
          <Link to="/cart" className={link}>סל קניות</Link>
          <Link to="/my-account" className={link}>האזור האישי</Link>
        </nav>

        <section className={column}>
          <h3 className={title}>החשבון שלי</h3>
          <Link to="/login" className={link}>התחברות</Link>
          <Link to="/register" className={link}>הרשמה</Link>
        </section>

        <section className={column}>
          <h3 className={title}>שירות לקוחות</h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-muted">
            {customerService.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={column}>
          <h3 className={title}>צרו קשר</h3>
          <a href={contact.phoneLink} className={link}>
            <Icon name="phone" />
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className={link}>
            <Icon name="mail" />
            {contact.email}
          </a>
        </section>
      </div>

      <p className="border-t border-line px-5 py-5 text-center text-[0.85rem] text-muted">
        © {year} {brand.name} · {brand.tagline}
      </p>
    </footer>
  );
}

export default Footer;
