import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Campaigns", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
  { name: "Join as Creator", link: "/apply" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "We build authentic partnerships between brands and creators",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.jpg",
    spareImg: "",
  },
  {
    id: 2,
    title: "We manage influencer campaigns across every time zone, globally",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Our platforms",
    description: "Where your brand comes alive",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Data-driven strategies that deliver measurable ROI for your brand.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Currently managing 50+ active brand campaigns",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.jpg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Ready to grow your brand with influencer marketing?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "GlowUp Beauty — Viral TikTok Campaign",
    des: "Generated 28M impressions and 4.2M in product sales through a network of 120 beauty micro-influencers across TikTok and Instagram Reels.",
    img: "/p1.jpg",
    iconLists: ["/tiktok.svg", "/instagram.svg", "/youtube.svg", "/meta.svg", "/snapchat.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 2,
    title: "NovaTech — Product Launch Campaign",
    des: "Orchestrated a multi-platform influencer launch driving 1.8M pre-orders in 72 hours, partnering with 35 tech creators on YouTube and Twitter.",
    img: "/p2.jpg",
    iconLists: ["/youtube.svg", "/twitter.svg", "/tiktok.svg", "/linkedin.svg", "/meta.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 3,
    title: "ActiveFuel — Fitness Brand Awareness",
    des: "Built brand authority in the fitness space through 90 athlete and wellness creators, achieving 300% YoY growth in Instagram following.",
    img: "/p3.jpg",
    iconLists: ["/instagram.svg", "/youtube.svg", "/twitter.svg", "/tiktok.svg", "/pinterest.svg"],
    link: "#",
    sourceCode: "#",
  },
  {
    id: 4,
    title: "LuxeHome — Lifestyle Influencer Series",
    des: "Drove a 5x increase in site traffic through a curated lifestyle creator series across Pinterest, Instagram, and YouTube — delivering a 380% ROAS.",
    img: "/p4.jpg",
    iconLists: ["/pinterest.svg", "/instagram.svg", "/youtube.svg", "/tiktok.svg", "/meta.svg"],
    link: "#",
    sourceCode: "#",
  },
] as const;

export const testimonials = [
  {
    quote: `Working with ${links.ownerName} completely transformed our brand's social presence. Their creator matchmaking is unmatched — every influencer felt genuinely aligned with our product. The campaign ROI exceeded all our projections.`,
    name: "Sarah Mitchell",
    title: "Head of Marketing, GlowUp Beauty",
    img: "/profile1.jpg",
  },
  {
    quote: `${links.ownerName} handled every aspect of our influencer launch flawlessly. From strategy to execution, they brought in the right voices at the right time. We saw record-breaking pre-order numbers in our first 72 hours.`,
    name: "James Okafor",
    title: "VP of Growth, NovaTech",
    img: "/profile2.jpg",
  },
  {
    quote: `The team at ${links.ownerName} doesn't just find influencers — they build campaigns with purpose. Our brand authenticity scores went through the roof, and our community has never been more engaged.`,
    name: "Priya Sharma",
    title: "Brand Director, ActiveFuel",
    img: "/profile3.jpg",
  },
  {
    quote: `We tried managing influencer marketing in-house and it was chaos. Partnering with ${links.ownerName} was the best decision we made. They streamlined everything and the results spoke for themselves — 5x traffic, 380% ROAS.`,
    name: "Carlos Rivera",
    title: "CEO, LuxeHome Interiors",
    img: "/profile4.jpg",
  },
  {
    quote: `${links.ownerName} gave us access to a creator network we could never have built on our own. Their reporting is transparent, their team is proactive, and the campaigns genuinely move the needle for our business.`,
    name: "Emily Chen",
    title: "CMO, Velora Skincare",
    img: "/profile5.jpg",
  },
] as const;

export const companies = [
  {
    id: 1,
    name: "Meta",
    img: "/meta.svg",
    nameImg: "/metaName.svg",
  },
  {
    id: 2,
    name: "TikTok",
    img: "/tiktok.svg",
    nameImg: "/tiktokName.svg",
  },
  {
    id: 3,
    name: "YouTube",
    img: "/youtube.svg",
    nameImg: "/youtubeName.svg",
  },
  {
    id: 4,
    name: "Snapchat",
    img: "/snapchat.svg",
    nameImg: "/snapchatName.svg",
  },
  {
    id: 5,
    name: "Pinterest",
    img: "/pinterest.svg",
    nameImg: "/pinterestName.svg",
  },
] as const;

export const workExperience = [
  {
    id: 1,
    title: "Influencer Sourcing & Vetting",
    desc: "We identify and vet creators across every niche — from mega-influencers to micro and nano creators — ensuring authentic brand alignment and audience quality.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Campaign Strategy & Planning",
    desc: "We craft data-backed influencer strategies tailored to your goals — whether it's brand awareness, product launches, or driving direct conversions.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Content Creation & Management",
    desc: "We coordinate end-to-end content production with creators, ensuring on-brand messaging, creative freedom, and on-time delivery across all platforms.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Analytics & Performance Reporting",
    desc: "We track every metric that matters — reach, engagement, conversions, and ROAS — delivering transparent reports so you always know your campaign's impact.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
] as const;

export const socialMedia = [
  {
    name: "Instagram",
    img: "/instagram.svg",
    link: "https://instagram.com/influencehub",
  },
  {
    name: "TikTok",
    img: "/tiktok.svg",
    link: "https://tiktok.com/@influencehub",
  },
  {
    name: "LinkedIn",
    img: "/linkedin.svg",
    link: "https://linkedin.com/company/influencehub",
  },
] as const;

export const techStack = {
  stack1: ["Instagram", "TikTok", "YouTube"],
  stack2: ["Twitter/X", "Pinterest", "LinkedIn"],
} as const;
