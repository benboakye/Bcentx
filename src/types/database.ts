export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "researcher" | "editor" | "admin" | "owner";
export type ContentStatus =
  | "draft"
  | "review"
  | "published"
  | "needs_update"
  | "archived"
  | "rejected";
export type LevelScale = "none" | "low" | "medium" | "high" | "very_high";
export type SkillLevel = "low" | "medium" | "high" | "expert";
export type RiskLevel = "low" | "medium" | "high" | "very_high" | "critical";
export type TimeToIncome =
  | "immediate"
  | "short_term"
  | "medium_term"
  | "long_term"
  | "uncertain";
export type LiquidityLevel =
  | "high"
  | "medium"
  | "low"
  | "very_low"
  | "not_applicable";
export type AvailabilityStatus =
  | "available"
  | "limited"
  | "unavailable"
  | "unknown"
  | "verify";
export type CommissionType =
  | "fixed"
  | "percentage"
  | "recurring"
  | "revenue_share"
  | "hybrid"
  | "unknown";
export type WarningType =
  | "scam"
  | "financial"
  | "legal"
  | "tax"
  | "immigration"
  | "platform"
  | "security"
  | "ethical"
  | "compliance"
  | "general";

export type CategoryRow = {
  id: string;
  code: string;
  name: string;
  slug: string;
  summary: string;
  full_overview: string | null;
  icon_name: string | null;
  risk_level: RiskLevel;
  beginner_friendly: boolean;
  display_order: number;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  last_verified_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CategoryInsert = {
  code: string;
  name: string;
  slug: string;
  summary: string;
  full_overview?: string | null;
  icon_name?: string | null;
  risk_level?: RiskLevel;
  beginner_friendly?: boolean;
  display_order?: number;
  status?: ContentStatus;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  last_verified_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
};

export type CategoryUpdate = Partial<CategoryInsert>;

export type CountryRow = {
  id: string;
  name: string;
  iso_code: string;
  slug: string;
  region: string | null;
  currency_code: string | null;
  summary: string | null;
  payment_notes: string | null;
  tax_notes: string | null;
  regulator_notes: string | null;
  risk_notes: string | null;
  official_sources: Json;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  last_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PlatformRow = {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
  platform_type: string;
  summary: string;
  description: string | null;
  pricing_summary: string | null;
  fee_notes: string | null;
  country_restrictions: string | null;
  payout_methods: string | null;
  risk_notes: string | null;
  trust_rating: number | null;
  has_affiliate_program: boolean;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  last_verified_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type RiskWarningRow = {
  id: string;
  title: string;
  slug: string;
  warning_type: WarningType;
  severity: RiskLevel;
  description: string;
  recommended_action: string | null;
  official_source_url: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
};

export type OpportunityRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  how_money_is_made: string | null;
  how_money_is_lost: string | null;
  best_for: string | null;
  not_suitable_for: string | null;
  startup_cost_level: LevelScale;
  capital_required_level: LevelScale;
  skill_required_level: SkillLevel;
  time_to_income: TimeToIncome;
  scalability: LevelScale;
  risk_level: RiskLevel;
  scam_risk_level: RiskLevel;
  liquidity_level: LiquidityLevel;
  beginner_friendly: boolean;
  estimated_time_horizon: string | null;
  bcentx_score: number | null;
  editorial_verdict: string | null;
  required_disclaimer: string | null;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  last_verified_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type OpportunityListRow = OpportunityRow & {
  categories: { name: string; slug: string } | null;
};

export type OpportunityPlatformRow = {
  id: string;
  opportunity_id: string;
  platform_id: string;
  relevance_score: number | null;
  notes: string | null;
  created_at: string;
};

export type CountryAvailabilityRow = {
  id: string;
  country_id: string;
  opportunity_id: string | null;
  platform_id: string | null;
  availability_status: AvailabilityStatus;
  notes: string | null;
  official_source_url: string | null;
  last_verified_at: string | null;
  created_at: string;
};

export type CountryAvailabilityListRow = CountryAvailabilityRow & {
  countries: { name: string; iso_code: string } | null;
  opportunities: { name: string } | null;
  platforms: { name: string } | null;
};

export type AffiliateProgramRow = {
  id: string;
  platform_id: string;
  program_name: string;
  affiliate_url: string | null;
  commission_type: CommissionType;
  commission_details: string | null;
  cookie_duration: string | null;
  payout_methods: string | null;
  payout_threshold: string | null;
  country_restrictions: string | null;
  promotional_rules: string | null;
  disclosure_required: boolean;
  status: ContentStatus;
  last_verified_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type AffiliateProgramListRow = AffiliateProgramRow & {
  platforms: { name: string; slug: string } | null;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: CategoryRow;
      };
      countries: {
        Row: CountryRow;
      };
      risk_warnings: {
        Row: RiskWarningRow;
      };
      opportunities: {
        Row: OpportunityRow;
      };
      platforms: {
        Row: PlatformRow;
      };
      affiliate_programs: {
        Row: AffiliateProgramRow;
      };
    };
  };
};
