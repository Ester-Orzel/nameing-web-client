
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getErrorMessage } from "../api";
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
    } catch (err) {
      setError(getErrorMessage(err, "ההתחברות נכשלה. בדקי את האימייל והסיסמה."));
    }
  };

  return (
    <div>
      <h1>התחברות</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="אימייל"
          {...register("email", { required: "יש להזין אימייל" })}
        />

        <input
          type="password"
          placeholder="סיסמה"
          {...register("password", { required: "יש להזין סיסמה" })}
        />

        <button type="submit">התחברות</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
