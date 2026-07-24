import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { UserRole } from "@/types/database";

const STAFF_ROLES: UserRole[] = ["researcher", "editor", "admin", "owner"];

export type AuthProfile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
};

export async function getAuthUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getAuthProfile(): Promise<AuthProfile | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return {
      id: user.id,
      email: user.email ?? "",
      full_name: null,
      role: "user",
      is_active: true,
    };
  }

  return profile as AuthProfile;
}

export function canAccessAdmin(profile: AuthProfile | null) {
  if (!profile || !profile.is_active) {
    return false;
  }
  return STAFF_ROLES.includes(profile.role);
}

export async function requireStaffProfile() {
  const profile = await getAuthProfile();
  return {
    profile,
    allowed: canAccessAdmin(profile),
  };
}
