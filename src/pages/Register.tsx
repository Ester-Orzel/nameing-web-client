
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const Register = () => {
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const mutation = useMutation({
    mutationFn: (data: RegisterForm) =>
      registerUser(
        data.fullName,
        data.email,
        data.phone,
        data.password
      ),
    onSuccess: (result) => {
      setUser(result.user);
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="auth-wrap">
      <div className="card form-card">
      <h1>הרשמה</h1>
      <p className="subtitle">פותחים חשבון ומתחילים לעצב מתנות</p>

      <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="שם מלא"
          {...register("fullName", {
            required: "יש להזין שם מלא",
          })}
        />
        {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}

        <input
          placeholder="אימייל"
          {...register("email", {
            required: "יש להזין אימייל",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "כתובת האימייל אינה תקינה",
            },
          })}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="טלפון"
          {...register("phone", {
            required: "יש להזין מספר טלפון",
          })}
        />
        {errors.phone && <p className="field-error">{errors.phone.message}</p>}

        <input
          type="password"
          placeholder="סיסמה"
          {...register("password", {
            required: "יש להזין סיסמה",
            minLength: {
              value: 6,
              message: "הסיסמה חייבת להכיל לפחות 6 תווים",
            },
          })}
        />
        {errors.password && <p className="field-error">{errors.password.message}</p>}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "נרשמת..." : "הרשמה"}
        </button>

        {mutation.isError && <p className="msg msg-error">{mutation.error.message}</p>}
      </form>

      <p className="form-foot">
        כבר יש לך חשבון? <Link to="/login">להתחברות</Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
