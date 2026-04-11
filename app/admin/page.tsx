"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Login failed.");
        return;
      }
      localStorage.setItem("ih-admin-token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black-100 px-4">
      {/* Subtle grid bg */}
      <div className="pointer-events-none fixed inset-0 bg-black-100 bg-grid-white/[0.03]">
        <div className="absolute inset-0 bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / brand */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple/80 to-blue-100/60 shadow-lg shadow-purple/20">
            <FaLock className="text-xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">InfluenceHub Admin</h1>
          <p className="mt-1 text-sm text-white-200">Sign in to access the dashboard</p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl border border-white/[0.08] p-8"
          style={{ background: "linear-gradient(135deg, rgba(4,7,29,0.95) 0%, rgba(12,14,35,0.98) 100%)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2.5 block text-sm font-medium text-white-100">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white-200/50 text-sm" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@influencehub.agency"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d1117] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white-200/40 outline-none transition focus:border-purple/60 focus:ring-1 focus:ring-purple/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2.5 block text-sm font-medium text-white-100">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white-200/50 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0d1117] py-3.5 pl-11 pr-11 text-sm text-white placeholder-white-200/40 outline-none transition focus:border-purple/60 focus:ring-1 focus:ring-purple/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white-200/50 transition hover:text-white-200"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-purple/80 to-blue-100/60 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white-200/40">
            Default: admin@influencehub.agency / Admin@2024
          </p>
        </div>
      </div>
    </main>
  );
}
