
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
    <div className="flex justify-center pt-4">
      <div className="card w-full max-w-[460px] [&_h1]:mb-1 [&_h1]:text-center [&_h1]:text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)]">
      <h1>Sign up</h1>
      <p className="mb-6 text-center text-muted">Create an account and start designing gifts</p>

      <form className="flex flex-col gap-3.5 [&_button[type=submit]]:mt-2 [&_button[type=submit]]:w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Full name"
          {...register("fullName", {
            required: "Please enter your full name",
          })}
        />
        {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}

        <input
          placeholder="Email"
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}

        <input
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "Please enter a phone number",
          })}
        />
        {errors.phone && <p className="field-error">{errors.phone.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Please enter a password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="field-error">{errors.password.message}</p>}

        <button className="btn" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account..." : "Sign up"}
        </button>

        {mutation.isError && <p className="msg-error">{mutation.error.message}</p>}
      </form>

      <p className="mt-5 text-center text-[0.95rem] text-muted [&_a]:font-bold">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
