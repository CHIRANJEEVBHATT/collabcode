import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "@/services/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }

    try {
      await login(username.trim(), password);
      toast.success("Logged in");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Login</h2>

        <input className="w-full mb-3 p-3" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="w-full mb-3 p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

        <button className="w-full rounded bg-blue-600 p-3">Login</button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-blue-400 underline">Sign up</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
