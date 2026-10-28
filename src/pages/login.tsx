
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
      setError("Sign in failed. Please check your email and password.");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card form-card">
        <h1>Sign in</h1>
        <p className="subtitle">Welcome back</p>

        <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", { required: "Please enter your email" })}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Please enter a password" })}
          />

          <button type="submit">Sign in</button>
        </form>

        {error && <p className="msg msg-error">{error}</p>}

        <p className="form-foot">
          Don't have an account yet? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
