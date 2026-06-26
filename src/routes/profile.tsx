import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  FileDown,
  MessageSquare,
  Moon,
  Shield,
  Star,
  Trash2,
  ChevronRight,
  Receipt,
} from "lucide-react";
import { formatINR } from "../lib/tax";
import { removeSaved, useSaved } from "../lib/tax-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — TaxBuddy India" },
      { name: "description", content: "Saved calculations, reports and app settings." },
    ],
  }),
  component: Profile,
});

const SETTINGS = [
  { label: "Notifications", icon: Bell },
  { label: "Dark Mode", icon: Moon },
  { label: "Privacy Policy", icon: Shield },
  { label: "Send Feedback", icon: MessageSquare },
  { label: "Rate the App", icon: Star },
];

function Profile() {
  const saved = useSaved();

  return (
    <main className="font-sans">
      <header className="px-6 pt-10 pb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Profile</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Sri's Account</h1>
      </header>

      <section className="px-6 py-4">
        <div className="flex items-center gap-4 rounded-[24px] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="grid size-14 place-items-center rounded-full bg-foreground text-lg font-bold text-background">
            SR
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">Sri Ramesh</p>
            <p className="text-xs text-muted-foreground">IT Professional · Bengaluru</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-sm font-bold text-foreground">Saved Calculations</h2>
          <span className="text-[11px] text-muted-foreground">{saved.length} saved</span>
        </div>
        {saved.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <Receipt className="mx-auto mb-2 size-8 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">No saved calculations yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Run a calculation and tap Save to keep it here.
            </p>
            <Link
              to="/calculator"
              className="mt-4 inline-block rounded-xl bg-foreground px-5 py-2.5 text-xs font-bold text-background"
            >
              Start a calculation
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {saved.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary">
                  <Receipt className="size-4 text-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(s.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatINR(s.netTax)}</span>
                <button
                  onClick={() => removeSaved(s.id)}
                  className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
                  aria-label="Delete"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-6 py-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">Reports</h2>
        <button
          onClick={() => window.print()}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-brand-green-soft text-brand-green">
            <FileDown className="size-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">Download Tax Report</p>
            <p className="text-[11px] text-muted-foreground">PDF of your latest calculation</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </section>

      <section className="px-6 py-4 pb-8">
        <h2 className="mb-3 text-sm font-bold text-foreground">Settings</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          {SETTINGS.map((s, i) => (
            <button
              key={s.label}
              className={`flex w-full items-center gap-3 px-4 py-4 text-left ${
                i !== SETTINGS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <s.icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-sm font-semibold text-foreground">{s.label}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          TaxBuddy India · v1.0 · Made for Indian taxpayers
        </p>
      </section>
    </main>
  );
}