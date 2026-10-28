
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useUser } from "../context/UserContext";

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
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

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
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "נרשמת..." : "הרשמה"}
        </button>

        {mutation.isError && <p>{mutation.error.message}</p>}
      </form>
    </div>
  );
};

export default Register;
