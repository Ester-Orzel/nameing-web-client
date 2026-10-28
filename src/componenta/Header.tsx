import { Link, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

// Tailwind classes for navigation links (active link gets a white pill)
const navLink = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-1.5 font-semibold transition max-sm:px-3 max-sm:text-[0.95rem] ${
    isActive
      ? "bg-white text-copper-dark shadow-sm"
      : "text-ink hover:bg-copper-tint hover:text-copper-dark"
  }`;

const navCta = () =>
  "rounded-full bg-linear-135 from-[#d9a088] via-copper to-copper-dark px-3.5 py-1.5 font-semibold text-white transition hover:text-white hover:brightness-105";

// Shared site header — only shows links based on the signed-in user
const Header = () => {
  const { user, token } = useUser();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-blush-deep/90 backdrop-blur-md max-sm:static">
      <div className="mx-auto flex min-h-[92px] w-full max-w-[1180px] items-center justify-between gap-4 px-5 max-sm:min-h-0 max-sm:flex-col max-sm:gap-2 max-sm:px-4 max-sm:py-3">
        <Link to="/" className="shrink-0" aria-label="ameing — home">
          <img src={logo} alt="ameing — personalized gifts" className="h-[72px] w-auto max-sm:h-[60px]" />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1.5 max-sm:justify-center max-sm:gap-1" aria-label="Main navigation">
          <NavLink className={navLink} to="/" end>
            Home
          </NavLink>

          <NavLink className={navLink} to="/products" end>
            Shop
          </NavLink>

          <NavLink className={navLink} to="/cart">
            <svg className="mr-1 inline size-[18px] -translate-y-px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            Cart
          </NavLink>

          {token && <NavLink className={navLink} to="/my-account">My account</NavLink>}

          {user?.role === "ADMIN" && <NavLink className={navLink} to="/admin">Admin</NavLink>}

          {!user && (
            <>
              <NavLink className={navLink} to="/login">Sign in</NavLink>
              <NavLink className={navCta} to="/register">
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
