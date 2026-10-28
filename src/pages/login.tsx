
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../api";
import { useUser } from "../context/UserContext";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { setUser, setToken } = useUser();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/products";

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("");

      const res = await loginUser(data.email, data.password);

      setUser(res.user);
      setToken(res.token);

      navigate(from, { replace: true });
    } catch {
      setError("ההתחברות נכשלה. בדקי את האימייל והסיסמה.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card form-card">
        <h1>התחברות</h1>
        <p className="subtitle">שמחים לראות אותך שוב</p>

        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="אימייל"
            autoComplete="email"
            {...register("email", { required: "יש להזין אימייל" })}
          />

          <input
            type="password"
            placeholder="סיסמה"
            autoComplete="current-password"
            {...register("password", { required: "יש להזין סיסמה" })}
          />

          <button type="submit">התחברות</button>
        </form>

        {error && <p className="msg msg-error">{error}</p>}

        <p className="form-foot">
          עדיין אין לך חשבון? <Link to="/register">להרשמה</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
