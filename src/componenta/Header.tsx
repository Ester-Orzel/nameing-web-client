import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { brand } from "../data/siteContent";
import Icon from "./Icon";
import nMark from "../assets/n-mark.png";

function Header() {
  const { user, setUser, setToken } = useUser();
  const navigate = useNavigate();

  // תפריט הניווט בטלפון: פתוח או סגור
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <header>
      <button
        aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon name={menuOpen ? "close" : "menu"} />
      </button>

      <nav aria-label="ניווט ראשי" onClick={closeMenu}>
        <NavLink to="/" end>דף הבית</NavLink>
        <NavLink to="/products">מוצרים</NavLink>
        <Link to="/#categories">קטגוריות</Link>
        <Link to="/#about">אודות</Link>
        <Link to="/#contact">צור קשר</Link>
        {user?.role === "ADMIN" && <NavLink to="/admin">ניהול</NavLink>}
      </nav>

      <Link to="/" aria-label={`${brand.name} — לדף הבית`} onClick={closeMenu}>
        <img src={nMark} alt="" />
        <span>{brand.name}</span>
        <small>{brand.tagline}</small>
      </Link>

      <div>
        <NavLink to="/products" end>
          <Icon name="search" />
          <span>חיפוש</span>
        </NavLink>

        {user ? (
          <NavLink to="/my-account">
            <Icon name="user" />
            <span>האזור האישי</span>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <Icon name="user" />
            <span>התחבר/י</span>
          </NavLink>
        )}

        {user && (
          <button onClick={logout}>
            <Icon name="logout" />
            <span>יציאה</span>
          </button>
        )}

        <NavLink to="/cart">
          <Icon name="cart" />
          <span>סל קניות</span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
