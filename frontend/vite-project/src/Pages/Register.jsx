import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", form);
      alert("Registration success");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button className="bg-black text-white p-2 rounded">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;