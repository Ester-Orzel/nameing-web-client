import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

// Shared site header — only shows links based on the signed-in user
const Header = () => {
  const { user, token } = useUser();

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="site-logo" aria-label="ameing — home">
          <img src={logo} alt="ameing — personalized gifts" />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/products" end>
            Shop
          </NavLink>

          <NavLink to="/cart">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            Cart
          </NavLink>

          {token && <NavLink to="/my-account">My account</NavLink>}

          {user?.role === "ADMIN" && <NavLink to="/admin">Admin</NavLink>}

          {!user && (
            <>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/register" className="nav-cta">
                Sign up
              </NavLink>
            </>
          )}

          {user && <span className="chip">Hi, {user.fullName}</span>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
