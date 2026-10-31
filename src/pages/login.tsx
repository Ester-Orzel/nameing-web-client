
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
    <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-line bg-white p-8 shadow-card max-sm:p-5">
      <h1 className="text-center text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)]">התחברות</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
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

        <button type="submit" className="mt-2 w-full">התחברות</button>
      </form>

      {error && <p className="mt-3 rounded-[10px] bg-bad-bg px-4 py-3 font-semibold text-bad">{error}</p>}

      <p className="mt-5 border-t border-line pt-4 text-center">
        עוד אין לך חשבון? <Link to="/register" className="font-bold underline underline-offset-4">להרשמה</Link>
      </p>
    </div>
  );
};

export default Login;
