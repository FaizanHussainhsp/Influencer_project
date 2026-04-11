import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { InfluencerForm } from "@/components/influencer-form";
import { Spotlight } from "@/components/ui/spotlight";

// ─── Page metadata ────────────────────────────────────────────────────────────
export const metadata = {
  title: "Influencer Application — InfluenceHub",
  description:
    "Join InfluenceHub's creator network. Submit your profile, platforms, and rates to get matched with top brand campaigns.",
};

// ─── Static stat cards ────────────────────────────────────────────────────────
const STATS = [
  { value: "10,000+", label: "Creators in our network" },
  { value: "500+", label: "Brand campaigns launched" },
  { value: "98%", label: "Creator satisfaction rate" },
  { value: "$2M+", label: "Paid out to creators" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  return (
    <main className="relative min-h-screen overflow-clip bg-black-100 px-5 sm:px-10">
      {/* Spotlights */}
      <Spotlight className="-left-10 -top-40 h-screen md:-left-32 md:-top-20" fill="white" />
      <Spotlight className="left-full top-10 h-[80vh] w-[50vw]" fill="purple" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />

      {/* Grid background */}
      <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black-100 bg-grid-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl py-16">

        {/* ── Back link ── */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white-200 transition hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to InfluenceHub
        </Link>

        {/* ── Hero header ── */}
        <div className="mb-14 text-center">
          {/* Platform icons */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white">
              <FaInstagram />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white border border-white/20">
              <FaTiktok />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
              <FaYoutube />
            </span>
          </div>

          <p className="mb-3 text-xs uppercase tracking-widest text-blue-100">
            Influencer Creator Network
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Join Our{" "}
            <span className="bg-gradient-to-r from-purple to-blue-100 bg-clip-text text-transparent">
              Creator Network
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-white-200 md:text-lg">
            Tell us about your platforms, audience, and rates. We&apos;ll match you with brand
            campaigns that fit your niche — at the rates you deserve.
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div className="mb-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 text-center"
            >
              <span className="text-2xl font-bold text-purple md:text-3xl">{s.value}</span>
              <span className="mt-1 text-xs text-white-200">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Form card ── */}
        <div
          className="rounded-3xl border border-white/[0.08] p-6 md:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(4,7,29,0.9) 0%, rgba(12,14,35,0.95) 100%)",
          }}
        >
          <InfluencerForm />
        </div>

        {/* ── Footer note ── */}
        <p className="mt-14 text-center text-xs text-white-200/50">
          © {new Date().getFullYear()} InfluenceHub Agency — All creator data is kept private and
          secure.
        </p>
      </div>
    </main>
  );
}
