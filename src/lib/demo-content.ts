import type {
  AvailabilityStatus,
  RiskLevel,
  SkillLevel,
  StartupCostLevel,
} from "@/lib/types";

/** Static placeholder content for Sprint 2 design-system demos only. */

export const demoCategories: {
  href: string;
  title: string;
  summary: string;
  riskLevel: RiskLevel;
}[] = [
  {
    href: "/categories",
    title: "Careers & Employment",
    summary: "Grow income through skills, roles, and career capital — with clear trade-offs.",
    riskLevel: "low",
  },
  {
    href: "/categories",
    title: "Freelancing & Services",
    summary: "Offer skills for hire. Startup costs are often low; income depends on clients and delivery.",
    riskLevel: "medium",
  },
  {
    href: "/categories",
    title: "Investing & Wealth Management",
    summary: "Long-term capital growth paths. Markets can fall; nothing here is risk-free.",
    riskLevel: "high",
  },
  {
    href: "/categories",
    title: "Digital Economy",
    summary: "Online products and platforms. Competition is high and platforms can change rules.",
    riskLevel: "medium",
  },
];

export const demoOpportunities: {
  href: string;
  title: string;
  summary: string;
  score: number;
  riskLevel: RiskLevel;
  skillLevel: SkillLevel;
  startupCost: StartupCostLevel;
}[] = [
  {
    href: "/opportunities",
    title: "Freelance web design",
    summary: "Sell design work to clients. Income depends on pipeline, quality, and local/remote demand.",
    score: 72,
    riskLevel: "medium",
    skillLevel: "medium",
    startupCost: "low",
  },
  {
    href: "/opportunities",
    title: "Index-fund investing",
    summary: "Long-term diversified market exposure. Capital can decline; timeframe and behavior matter.",
    score: 78,
    riskLevel: "medium",
    skillLevel: "low",
    startupCost: "medium",
  },
  {
    href: "/opportunities",
    title: "Short-term forex trading",
    summary: "High complexity and loss risk. Most beginners lose money; treat as advanced/speculative.",
    score: 28,
    riskLevel: "very_high",
    skillLevel: "expert",
    startupCost: "medium",
  },
];

export const demoPlatforms: {
  href: string;
  title: string;
  summary: string;
  availability: AvailabilityStatus;
  lastVerified: string;
}[] = [
  {
    href: "/platforms",
    title: "Example freelance marketplace",
    summary: "Placeholder platform card. Later pages will include fees, verification, and disclosures.",
    availability: "available",
    lastVerified: "2026-07-15",
  },
  {
    href: "/platforms",
    title: "Example brokerage",
    summary: "Placeholder brokerage card. Country access and product eligibility vary.",
    availability: "limited",
    lastVerified: "2026-07-15",
  },
];

export const demoCountries: {
  href: string;
  name: string;
  summary: string;
  status: AvailabilityStatus;
}[] = [
  {
    href: "/countries",
    name: "Canada",
    summary: "Priority country shell. Availability notes will stay cautious and source-backed.",
    status: "available",
  },
  {
    href: "/countries",
    name: "Ghana",
    summary: "Priority country shell. Platform access and payments often need local verification.",
    status: "verify",
  },
];

export const demoRisks: {
  href: string;
  title: string;
  summary: string;
  riskLevel: RiskLevel;
  scamRisk: RiskLevel;
}[] = [
  {
    href: "/risks",
    title: "Guaranteed income promises",
    summary: "Claims of risk-free or guaranteed returns are a major red flag.",
    riskLevel: "critical",
    scamRisk: "critical",
  },
  {
    href: "/risks",
    title: "Upfront fee “investment clubs”",
    summary: "Pressure to pay large fees before any verifiable work or product is a common scam pattern.",
    riskLevel: "high",
    scamRisk: "very_high",
  },
];

export const demoRoadmaps: {
  href: string;
  title: string;
  summary: string;
  skillLevel: SkillLevel;
  steps: number;
}[] = [
  {
    href: "/roadmaps",
    title: "First freelance client",
    summary: "A cautious beginner path: skills, portfolio proof, outreach, and delivery basics.",
    skillLevel: "low",
    steps: 6,
  },
  {
    href: "/roadmaps",
    title: "Long-term investing basics",
    summary: "Emergency fund first, then diversified investing — without timing the market.",
    skillLevel: "low",
    steps: 5,
  },
];

export const demoArticles: {
  href: string;
  title: string;
  excerpt: string;
  category: string;
}[] = [
  {
    href: "/blog",
    title: "Intro to money and business concepts",
    excerpt: "Preserves the Learning Centre spirit from V1 with clearer risk-aware framing.",
    category: "Learning Centre",
  },
  {
    href: "/blog",
    title: "The three engines of wealth",
    excerpt: "A structured look at earning, growing, and protecting capital over time.",
    category: "Foundations",
  },
];
