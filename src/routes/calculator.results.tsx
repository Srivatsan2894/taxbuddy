import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Download, Share2, Save, RotateCcw, ArrowRight, TrendingDown } from "lucide-react";
import { calculateTax, formatINR } from "../lib/tax";
import { addSaved, useAppState, useFY } from "../lib/tax-store";
import { toast } from "sonner";

export const Route = createFileRoute("/calculator/results")({
  head: () => ({
    meta: [
      { title: "Your Tax Results — TaxBuddy India" },
      { name: "description", content: "Your estimated tax payable with a full breakdown." },
    ],
  }),
  component: Results,
});

function Results() {
  const [state] = useAppState();
  const [fy] = useFY();
  const navigate = useNavigate();
  const [saved, setSavedFlag] = useState(false);

  const result = useMemo(
    () => calculateTax(state.income, state.deductions, state.regime),
    [state]
  );
  const other = useMemo(
    () =>
      calculateTax(state.income, state.deductions, state.regime === "old" ? "new" : "old"),
    [state]
  );

  const savings = other.netTax - result.netTax;
  const isWinner = savings > 0;

  const timeline = [
    { label: "Gross Income", value: result.gross },
    { label: "Total Deductions", value: -result.totalDeductions, green: true },
    { label: "Taxable Income", value: result.taxableIncome, bold: true },
    { label: "Tax + Surcharge", value: result.taxAfterRebate + result.surcharge },
    { label: "Cess (4%)", value: result.cess },
    { label: "Net Tax", value: result.netTax, dark: true },
  ];

  return (
    <main className="font-sans">
      <header className="flex items-center justify-between px-6 pt-10 pb-3">
        <button
          onClick={() => navigate({ to: "/calculator" })}
          className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm"
          aria-label="Back"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-xs font-semibold text-muted-foreground">
          {fy} · {state.regime === "old" ? "Old" : "New"} Regime
        </span>
        <div className="size-10" />
      </header>

      <section className="px-6 py-4 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          You Pay
        </p>
        <div className="mb-2 text-[56px] font-bold leading-none tracking-tight text-foreground">
          {formatINR(result.netTax)}
        </div>
        <p className="text-sm text-muted-foreground">
          Effective rate {result.effectiveRate.toFixed(1)}% · Take home{" "}
          <span className="font-semibold text-foreground">{formatINR(result.takeHome)}</span>
        </p>
      </section>

      <section className="px-6 py-3">
        <div
          className={`flex items-center gap-4 rounded-[20px] border p-5 ${
            isWinner
              ? "border-brand-green-soft bg-brand-green-soft"
              : "border-brand-orange-soft bg-brand-orange-soft"
          }`}
        >
          <div className={`grid size-12 shrink-0 place-items-center rounded-2xl ${isWinner ? "bg-card text-brand-green" : "bg-card text-brand-orange"}`}>
            <TrendingDown className="size-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              {isWinner ? "You save " : "You'd save "}
              <span className={isWinner ? "text-brand-green" : "text-brand-orange"}>
                {formatINR(Math.abs(savings))}
              </span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {isWinner
                ? `vs ${state.regime === "old" ? "New" : "Old"} Regime — you picked the better one.`
                : `Switch to the ${state.regime === "old" ? "New" : "Old"} Regime to save.`}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <h2 className="mb-4 text-sm font-bold text-foreground">Breakdown Timeline</h2>
        <div className="relative space-y-5 border-l-2 border-dashed border-border pl-6">
          {timeline.map((t, i) => (
            <div key={i} className="relative">
              <span
                className={`absolute -left-[31px] top-1.5 size-4 rounded-full ring-4 ring-background ${
                  t.dark
                    ? "bg-foreground"
                    : t.green
                      ? "bg-brand-green"
                      : t.bold
                        ? "bg-brand-orange"
                        : "bg-border"
                }`}
              />
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${t.bold || t.dark ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  {t.label}
                </span>
                <span
                  className={`text-sm font-bold ${
                    t.green ? "text-brand-green" : "text-foreground"
                  }`}
                >
                  {t.value < 0 ? "- " : ""}
                  {formatINR(Math.abs(t.value))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">Slab-wise Breakdown</h2>
        <div className="rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
          {result.slabBreakdown.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No taxable income — you're below the threshold.
            </p>
          ) : (
            result.slabBreakdown.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border px-3 py-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.slab}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Taxed at {(s.rate * 100).toFixed(0)}%
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground">{formatINR(s.tax)}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-6 py-4">
        <button
          onClick={() => {
            window.print();
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-sm font-bold text-background"
        >
          <Download className="size-4" /> Download PDF
        </button>
        <button
          onClick={async () => {
            const text = `My estimated tax for ${fy} is ${formatINR(result.netTax)} via TaxBuddy India.`;
            if (navigator.share) {
              try {
                await navigator.share({ title: "TaxBuddy India", text });
              } catch {}
            } else {
              await navigator.clipboard.writeText(text);
              toast.success("Result copied to clipboard");
            }
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-bold text-foreground"
        >
          <Share2 className="size-4" /> Share
        </button>
        <button
          onClick={() => {
            addSaved({
              id: crypto.randomUUID(),
              name: `${fy} — ${state.regime === "old" ? "Old" : "New"} Regime`,
              createdAt: Date.now(),
              fy,
              state: { ...state, lastResult: result },
              netTax: result.netTax,
            });
            setSavedFlag(true);
            toast.success("Calculation saved");
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-bold text-foreground"
        >
          <Save className="size-4" /> {saved ? "Saved ✓" : "Save"}
        </button>
        <Link
          to="/calculator"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-bold text-foreground"
        >
          <RotateCcw className="size-4" /> Recalculate
        </Link>
      </section>

      <section className="px-6 pb-8 pt-4">
        <Link
          to="/compare"
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <div>
            <p className="text-sm font-bold text-foreground">Compare both regimes side-by-side</p>
            <p className="text-[11px] text-muted-foreground">Full breakdown of Old vs New</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground" />
        </Link>
      </section>
    </main>
  );
}