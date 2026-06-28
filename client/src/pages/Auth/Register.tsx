import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "@/services/auth";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in username and password");
      return;
    }

    if (email.trim() && !email.includes("@")) {
      toast.error("Please enter a valid email address with @");
      return;
    }

    try {
      await register(username.trim(), password, email.trim() || undefined);
      toast.success("Registered");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Register failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Register</h2>

        <input className="w-full mb-3 p-3" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="w-full mb-3 p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input className="w-full mb-3 p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

        <button className="w-full rounded bg-blue-600 p-3">Register</button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
