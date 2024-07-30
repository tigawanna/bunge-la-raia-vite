import { createFileRoute } from "@tanstack/react-router";
import { AddCounties } from "./-components/AddCounties";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

interface AdminPageProps {}

export function AdminPage({}: AdminPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">Admin page</h1>
      <AddCounties />
    </div>
  );
}

const { data: aspirations, error: aspirationError } = await supabase
  .from("candidate_aspirations")
  .select("*")
  .eq("id", "uwu")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(20);
const aspirations_text = aspirations?.reduce(
  (acc, curr, idx) => {
    const aspiration = `period: ${curr.period} vying_for: ${curr.vying_for} vying in ${curr.vying_in} 
    mission statement: ${curr.mission_statement} vibe_check: ${JSON.stringify(curr.vibe_check)}`;
    acc += `${idx + 1}. ${aspiration}\n`;
    return acc;
  },
  ""
);
