"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { ApplicationRecord, ApplicationStatus } from "@/lib/admin-store";
import {
  FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaPinterest,
  FaLinkedin, FaSnapchat, FaFacebook, FaTwitch,
  FaSignOutAlt, FaSearch, FaChevronDown, FaChevronUp,
  FaGlobe, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTimes,
} from "react-icons/fa";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string; bg: string; dot: string }> = {
  new:       { label: "New",       color: "text-blue-300",   bg: "bg-blue-500/10 border-blue-500/30",   dot: "bg-blue-400" },
  reviewed:  { label: "Reviewed",  color: "text-yellow-300", bg: "bg-yellow-500/10 border-yellow-500/30", dot: "bg-yellow-400" },
  contacted: { label: "Contacted", color: "text-green-300",  bg: "bg-green-500/10 border-green-500/30",  dot: "bg-green-400" },
  rejected:  { label: "Rejected",  color: "text-red-400",    bg: "bg-red-500/10 border-red-500/30",      dot: "bg-red-400" },
};

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <FaInstagram className="text-pink-400" />,
  tiktok:    <FaTiktok className="text-white" />,
  youtube:   <FaYoutube className="text-red-500" />,
  twitter:   <FaTwitter className="text-sky-400" />,
  pinterest: <FaPinterest className="text-red-400" />,
  linkedin:  <FaLinkedin className="text-blue-400" />,
  snapchat:  <FaSnapchat className="text-yellow-300" />,
  facebook:  <FaFacebook className="text-blue-500" />,
  twitch:    <FaTwitch className="text-purple-400" />,
};

