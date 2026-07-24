export type RiskLevel = "low" | "medium" | "high" | "very_high" | "critical";
export type SkillLevel = "low" | "medium" | "high" | "expert";
export type StartupCostLevel = "none" | "low" | "medium" | "high" | "very_high";
export type AvailabilityStatus =
  | "available"
  | "limited"
  | "unavailable"
  | "unknown"
  | "verify";

export const riskLabels: Record<RiskLevel, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
  very_high: "Very high risk",
  critical: "Critical risk",
};

/** Broad category risk wording — not a claim about every opportunity. */
export const typicalRiskLabels: Record<RiskLevel, string> = {
  low: "Typical risk: Low",
  medium: "Typical risk: Medium",
  high: "Typical risk: High",
  very_high: "Typical risk: Very high",
  critical: "Typical risk: Critical",
};

export const skillLabels: Record<SkillLevel, string> = {
  low: "Beginner-friendly",
  medium: "Intermediate skill",
  high: "Advanced skill",
  expert: "Expert skill",
};

export const startupCostLabels: Record<StartupCostLevel, string> = {
  none: "No startup cost",
  low: "Low startup cost",
  medium: "Medium startup cost",
  high: "High startup cost",
  very_high: "Very high startup cost",
};

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited availability",
  unavailable: "Unavailable",
  unknown: "Availability unknown",
  verify: "Verify locally",
};
