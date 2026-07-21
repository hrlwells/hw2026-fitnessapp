import Dashboard from "@/components/Dashboard";

// The dashboard is a client component; it loads its data from
// /api/profile and /api/log (Supabase) on mount.
export default function Page() {
  return <Dashboard />;
}
