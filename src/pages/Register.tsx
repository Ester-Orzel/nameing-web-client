
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
      <h1>Sign up</h1>
      <p className="subtitle">Create an account and start designing gifts</p>

      <form className="form-stack" onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account..." : "Sign up"}
        </button>

        {mutation.isError && <p className="msg msg-error">{mutation.error.message}</p>}
      </form>

      <p className="form-foot">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
