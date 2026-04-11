"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaPinterest,
  FaLinkedin,
  FaSnapchat,
  FaFacebook,
  FaTwitch,
  FaPlus,
  FaTrash,
  FaLocationArrow,
  FaCheckCircle,
} from "react-icons/fa";
import { MagicButton } from "@/components/ui/magic-button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = {
  id: string;
  platform: string;
  handle: string;
  followers: string;
  engagementRate: string;
};

type CategoryRate = {
  id: string;
  category: string;
  contentType: string;
  ratePerPost: string;
  currency: string;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  website: string;
  previousBrands: string;
  availableForCampaigns: boolean;
  availableFrom: string;
  platforms: Platform[];
  categoryRates: CategoryRate[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { value: "instagram", label: "Instagram", icon: <FaInstagram className="text-pink-400" /> },
  { value: "tiktok", label: "TikTok", icon: <FaTiktok className="text-white" /> },
  { value: "youtube", label: "YouTube", icon: <FaYoutube className="text-red-500" /> },
  { value: "twitter", label: "X / Twitter", icon: <FaTwitter className="text-sky-400" /> },
  { value: "pinterest", label: "Pinterest", icon: <FaPinterest className="text-red-400" /> },
  { value: "linkedin", label: "LinkedIn", icon: <FaLinkedin className="text-blue-400" /> },
  { value: "snapchat", label: "Snapchat", icon: <FaSnapchat className="text-yellow-300" /> },
  { value: "facebook", label: "Facebook", icon: <FaFacebook className="text-blue-500" /> },
  { value: "twitch", label: "Twitch", icon: <FaTwitch className="text-purple-400" /> },
];

const CATEGORIES = [
  "Beauty & Makeup",
  "Fashion & Style",
  "Fitness & Wellness",
  "Technology & Gadgets",
  "Lifestyle",
  "Food & Cooking",
  "Travel & Adventure",
  "Gaming",
  "Home & Interior Decor",
  "Finance & Business",
  "Parenting & Family",
  "Entertainment & Pop Culture",
  "Health & Medical",
  "Automotive",
  "Sports & Athletics",
  "Music & Arts",
  "Education & Learning",
  "Pets & Animals",
  "Sustainability & Eco",
  "DIY & Crafts",
];

const CONTENT_TYPES = [
  "Sponsored Feed Post",
  "Instagram / Facebook Story",
  "Instagram Reel",
  "TikTok Video",
  "YouTube Dedicated Video",
  "YouTube Integration (30–60 sec)",
  "Product Review",
  "Unboxing Video",
  "Tutorial / How-to",
  "Brand Mention",
  "Live Stream",
  "Pinterest Pin",
  "X / Twitter Thread",
  "Blog Post",
];

const CURRENCIES = ["USD", "EUR", "GBP", "AED", "INR", "AUD", "CAD"];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "United Arab Emirates",
  "India", "Germany", "France", "Brazil", "Mexico", "South Africa", "Nigeria",
  "Kenya", "Philippines", "Indonesia", "Pakistan", "Bangladesh", "Saudi Arabia",
  "Egypt", "Turkey", "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

const emptyPlatform = (): Platform => ({
  id: uid(), platform: "", handle: "", followers: "", engagementRate: "",
});

const emptyCategory = (): CategoryRate => ({
  id: uid(), category: "", contentType: "", ratePerPost: "", currency: "USD",
});

const initialForm = (): FormData => ({
  fullName: "", email: "", phone: "", location: "", bio: "",
  website: "", previousBrands: "", availableForCampaigns: true, availableFrom: "",
  platforms: [emptyPlatform()],
  categoryRates: [emptyCategory()],
});

// ─── Sub-components ───────────────────────────────────────────────────────────

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="mb-3 block text-sm font-medium text-white-100">
    {children}
    {required && <span className="ml-1 text-purple">*</span>}
  </label>
);

