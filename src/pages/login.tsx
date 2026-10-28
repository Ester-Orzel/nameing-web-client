
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
    <div className="flex justify-center pt-4">
      <div className="card w-full max-w-[460px] [&_h1]:mb-1 [&_h1]:text-center [&_h1]:text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)]">
        <h1>Sign in</h1>
        <p className="mb-6 text-center text-muted">Welcome back</p>

        <form className="flex flex-col gap-3.5 [&_button[type=submit]]:mt-2 [&_button[type=submit]]:w-full" onSubmit={handleSubmit(onSubmit)}>
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

          <button className="btn" type="submit">Sign in</button>
        </form>

        {error && <p className="msg-error">{error}</p>}

        <p className="mt-5 text-center text-[0.95rem] text-muted [&_a]:font-bold">
          Don't have an account yet? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
