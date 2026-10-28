import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

// כותרת עליונה משותפת לכל העמודים — מציגה רק קישורים לפי המשתמש המחובר
const Header = () => {
  const { user, token } = useUser();

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/products" className="site-logo" aria-label="ameing — לעמוד הבית">
          <img src={logo} alt="ameing — מתנות במיתוג אישי" />
        </Link>

        <nav className="site-nav" aria-label="ניווט ראשי">
          <NavLink to="/products" end>
            מוצרים
          </NavLink>

          <NavLink to="/cart">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            סל קניות
          </NavLink>

          {token && <NavLink to="/my-account">האזור האישי</NavLink>}

          {user?.role === "ADMIN" && <NavLink to="/admin">ניהול</NavLink>}

          {!user && (
            <>
              <NavLink to="/login">התחברות</NavLink>
              <NavLink to="/register" className="nav-cta">
                הרשמה
              </NavLink>
            </>
          )}

          {user && <span className="chip">שלום, {user.fullName}</span>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
