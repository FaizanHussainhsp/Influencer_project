// ─── Types ────────────────────────────────────────────────────────────────────

export type Platform = {
  platform: string;
  handle: string;
  followers: string;
  engagementRate: string;
};

export type CategoryRate = {
  category: string;
  contentType: string;
  ratePerPost: string;
  currency: string;
};

export type ApplicationStatus = "new" | "reviewed" | "contacted" | "rejected";

export type ApplicationRecord = {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
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

// ─── Mock seed data ───────────────────────────────────────────────────────────

const MOCK_DATA: ApplicationRecord[] = [
  {
    id: "mock-001",
    submittedAt: "2026-04-01T09:15:00Z",
    status: "new",
    fullName: "Sophia Martins",
    email: "sophia@creatormail.com",
    phone: "+1 310 555 0182",
    location: "United States",
    bio: "Lifestyle & beauty creator with 5 years of content creation. Focused on authentic storytelling and high-engagement Reels.",
    website: "https://sophiamartins.com",
    previousBrands: "Fenty Beauty, Revolve, ASOS",
    availableForCampaigns: true,
    availableFrom: "2026-04-15",
    platforms: [
      { platform: "instagram", handle: "@sophiamartins", followers: "320000", engagementRate: "4.8" },
      { platform: "tiktok", handle: "@sophiamartins", followers: "185000", engagementRate: "6.2" },
    ],
    categoryRates: [
      { category: "Beauty & Makeup", contentType: "Instagram Reel", ratePerPost: "2800", currency: "USD" },
      { category: "Fashion & Style", contentType: "Sponsored Feed Post", ratePerPost: "2200", currency: "USD" },
    ],
  },
  {
    id: "mock-002",
    submittedAt: "2026-04-02T11:30:00Z",
    status: "contacted",
    fullName: "James Osei",
    email: "james@techcreator.io",
    phone: "+44 7700 900123",
    location: "United Kingdom",
    bio: "Tech reviewer and gadget enthusiast. My audience trusts my honest, detailed reviews before making purchase decisions.",
    website: "https://youtube.com/@jamesosei",
    previousBrands: "Samsung, Logitech, Anker",
    availableForCampaigns: true,
    availableFrom: "2026-04-10",
    platforms: [
      { platform: "youtube", handle: "@jamesosei", followers: "890000", engagementRate: "5.1" },
      { platform: "twitter", handle: "@jamesosei_tech", followers: "42000", engagementRate: "3.4" },
    ],
    categoryRates: [
      { category: "Technology & Gadgets", contentType: "YouTube Dedicated Video", ratePerPost: "6500", currency: "GBP" },
      { category: "Technology & Gadgets", contentType: "YouTube Integration (30–60 sec)", ratePerPost: "3200", currency: "GBP" },
    ],
  },
  {
    id: "mock-003",
    submittedAt: "2026-04-03T08:00:00Z",
    status: "reviewed",
    fullName: "Priya Nair",
    email: "priya.nair@fitlife.in",
    phone: "+91 98765 43210",
    location: "India",
    bio: "Certified fitness coach & wellness influencer. I help my audience build sustainable healthy habits through relatable content.",
    website: "https://priyafitlife.in",
    previousBrands: "Cult.fit, Wellbeing Nutrition, Puma India",
    availableForCampaigns: true,
    availableFrom: "2026-05-01",
    platforms: [
      { platform: "instagram", handle: "@priyanair_fit", followers: "156000", engagementRate: "7.3" },
      { platform: "youtube", handle: "@priyafitlife", followers: "74000", engagementRate: "4.9" },
    ],
    categoryRates: [
      { category: "Fitness & Wellness", contentType: "Sponsored Feed Post", ratePerPost: "45000", currency: "INR" },
      { category: "Health & Medical", contentType: "Instagram Reel", ratePerPost: "55000", currency: "INR" },
    ],
  },
  {
    id: "mock-004",
    submittedAt: "2026-04-04T14:45:00Z",
    status: "new",
    fullName: "Carlos Medina",
    email: "carlos@foodstories.mx",
    phone: "+52 55 1234 5678",
    location: "Mexico",
    bio: "Food photographer and culinary storyteller. I make every dish look like art while keeping it real and accessible.",
    website: "https://carlosmedina.food",
    previousBrands: "Rappi, Nestlé Mexico, KitchenAid",
    availableForCampaigns: true,
    availableFrom: "2026-04-20",
    platforms: [
      { platform: "instagram", handle: "@carlosmedina.food", followers: "95000", engagementRate: "8.1" },
      { platform: "pinterest", handle: "@carlosmedinafoods", followers: "31000", engagementRate: "5.6" },
    ],
    categoryRates: [
      { category: "Food & Cooking", contentType: "Sponsored Feed Post", ratePerPost: "1200", currency: "USD" },
      { category: "Lifestyle", contentType: "Instagram Reel", ratePerPost: "900", currency: "USD" },
    ],
  },
  {
    id: "mock-005",
    submittedAt: "2026-04-05T10:20:00Z",
    status: "rejected",
    fullName: "Aisha Kamara",
    email: "aisha@travelstories.ng",
    phone: "+234 803 123 4567",
    location: "Nigeria",
    bio: "Africa-based travel and culture creator. I showcase the beauty of African destinations to a global audience.",
    website: "",
    previousBrands: "Jumia Travel, Air Peace, Lagos Tourism",
    availableForCampaigns: false,
    availableFrom: "",
    platforms: [
      { platform: "tiktok", handle: "@aishatravels", followers: "210000", engagementRate: "9.4" },
      { platform: "instagram", handle: "@aisha.kamara", followers: "88000", engagementRate: "6.7" },
    ],
    categoryRates: [
      { category: "Travel & Adventure", contentType: "TikTok Video", ratePerPost: "800", currency: "USD" },
      { category: "Lifestyle", contentType: "Sponsored Feed Post", ratePerPost: "650", currency: "USD" },
    ],
  },
  {
    id: "mock-006",
    submittedAt: "2026-04-06T16:00:00Z",
    status: "new",
    fullName: "Lucas Hoffmann",
    email: "lucas@gaminghaus.de",
    phone: "+49 151 23456789",
    location: "Germany",
    bio: "PC gaming & esports content creator. I build communities around competitive games and hardware reviews.",
    website: "https://twitch.tv/lucashhoffmann",
    previousBrands: "ASUS ROG, HyperX, Razer",
    availableForCampaigns: true,
    availableFrom: "2026-04-25",
    platforms: [
      { platform: "twitch", handle: "lucashhoffmann", followers: "145000", engagementRate: "11.2" },
      { platform: "youtube", handle: "@lucasgamingde", followers: "62000", engagementRate: "4.3" },
    ],
    categoryRates: [
      { category: "Gaming", contentType: "Live Stream", ratePerPost: "1800", currency: "EUR" },
      { category: "Technology & Gadgets", contentType: "Product Review", ratePerPost: "2400", currency: "EUR" },
    ],
  },
  {
    id: "mock-007",
    submittedAt: "2026-04-07T09:55:00Z",
    status: "reviewed",
    fullName: "Emma Richardson",
    email: "emma@homebyemma.co.uk",
    phone: "+44 7911 123456",
    location: "United Kingdom",
    bio: "Interior design and home styling creator. I help people transform their spaces on any budget.",
    website: "https://homebyemma.co.uk",
    previousBrands: "IKEA UK, Dunelm, Habitat",
    availableForCampaigns: true,
    availableFrom: "2026-05-15",
    platforms: [
      { platform: "instagram", handle: "@homebyemma", followers: "230000", engagementRate: "5.9" },
      { platform: "pinterest", handle: "@homebyemma", followers: "178000", engagementRate: "3.1" },
      { platform: "youtube", handle: "@homebyemma", followers: "45000", engagementRate: "6.2" },
    ],
    categoryRates: [
      { category: "Home & Interior Decor", contentType: "Sponsored Feed Post", ratePerPost: "2100", currency: "GBP" },
      { category: "Lifestyle", contentType: "YouTube Dedicated Video", ratePerPost: "3500", currency: "GBP" },
    ],
  },
  {
    id: "mock-008",
    submittedAt: "2026-04-08T13:10:00Z",
    status: "new",
    fullName: "Yuki Tanaka",
    email: "yuki@fashionforward.jp",
    phone: "+81 90 1234 5678",
    location: "Other",
    bio: "Street fashion and Harajuku-inspired style creator. I bridge Japanese street culture with global fashion trends.",
    website: "https://yukistyle.jp",
    previousBrands: "Uniqlo Global, Comme des Garçons, Hypebeast",
    availableForCampaigns: true,
    availableFrom: "2026-06-01",
    platforms: [
      { platform: "instagram", handle: "@yuki.fashionforward", followers: "410000", engagementRate: "6.8" },
      { platform: "tiktok", handle: "@yukistyle", followers: "670000", engagementRate: "8.5" },
    ],
    categoryRates: [
      { category: "Fashion & Style", contentType: "TikTok Video", ratePerPost: "4200", currency: "USD" },
      { category: "Fashion & Style", contentType: "Instagram Reel", ratePerPost: "3800", currency: "USD" },
    ],
  },
];

// ─── In-memory store ──────────────────────────────────────────────────────────

// Module-level singleton — persists for the lifetime of the Node.js process.
// In development, hot reload may reset this; in production it persists.
const store: ApplicationRecord[] = [...MOCK_DATA];

export const getAllApplications = (): ApplicationRecord[] =>
  [...store].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

export const addApplication = (
  payload: Omit<ApplicationRecord, "id" | "submittedAt" | "status">
): ApplicationRecord => {
  const record: ApplicationRecord = {
    id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    submittedAt: new Date().toISOString(),
    status: "new",
    ...payload,
  };
  store.push(record);
  return record;
};

export const updateApplicationStatus = (
  id: string,
  status: ApplicationStatus
): ApplicationRecord | null => {
  const app = store.find((a) => a.id === id);
  if (!app) return null;
  app.status = status;
  return app;
};