const Input = ({
  value, onChange, placeholder, type = "text", className = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; className?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full rounded-lg border border-white/10 bg-[#0d1117] px-4 py-3.5 text-sm text-white placeholder-white-200/40 outline-none transition focus:border-purple/60 focus:ring-1 focus:ring-purple/30 ${className}`}
  />
);

const Select = ({
  value, onChange, children, className = "",
}: {
  value: string; onChange: (v: string) => void;
  children: React.ReactNode; className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full rounded-lg border border-white/10 bg-[#0d1117] px-4 py-3.5 text-sm text-white outline-none transition focus:border-purple/60 focus:ring-1 focus:ring-purple/30 ${className}`}
  >
    {children}
  </select>
);

const Textarea = ({
  value, onChange, placeholder, rows = 4,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full rounded-lg border border-white/10 bg-[#0d1117] px-4 py-3.5 text-sm text-white placeholder-white-200/40 outline-none transition focus:border-purple/60 focus:ring-1 focus:ring-purple/30 resize-none"
  />
);

const SectionHeading = ({
  number, title, subtitle,
}: { number: string; title: string; subtitle: string }) => (
  <div className="mb-16 flex items-start gap-5">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] text-sm font-bold text-white">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white-200">{subtitle}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
);

const platformIcon = (value: string) =>
  PLATFORMS.find((p) => p.value === value)?.icon ?? null;

// ─── Main Component ───────────────────────────────────────────────────────────

export const InfluencerForm = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Field updaters ──
  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // ── Platform row handlers ──
  const updatePlatform = (id: string, key: keyof Platform, value: string) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
    }));

  const addPlatform = () =>
    setForm((f) => ({ ...f, platforms: [...f.platforms, emptyPlatform()] }));

  const removePlatform = (id: string) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.filter((p) => p.id !== id),
    }));

  // ── Category rate row handlers ──
  const updateCategory = (id: string, key: keyof CategoryRate, value: string) =>
    setForm((f) => ({
      ...f,
      categoryRates: f.categoryRates.map((c) => (c.id === id ? { ...c, [key]: value } : c)),
    }));

  const addCategory = () =>
    setForm((f) => ({ ...f, categoryRates: [...f.categoryRates, emptyCategory()] }));

  const removeCategory = (id: string) =>
    setForm((f) => ({
      ...f,
      categoryRates: f.categoryRates.filter((c) => c.id !== id),
    }));

  // ── Validation ──
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email is required.";
    if (!form.location) e.location = "Please select your country.";
    if (form.platforms.some((p) => !p.platform || !p.handle))
      e.platforms = "Each platform row must have a platform and handle.";
    if (form.categoryRates.some((c) => !c.category || !c.contentType || !c.ratePerPost))
      e.categoryRates = "Each rate row must have a category, content type, and rate.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Send to API route
    await fetch("/api/influencer-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  // ─── Success State ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-purple/20" />
          <FaCheckCircle className="text-6xl text-purple" />
        </div>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          You&apos;re on our radar!
        </h2>
        <p className="max-w-md text-white-200">
          Thanks for applying. Our team reviews every submission and will reach out within{" "}
          <span className="text-purple font-semibold">2–3 business days</span> if there&apos;s a
          campaign match for you.
        </p>
        <button
          onClick={() => { setForm(initialForm()); setSubmitted(false); }}
          className="mt-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-white-100 transition hover:bg-white/10"
        >
          Submit another application
        </button>
      </div>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">

      {/* ── Section 1: Personal Info ── */}
      <SectionHeading
        number="1"
        title="Personal Information"
        subtitle="Tell us who you are so we can match you to the right campaigns."
      />

      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <Label required>Full Name</Label>
          <Input
            value={form.fullName}
            onChange={(v) => setField("fullName", v)}
            placeholder="Jane Doe"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div>
          <Label required>Email Address</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(v) => setField("email", v)}
            placeholder="jane@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(v) => setField("phone", v)}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div>
          <Label required>Country / Location</Label>
          <Select value={form.location} onChange={(v) => setField("location", v)}>
            <option value="" disabled>Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location}</p>}
        </div>
      </div>

      <div className="mt-14">
        <Label>Short Bio</Label>
        <Textarea
          value={form.bio}
          onChange={(v) => setField("bio", v)}
          placeholder="Tell us about yourself, your audience, and the kind of content you create..."
          rows={3}
        />
      </div>

      <Divider />

      {/* ── Section 2: Social Platforms ── */}
      <SectionHeading
        number="2"
        title="Social Media Platforms"
        subtitle="Add each platform you're active on. You can list as many as you like."
      />

      {errors.platforms && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {errors.platforms}
        </p>
      )}

      <div className="space-y-8">
        {form.platforms.map((row, idx) => (
          <div
            key={row.id}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a0e1a] to-[#0d1120] px-8 pb-9 pt-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-[#0d1117] px-3 py-0.5 text-xs text-white-200">
                Platform {idx + 1}
              </span>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => removePlatform(row.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/20"
                >
                  <FaTrash className="text-[10px]" /> Remove
                </button>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label required>Platform</Label>
                <div className="relative">
                  <Select
                    value={row.platform}
                    onChange={(v) => updatePlatform(row.id, "platform", v)}
                  >
                    <option value="" disabled>Select platform</option>
                    {PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </Select>
                  {row.platform && (
                    <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2">
                      {platformIcon(row.platform)}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label required>Handle / Username</Label>
                <Input
                  value={row.handle}
                  onChange={(v) => updatePlatform(row.id, "handle", v)}
                  placeholder="@yourhandle"
                />
              </div>

              <div>
                <Label>Followers / Subscribers</Label>
                <Input
                  type="number"
                  value={row.followers}
                  onChange={(v) => updatePlatform(row.id, "followers", v)}
                  placeholder="e.g. 150000"
                />
              </div>

              <div>
                <Label>Avg. Engagement Rate (%)</Label>
                <Input
                  type="number"
                  value={row.engagementRate}
                  onChange={(v) => updatePlatform(row.id, "engagementRate", v)}
                  placeholder="e.g. 4.5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPlatform}
        className="mt-8 flex items-center gap-2 rounded-lg border border-purple/30 bg-purple/10 px-5 py-3 text-sm font-medium text-purple transition hover:bg-purple/20"
      >
        <FaPlus className="text-xs" /> Add another platform
      </button>

      <Divider />

      {/* ── Section 3: Content Categories & Rates ── */}
      <SectionHeading
        number="3"
        title="Content Categories & Rates"
        subtitle="Set your rate for each content category and type you offer. You can add multiple."
      />

      {errors.categoryRates && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {errors.categoryRates}
        </p>
      )}

      <div className="space-y-8">
        {form.categoryRates.map((row, idx) => (
          <div
            key={row.id}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a0e1a] to-[#0d1120] px-8 pb-9 pt-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full border border-white/10 bg-[#0d1117] px-3 py-0.5 text-xs text-white-200">
                Rate {idx + 1}
              </span>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => removeCategory(row.id)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/20"
                >
                  <FaTrash className="text-[10px]" /> Remove
                </button>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label required>Content Category</Label>
                <Select
                  value={row.category}
                  onChange={(v) => updateCategory(row.id, "category", v)}
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label required>Content / Deliverable Type</Label>
                <Select
                  value={row.contentType}
                  onChange={(v) => updateCategory(row.id, "contentType", v)}
                >
                  <option value="" disabled>Select content type</option>
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </div>

              <div>
                <Label required>Rate per Deliverable</Label>
                <Input
                  type="number"
                  value={row.ratePerPost}
                  onChange={(v) => updateCategory(row.id, "ratePerPost", v)}
                  placeholder="e.g. 500"
                />
              </div>

              <div>
                <Label>Currency</Label>
                <Select
                  value={row.currency}
                  onChange={(v) => updateCategory(row.id, "currency", v)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCategory}
        className="mt-8 flex items-center gap-2 rounded-lg border border-purple/30 bg-purple/10 px-5 py-3 text-sm font-medium text-purple transition hover:bg-purple/20"
      >
        <FaPlus className="text-xs" /> Add another category / rate
      </button>

      <Divider />

      {/* ── Section 4: Portfolio & Availability ── */}
      <SectionHeading
        number="4"
        title="Portfolio & Availability"
        subtitle="Share your previous work and let us know when you're ready to collaborate."
      />

      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <Label>Website / Media Kit URL</Label>
          <Input
            type="url"
            value={form.website}
            onChange={(v) => setField("website", v)}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <Label>Earliest Campaign Start Date</Label>
          <Input
            type="date"
            value={form.availableFrom}
            onChange={(v) => setField("availableFrom", v)}
          />
        </div>
      </div>

      <div className="mt-14">
        <Label>Previous Brand Collaborations</Label>
        <Textarea
          value={form.previousBrands}
          onChange={(v) => setField("previousBrands", v)}
          placeholder="List any brands you've worked with before (e.g. Nike, L'Oréal, Samsung)..."
          rows={3}
        />
      </div>

      <div className="mt-12 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setField("availableForCampaigns", !form.availableForCampaigns)}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
            form.availableForCampaigns ? "bg-purple" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
              form.availableForCampaigns ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm text-white-100">
          I&apos;m currently{" "}
          <span className={form.availableForCampaigns ? "text-purple font-semibold" : "text-white-200"}>
            {form.availableForCampaigns ? "available" : "unavailable"}
          </span>{" "}
          for brand campaigns
        </span>
      </div>

      <Divider />

      {/* ── Submit ── */}
      <div className="flex flex-col items-center gap-6 pt-8">
        <p className="text-center text-xs text-white-200 max-w-sm leading-relaxed">
          By submitting you agree to be contacted by InfluenceHub regarding campaign
          opportunities. We never share your data with third parties.
        </p>

        <div className="w-full max-w-xs">
          <MagicButton
            title={submitting ? "Submitting…" : "Submit Application"}
            icon={<FaLocationArrow />}
            position="right"
            handleClick={() => {}}
          />
        </div>
      </div>
    </form>
  );
};
