import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Calculator,
  GitCompareArrows,
  BookOpen,
  CalendarDays,
  Download,
  Lightbulb,
  ChevronDown,
  TrendingUp,
  Wallet,
  Sparkles,
} from "lucide-react";
import { calculateTax, formatINR, FINANCIAL_YEARS } from "../lib/tax";
import { useAppState, useFY } from "../lib/tax-store";
import { DAILY_TIPS, TAX_CALENDAR } from "../lib/content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaxBuddy India — Income Tax Calculator" },
      {
        name: "description",
        content: "Calculate your Indian income tax in under 2 minutes. Compare Old vs New tax regimes and discover savings.",
      },
      { property: "og:title", content: "TaxBuddy India — Home" },
    ],
  }),
  component: Home,
});

const QUICK_ACTIONS = [
  { to: "/calculator", label: "Calculate Tax", desc: "Step-by-step wizard", icon: Calculator, tint: "bg-[oklch(0.95_0.04_250)] text-[oklch(0.42_0.18_265)]" },
  { to: "/compare", label: "Compare Regimes", desc: "Old vs New", icon: GitCompareArrows, tint: "bg-brand-green-soft text-brand-green" },
  { to: "/learn", label: "Tax Sections", desc: "80C, HRA, NPS", icon: BookOpen, tint: "bg-brand-orange-soft text-brand-orange" },
  { to: "/learn", label: "Tax Planning", desc: "Plan smarter", icon: TrendingUp, tint: "bg-[oklch(0.95_0.04_295)] text-[oklch(0.45_0.18_295)]" },
  { to: "/", label: "Tax Calendar", desc: "Key deadlines", icon: CalendarDays, tint: "bg-[oklch(0.96_0.04_60)] text-[oklch(0.55_0.17_50)]" },
  { to: "/profile", label: "Download Reports", desc: "Saved PDFs", icon: Download, tint: "bg-[oklch(0.95_0.03_180)] text-[oklch(0.45_0.14_200)]" },
] as const;

function Home() {
  const [state] = useAppState();
  const [fy, setFy] = useFY();

  const result = useMemo(
    () => calculateTax(state.income, state.deductions, state.regime),
    [state]
  );

  const tip = DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length];
  const upcoming = TAX_CALENDAR.slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <main className="font-sans">
      <header className="flex items-center justify-between px-6 pt-10 pb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{greeting}, Sri 👋</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">TaxBuddy India</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <span className="size-2 rounded-full bg-brand-green" />
            {fy}
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {FINANCIAL_YEARS.map((y) => (
              <DropdownMenuItem key={y} onSelect={() => setFy(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Hero card */}
      <section className="px-6 py-3">
        <div className="relative overflow-hidden rounded-[24px] bg-foreground p-7 text-background">
          <div className="absolute -right-10 -bottom-10 size-44 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -left-10 -top-10 size-44 rounded-full bg-brand-green/20 blur-3xl" />
          <div className="relative z-10">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-background/60">
              Estimated Tax Payable
            </p>
            <div className="mb-1 text-[44px] font-bold leading-tight tracking-tight">
              {formatINR(result.netTax)}
            </div>
            <p className="mb-6 text-xs text-background/60">
              {state.regime === "old" ? "Old Regime" : "New Regime"} · {fy}
            </p>
            <Link
              to="/calculator"
              className="block w-full rounded-xl bg-brand-green py-3.5 text-center text-sm font-bold text-foreground transition-transform active:scale-[0.98]"
            >
              Recalculate Tax
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 gap-3 px-6 py-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-green">
            <Wallet className="size-3" /> Take Home
          </div>
          <div className="mt-2 text-lg font-bold text-foreground">{formatINR(result.takeHome)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
            <TrendingUp className="size-3" /> Effective Rate
          </div>
          <div className="mt-2 text-lg font-bold text-foreground">
            {result.effectiveRate.toFixed(1)}%
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-6 py-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map(({ to, label, desc, icon: Icon, tint }) => (
            <Link
              key={label}
              to={to}
              className="rounded-[20px] border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-transform active:scale-[0.98]"
            >
              <div className={`mb-3 grid size-10 place-items-center rounded-xl ${tint}`}>
                <Icon className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">{label}</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily tip */}
      <section className="px-6 py-3">
        <div className="flex gap-4 rounded-[20px] border border-brand-orange-soft bg-brand-orange-soft p-5">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-card shadow-sm">
            <Lightbulb className="size-5 text-brand-orange" />
          </div>
          <div>
            <h4 className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
              Smart Tip
            </h4>
            <p className="text-sm leading-snug text-foreground">{tip}</p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="px-6 py-4">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-sm font-bold text-foreground">Tax Calendar</h2>
          <span className="text-[11px] font-bold text-brand-green">All dates</span>
        </div>
        <div className="space-y-2 rounded-[20px] border border-border bg-card p-2 shadow-[var(--shadow-card)]">
          {upcoming.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-secondary"
            >
              <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-secondary px-2 py-1.5">
                <span className="text-[9px] font-bold uppercase text-muted-foreground">
                  {e.date.split(" ")[0]}
                </span>
                <span className="text-base font-bold leading-none text-foreground">
                  {e.date.split(" ")[1]}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{e.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insight card */}
      <section className="px-6 pt-3 pb-6">
        <div className="rounded-[24px] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-foreground text-background">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Smart Insight</p>
              <h4 className="text-sm font-bold text-foreground">
                Run a comparison to see your savings
              </h4>
            </div>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            We'll line up both regimes side-by-side and recommend the one that minimises your tax.
          </p>
          <Link
            to="/compare"
            className="block w-full rounded-xl bg-secondary py-3 text-center text-sm font-bold text-foreground"
          >
            Compare Regimes
          </Link>
        </div>
      </section>
    </main>
  );
}
