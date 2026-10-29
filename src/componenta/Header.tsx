import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { brand } from "../data/siteContent";
import Icon from "./Icon";
import nMark from "../assets/n-mark.png";
import { getCart, CART_CHANGE_EVENT } from "../cartStorage";

// קישור בתפריט: קו נחושת מתחת לעמוד הנוכחי
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-[1.5px] py-1 text-[0.95rem] font-medium transition hover:text-copper-dark max-lg:border-b max-lg:border-line max-lg:py-3.5 max-lg:last:border-b-0 ${
    isActive ? "border-copper text-copper-dark" : "border-transparent text-ink"
  }`;

// אייקון בצד שמאל (חיפוש, חשבון, סל)
const iconLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative flex flex-col items-center gap-0.5 text-[0.75rem] hover:text-copper-dark ${
    isActive ? "text-copper-dark" : "text-ink"
  }`;

const iconLabel = "max-sm:hidden";

function Header() {
  const { user, setUser, setToken } = useUser();
  const navigate = useNavigate();

  // תפריט הניווט בטלפון: פתוח או סגור
  const [menuOpen, setMenuOpen] = useState(false);

  // מספר הפריטים בסל — מתעדכן בכל פעם שהסל משתנה
  const [cartCount, setCartCount] = useState(() => getCart().length);

  useEffect(() => {
    const update = () => setCartCount(getCart().length);
    window.addEventListener(CART_CHANGE_EVENT, update);
    window.addEventListener("storage", update); // שינוי בלשונית אחרת
    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 grid min-h-24 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line bg-blush/95 px-[max(20px,calc((100vw-1240px)/2+20px))] py-3 backdrop-blur-md max-lg:min-h-[72px] max-lg:grid-cols-[auto_1fr_auto] max-lg:py-2">
      {/* כפתור התפריט — רק בטלפון ובטאבלט */}
      <button
        className="hidden size-11 min-h-0 rounded-full bg-transparent p-2 text-ink shadow-none hover:translate-y-0 hover:bg-copper-tint max-lg:inline-flex [&_svg]:size-6"
        aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon name={menuOpen ? "close" : "menu"} />
      </button>

      <nav
        className={`flex items-center gap-7 max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:flex-col max-lg:items-stretch max-lg:gap-0 max-lg:border-b max-lg:border-line max-lg:bg-blush max-lg:px-5 max-lg:py-2 max-lg:shadow-card ${
          menuOpen ? "" : "max-lg:hidden"
        }`}
        aria-label="ניווט ראשי"
        onClick={closeMenu}
      >
        <NavLink to="/" end className={navLinkClass}>דף הבית</NavLink>
        <NavLink to="/products" className={navLinkClass}>מוצרים</NavLink>
        <Link to="/#categories" className={navLinkClass({ isActive: false })}>קטגוריות</Link>
        <Link to="/#about" className={navLinkClass({ isActive: false })}>אודות</Link>
        <Link to="/#contact" className={navLinkClass({ isActive: false })}>צור קשר</Link>
        {user?.role === "ADMIN" && <NavLink to="/admin" className={navLinkClass}>ניהול</NavLink>}
      </nav>

      {/* הלוגו: סמל ה־N, שם המותג ושורת תיאור */}
      <Link
        to="/"
        dir="ltr"
        className="grid grid-cols-[auto_auto] items-center gap-x-3 text-ink hover:text-ink max-lg:justify-self-center"
        aria-label={`${brand.name} — לדף הבית`}
        onClick={closeMenu}
      >
        <img src={nMark} alt="" className="row-span-2 h-14 w-auto max-lg:h-10" />
        <span className="self-end font-serif text-[2rem] leading-none font-semibold tracking-[0.12em] text-copper-dark max-lg:text-[1.45rem]">
          {brand.name}
        </span>
        <small dir="rtl" className="self-start text-center text-[0.8rem] tracking-wide text-body max-lg:text-[0.68rem]">
          {brand.tagline}
        </small>
      </Link>

      {/* אייקונים: חיפוש, חשבון, הרשמה, יציאה וסל */}
      <div className="flex items-center justify-self-end gap-5 max-sm:gap-2 [&_svg]:size-6">
        <NavLink to="/products" end className={(s) => `${iconLinkClass(s)} max-sm:hidden`}>
          <Icon name="search" />
          <span className={iconLabel}>חיפוש</span>
        </NavLink>

        {user ? (
          <NavLink to="/my-account" className={iconLinkClass}>
            <Icon name="user" />
            <span className={iconLabel}>האזור האישי</span>
          </NavLink>
        ) : (
          <NavLink to="/login" className={iconLinkClass}>
            <Icon name="user" />
            <span className={iconLabel}>התחבר/י</span>
          </NavLink>
        )}

        {!user && (
          <NavLink to="/register" className={iconLinkClass}>
            <Icon name="userPlus" />
            <span className={iconLabel}>הרשמה</span>
          </NavLink>
        )}

        {user && (
          <button
            onClick={logout}
            className="flex min-h-0 flex-col items-center gap-0.5 rounded-none bg-transparent p-0 text-[0.75rem] font-normal text-ink shadow-none hover:translate-y-0 hover:bg-transparent hover:text-copper-dark"
          >
            <Icon name="logout" />
            <span className={iconLabel}>יציאה</span>
          </button>
        )}

        <NavLink to="/cart" className={iconLinkClass}>
          <Icon name="cart" />
          <span className={iconLabel}>סל קניות</span>
          {cartCount > 0 && (
            <b
              aria-label={`${cartCount} פריטים בסל`}
              className="absolute -top-1.5 left-1/2 grid h-[18px] min-w-[18px] -translate-x-[90%] place-items-center rounded-full bg-copper px-1 text-[0.68rem] leading-none font-bold text-white"
            >
              {cartCount}
            </b>
          )}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
