
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser, getErrorMessage } from "../api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const Register = () => {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

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
    // אחרי הרשמה מוצלחת המשתמשת מחוברת מיד (שומרים גם את הטוקן) ועוברת לדף הבית
    onSuccess: (result) => {
      setUser(result.user);
      setToken(result.token);
      navigate("/");
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>הרשמה</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="שם מלא"
          {...register("fullName", {
            required: "יש להזין שם מלא",
          })}
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}

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
        {errors.email && <p>{errors.email.message}</p>}

        <input
          placeholder="טלפון"
          {...register("phone", {
            required: "יש להזין מספר טלפון",
            // כמו בשרת: 9-10 ספרות שמתחילות ב־0 (מקפים ורווחים מותרים)
            validate: (value) =>
              /^0\d{8,9}$/.test(value.replace(/[\s-]/g, "")) ||
              "מספר טלפון לא תקין (למשל 0501234567)",
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <input
          type="password"
          placeholder="סיסמה"
          {...register("password", {
            required: "יש להזין סיסמה",
            // כמו בשרת: לפחות 8 תווים, אות אחת וספרה אחת
            minLength: {
              value: 8,
              message: "הסיסמה חייבת להכיל לפחות 8 תווים",
            },
            validate: (value) =>
              (/[A-Za-zא-ת]/.test(value) && /\d/.test(value)) ||
              "הסיסמה חייבת להכיל לפחות אות אחת וספרה אחת",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "נרשמת..." : "הרשמה"}
        </button>

        {mutation.isError && <p>{getErrorMessage(mutation.error)}</p>}
      </form>
    </div>
  );
};

export default Register;