const ALL_STATUSES: ApplicationStatus[] = ["new", "reviewed", "contacted", "rejected"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: string) => {
  const v = parseInt(n, 10);
  if (isNaN(v)) return n;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + "K";
  return v.toString();
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const totalFollowers = (app: ApplicationRecord) =>
  app.platforms.reduce((s, p) => s + (parseInt(p.followers, 10) || 0), 0);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) => (
  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5">
    <p className="text-xs text-white-200">{label}</p>
    <p className={`mt-1.5 text-2xl font-bold ${color}`}>{value}</p>
    {sub && <p className="mt-0.5 text-xs text-white-200/60">{sub}</p>}
  </div>
);

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailModal = ({
  app,
  onClose,
  onStatusChange,
}: {
  app: ApplicationRecord;
  onClose: () => void;
  onStatusChange: (id: string, s: ApplicationStatus) => void;
}) => {
  const s = STATUS_CONFIG[app.status];
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/[0.08] p-8"
        style={{ background: "linear-gradient(135deg,rgba(4,7,29,0.98) 0%,rgba(12,14,35,1) 100%)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white-200 transition hover:bg-white/10"
        >
          <FaTimes className="text-xs" />
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple/20 text-2xl font-bold text-purple">
            {app.fullName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white">{app.fullName}</h2>
            <p className="text-sm text-white-200">{app.location} · Applied {fmtDate(app.submittedAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(app.id, st)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  app.status === st
                    ? `${STATUS_CONFIG[st].bg} ${STATUS_CONFIG[st].color}`
                    : "border-white/10 bg-white/5 text-white-200 hover:bg-white/10"
                }`}
              >
                {STATUS_CONFIG[st].label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <a href={`mailto:${app.email}`} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white-200 transition hover:bg-white/[0.07]">
            <FaEnvelope className="shrink-0 text-purple" /> <span className="truncate">{app.email}</span>
          </a>
          {app.phone && (
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white-200">
              <FaPhone className="shrink-0 text-purple" /> {app.phone}
            </div>
          )}
          {app.website && (
            <a href={app.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white-200 transition hover:bg-white/[0.07]">
              <FaGlobe className="shrink-0 text-purple" /> <span className="truncate">Portfolio</span>
              <FaExternalLinkAlt className="ml-auto shrink-0 text-xs text-white-200/40" />
            </a>
          )}
        </div>

        {/* Bio */}
        {app.bio && (
          <div className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-white-200">
            {app.bio}
          </div>
        )}

        {/* Platforms */}
        <h3 className="mb-3 text-sm font-semibold text-white">Platforms</h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {app.platforms.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <span className="text-lg">{PLATFORM_ICONS[p.platform] ?? <FaGlobe />}</span>
              <div>
                <p className="text-sm font-medium text-white">{p.handle}</p>
                <p className="text-xs text-white-200">{fmt(p.followers)} followers · {p.engagementRate}% eng.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rates */}
        <h3 className="mb-3 text-sm font-semibold text-white">Content Rates</h3>
        <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white-200">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white-200">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white-200">Rate</th>
              </tr>
            </thead>
            <tbody>
              {app.categoryRates.map((r, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0">
                  <td className="px-4 py-3 text-white">{r.category}</td>
                  <td className="px-4 py-3 text-white-200">{r.contentType}</td>
                  <td className="px-4 py-3 text-right font-semibold text-purple">{r.currency} {r.ratePerPost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Extra */}
        <div className="grid gap-4 sm:grid-cols-2 text-sm">
          {app.previousBrands && (
            <div>
              <p className="mb-1 text-xs font-semibold text-white-200">Previous Brands</p>
              <p className="text-white">{app.previousBrands}</p>
            </div>
          )}
          <div>
            <p className="mb-1 text-xs font-semibold text-white-200">Availability</p>
            <p className={app.availableForCampaigns ? "text-green-400" : "text-red-400"}>
              {app.availableForCampaigns ? "Available for campaigns" : "Not currently available"}
              {app.availableFrom && ` · From ${fmtDate(app.availableFrom)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [apps, setApps] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<ApplicationRecord | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [availFilter, setAvailFilter] = useState<"all" | "yes" | "no">("all");
  const [sortBy, setSortBy] = useState<"date" | "followers" | "name">("date");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  // ── Auth + fetch ──
  useEffect(() => {
    const token = localStorage.getItem("ih-admin-token");
    if (!token) { router.push("/admin"); return; }

    fetch("/api/admin/applications", { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) { setError("Failed to load applications."); return; }
        setApps(d.data);
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("ih-admin-token");
    router.push("/admin");
  };

  // ── Status update ──
  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const token = localStorage.getItem("ih-admin-token") ?? "";
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
    }
  };

  // ── Derived lists ──
  const allPlatforms = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => a.platforms.forEach((p) => set.add(p.platform)));
    return Array.from(set).sort();
  }, [apps]);

  const allLocations = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => a.location && set.add(a.location));
    return Array.from(set).sort();
  }, [apps]);

  const filtered = useMemo(() => {
    let list = [...apps];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.fullName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.platforms.some((p) => p.handle.toLowerCase().includes(q)) ||
          a.categoryRates.some((r) => r.category.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "all") list = list.filter((a) => a.status === statusFilter);
    if (platformFilter !== "all") list = list.filter((a) => a.platforms.some((p) => p.platform === platformFilter));
    if (locationFilter !== "all") list = list.filter((a) => a.location === locationFilter);
    if (availFilter === "yes") list = list.filter((a) => a.availableForCampaigns);
    if (availFilter === "no") list = list.filter((a) => !a.availableForCampaigns);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") cmp = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      if (sortBy === "followers") cmp = totalFollowers(a) - totalFollowers(b);
      if (sortBy === "name") cmp = a.fullName.localeCompare(b.fullName);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return list;
  }, [apps, search, statusFilter, platformFilter, locationFilter, availFilter, sortBy, sortDir]);

  // ── Stats ──
  const stats = useMemo(() => ({
    total: apps.length,
    new: apps.filter((a) => a.status === "new").length,
    contacted: apps.filter((a) => a.status === "contacted").length,
    available: apps.filter((a) => a.availableForCampaigns).length,
  }), [apps]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortBy(col); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortBy }) =>
    sortBy === col
      ? sortDir === "desc" ? <FaChevronDown className="text-purple text-[10px]" /> : <FaChevronUp className="text-purple text-[10px]" />
      : <FaChevronDown className="text-white-200/30 text-[10px]" />;

  // ── Render ──
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black-100">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple border-t-transparent" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black-100 text-red-400">
        {error}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black-100 text-white">
      {/* ── Top nav ── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black-100/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple/80 to-blue-100/60">
              <span className="text-xs font-bold text-white">IH</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">InfluenceHub</p>
              <p className="text-[10px] text-white-200">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white-200 transition hover:bg-white/10"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">

        {/* ── Stats row ── */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Applications" value={stats.total} color="text-white" />
          <StatCard label="New" value={stats.new} sub="awaiting review" color="text-blue-300" />
          <StatCard label="Contacted" value={stats.contacted} sub="in progress" color="text-green-400" />
          <StatCard label="Available Now" value={stats.available} sub="ready for campaigns" color="text-purple" />
        </div>

        {/* ── Filters ── */}
        <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white-200/40 text-xs" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, platform, category…"
                className="w-full rounded-xl border border-white/10 bg-[#0d1117] py-2.5 pl-9 pr-4 text-sm text-white placeholder-white-200/40 outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
              className="rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none focus:border-purple/50"
            >
              <option value="all">All Statuses</option>
              {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
            </select>

            {/* Platform */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none focus:border-purple/50"
            >
              <option value="all">All Platforms</option>
              {allPlatforms.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>

            {/* Location */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none focus:border-purple/50"
            >
              <option value="all">All Locations</option>
              {allLocations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            {/* Availability */}
            <select
              value={availFilter}
              onChange={(e) => setAvailFilter(e.target.value as "all" | "yes" | "no")}
              className="rounded-xl border border-white/10 bg-[#0d1117] px-3 py-2.5 text-sm text-white outline-none focus:border-purple/50"
            >
              <option value="all">All Availability</option>
              <option value="yes">Available</option>
              <option value="no">Unavailable</option>
            </select>
          </div>

          {/* Active filter count */}
          <div className="mt-3 flex items-center gap-2 text-xs text-white-200">
            <span>{filtered.length} of {apps.length} influencers</span>
            {(search || statusFilter !== "all" || platformFilter !== "all" || locationFilter !== "all" || availFilter !== "all") && (
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); setPlatformFilter("all"); setLocationFilter("all"); setAvailFilter("all"); }}
                className="ml-1 rounded px-2 py-0.5 text-red-400 hover:bg-red-500/10 transition"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                  <th className="px-5 py-3.5 text-left">
                    <button onClick={() => toggleSort("name")} className="flex items-center gap-1.5 text-xs font-semibold text-white-200 hover:text-white">
                      Influencer <SortIcon col="name" />
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white-200">Platforms</th>
                  <th className="px-5 py-3.5 text-left">
                    <button onClick={() => toggleSort("followers")} className="flex items-center gap-1.5 text-xs font-semibold text-white-200 hover:text-white">
                      Reach <SortIcon col="followers" />
                    </button>
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white-200">Location</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white-200">Category</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white-200">Avail.</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-white-200">Status</th>
                  <th className="px-5 py-3.5 text-left">
                    <button onClick={() => toggleSort("date")} className="flex items-center gap-1.5 text-xs font-semibold text-white-200 hover:text-white">
                      Date <SortIcon col="date" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center text-sm text-white-200">
                      No influencers match the current filters.
                    </td>
                  </tr>
                )}
                {filtered.map((app) => {
                  const s = STATUS_CONFIG[app.status];
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelected(app)}
                      className="cursor-pointer border-b border-white/[0.04] transition hover:bg-white/[0.03] last:border-0"
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple/20 text-sm font-bold text-purple">
                            {app.fullName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-white">{app.fullName}</p>
                            <p className="text-xs text-white-200">{app.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Platforms */}
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5">
                          {app.platforms.map((p, i) => (
                            <span key={i} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm">
                              {PLATFORM_ICONS[p.platform] ?? <FaGlobe className="text-white-200" />}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Reach */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white">{fmt(totalFollowers(app).toString())}</span>
                        <p className="text-xs text-white-200">{app.platforms.length} platform{app.platforms.length > 1 ? "s" : ""}</p>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 text-white-200">{app.location}</td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-block max-w-[140px] truncate rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white-200">
                          {app.categoryRates[0]?.category ?? "—"}
                        </span>
                        {app.categoryRates.length > 1 && (
                          <span className="ml-1 text-xs text-white-200/50">+{app.categoryRates.length - 1}</span>
                        )}
                      </td>

                      {/* Availability */}
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium ${app.availableForCampaigns ? "text-green-400" : "text-white-200/50"}`}>
                          {app.availableForCampaigns ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${s.bg} ${s.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs text-white-200">
                        {fmtDate(app.submittedAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Detail modal ── */}
      {selected && (
        <DetailModal
          app={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </main>
  );
}
