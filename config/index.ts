import type { Metadata } from "next";

export const links = {
  sourceCode: "https://github.com/influencehub",
  ownerName: "InfluenceHub",
  ownerEmail: "hello@influencehub.agency",
} as const;

export const siteConfig: Metadata = {
  title: "InfluenceHub — Influencer Marketing Agency",
  description:
    "Full-service influencer marketing agency connecting brands with the world's top creators across Instagram, TikTok, YouTube, and more.",
  keywords: [
    "influencer marketing",
    "influencer agency",
    "brand partnerships",
    "content creators",
    "social media marketing",
    "TikTok marketing",
    "Instagram influencers",
    "YouTube campaigns",
    "influencer campaigns",
    "brand collaborations",
    "creator economy",
    "digital marketing",
    "social media strategy",
    "ROI-driven marketing",
    "influencer outreach",
  ] as Array<string>,
  authors: {
    name: links.ownerName,
    url: "https://influencehub.agency",
  },
} as const;
