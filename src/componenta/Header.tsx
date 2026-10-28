import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";

function Header() {
  const { user, setUser, setToken } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <header>
      <NavLink to="/">
        <img src={logo} alt="ameing — מתנות במיתוג אישי" />
      </NavLink>

      <nav>
        <NavLink to="/" end>דף הבית</NavLink>
        <NavLink to="/products">מוצרים</NavLink>
        <NavLink to="/cart">סל קניות 🛒</NavLink>

        {user ? (
          <>
            <NavLink to="/my-account">האזור האישי</NavLink>
            {user.role === "ADMIN" && <NavLink to="/admin">ניהול</NavLink>}
            <button onClick={logout}>התנתקות</button>
          </>
        ) : (
          <>
            <NavLink to="/login">התחברות</NavLink>
            <NavLink to="/register">הרשמה</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;