"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export function SignOutButton({
  variant = "ghost",
}: {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <Button type="button" variant={variant} size="sm" onClick={signOut}>
      Sign out
    </Button>
  );
}
