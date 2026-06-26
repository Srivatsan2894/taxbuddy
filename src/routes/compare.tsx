import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { calculateTax, formatINR } from "../lib/tax";
import { useAppState } from "../lib/tax-store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Tax Regimes — TaxBuddy India" },
      { name: "description", content: "Old Regime vs New Regime side-by-side comparison." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const [state] = useAppState();
  const old = useMemo(
    () => calculateTax(state.income, state.deductions, "old"),
    [state]
  );
  const neu = useMemo(
    () => calculateTax(state.income, state.deductions, "new"),
    [state]
  );

  const winner = old.netTax < neu.netTax ? "old" : "new";
  const savings = Math.abs(old.netTax - neu.netTax);

  const rows = [
    { label: "Gross Income", o: old.gross, n: neu.gross, fmt: formatINR },
    { label: "Deductions", o: old.totalDeductions, n: neu.totalDeductions, fmt: formatINR },
    { label: "Taxable Income", o: old.taxableIncome, n: neu.taxableIncome, fmt: formatINR },
    { label: "Tax Payable", o: old.netTax, n: neu.netTax, fmt: formatINR, highlight: true },
    { label: "Take Home", o: old.takeHome, n: neu.takeHome, fmt: formatINR },
    {
      label: "Effective Rate",
      o: old.effectiveRate,
      n: neu.effectiveRate,
      fmt: (v: number) => v.toFixed(2) + "%",
    },
  ];

  const maxTax = Math.max(old.netTax, neu.netTax, 1);

  return (
    <main className="font-sans">
      <header className="px-6 pt-10 pb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Tax Compare
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Old vs New Regime</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on your current income & deductions
        </p>
      </header>

      {/* Recommendation */}
      <section className="px-6 py-4">
        <div className="rounded-[24px] border border-brand-green-soft bg-brand-green-soft p-5">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-brand-green" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Recommended for you
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {winner === "old" ? "Old Regime" : "New Regime"}
          </h3>
          <p className="mt-1 text-sm text-foreground">
            Save <span className="font-bold text-brand-green">{formatINR(savings)}</span> every
            year vs the other regime.
          </p>
        </div>
      </section>

      {/* Bar chart */}
      <section className="px-6 py-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">Tax Payable</h2>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <Bar
            label="Old Regime"
            amount={old.netTax}
            max={maxTax}
            color="bg-brand-green"
            winner={winner === "old"}
          />
          <Bar
            label="New Regime"
            amount={neu.netTax}
            max={maxTax}
            color="bg-brand-orange"
            winner={winner === "new"}
          />
        </div>
      </section>

      {/* Side-by-side cards */}
      <section className="grid grid-cols-2 gap-3 px-6 py-4">
        <RegimeCard
          title="Old Regime"
          netTax={old.netTax}
          takeHome={old.takeHome}
          deductions={old.totalDeductions}
          recommended={winner === "old"}
        />
        <RegimeCard
          title="New Regime"
          netTax={neu.netTax}
          takeHome={neu.takeHome}
          deductions={neu.totalDeductions}
          recommended={winner === "new"}
        />
      </section>

      {/* Detailed table */}
      <section className="px-6 py-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">Detailed Comparison</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-3 border-b border-border bg-secondary px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>Metric</span>
            <span className="text-right">Old</span>
            <span className="text-right">New</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 items-center border-b border-border px-4 py-3 text-sm last:border-0 ${
                r.highlight ? "bg-secondary" : ""
              }`}
            >
              <span className={r.highlight ? "font-bold text-foreground" : "text-muted-foreground"}>
                {r.label}
              </span>
              <span className={`text-right ${r.highlight ? "font-bold text-foreground" : "text-foreground"}`}>
                {r.fmt(r.o)}
              </span>
              <span className={`text-right ${r.highlight ? "font-bold text-foreground" : "text-foreground"}`}>
                {r.fmt(r.n)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-6 pt-2">
        <Link
          to="/calculator"
          className="block rounded-xl bg-foreground py-3.5 text-center text-sm font-bold text-background"
        >
          Edit Income & Deductions
        </Link>
      </section>
    </main>
  );
}

function Bar({
  label,
  amount,
  max,
  color,
  winner,
}: {
  label: string;
  amount: number;
  max: number;
  color: string;
  winner: boolean;
}) {
  const pct = (amount / max) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">
          {label} {winner && <span className="ml-1 text-brand-green">★</span>}
        </span>
        <span className="text-sm font-bold text-foreground">{formatINR(amount)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RegimeCard({
  title,
  netTax,
  takeHome,
  deductions,
  recommended,
}: {
  title: string;
  netTax: number;
  takeHome: number;
  deductions: number;
  recommended: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        recommended ? "border-brand-green bg-card" : "border-border bg-card"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {recommended && (
          <span className="rounded-full bg-brand-green-soft px-2 py-0.5 text-[9px] font-bold text-brand-green">
            BEST
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Tax
      </p>
      <p className="mb-3 text-lg font-bold text-foreground">{formatINR(netTax)}</p>
      <div className="space-y-1 text-[11px] text-muted-foreground">
        <div className="flex justify-between">
          <span>Take home</span>
          <span className="font-semibold text-foreground">{formatINR(takeHome)}</span>
        </div>
        <div className="flex justify-between">
          <span>Deductions</span>
          <span className="font-semibold text-foreground">{formatINR(deductions)}</span>
        </div>
      </div>
    </div>
  );
}