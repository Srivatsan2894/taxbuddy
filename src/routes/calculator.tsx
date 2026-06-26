import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Info, Check } from "lucide-react";
import {
  calculateTax,
  DEDUCTION_LIMITS,
  formatINR,
  type DeductionInputs,
  type IncomeInputs,
  type Regime,
} from "../lib/tax";
import { useAppState } from "../lib/tax-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Tax Calculator — TaxBuddy India" },
      { name: "description", content: "Calculate your income tax in 4 simple steps." },
    ],
  }),
  component: Calculator,
});

const STEPS = ["Income", "Regime", "Deductions", "Summary"];

function CurrencyInput({
  value,
  onChange,
  placeholder,
  max,
}: {
  value: number;
  onChange: (n: number) => void;
  placeholder?: string;
  max?: number;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
        ₹
      </span>
      <input
        inputMode="numeric"
        value={value === 0 ? "" : value.toLocaleString("en-IN")}
        placeholder={placeholder}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^0-9]/g, "")) || 0;
          onChange(max ? Math.min(n, max * 10) : n);
        }}
        className="w-full rounded-xl border border-input bg-card py-3 pl-8 pr-4 text-sm font-semibold text-foreground outline-none ring-brand-green focus:ring-2"
      />
    </div>
  );
}

function Calculator() {
  const [state, setState] = useAppState();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const setIncome = (patch: Partial<IncomeInputs>) =>
    setState({ ...state, income: { ...state.income, ...patch } });
  const setDed = (patch: Partial<DeductionInputs>) =>
    setState({ ...state, deductions: { ...state.deductions, ...patch } });
  const setRegime = (r: Regime) =>
    setState({
      ...state,
      regime: r,
      deductions: { ...state.deductions, standard: r === "old" ? 50000 : 75000 },
    });

  const result = useMemo(
    () => calculateTax(state.income, state.deductions, state.regime),
    [state]
  );

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate({ to: "/calculator/results" });
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <main className="font-sans">
      <header className="flex items-center justify-between px-6 pt-10 pb-3">
        <button
          onClick={() => (step === 0 ? navigate({ to: "/" }) : prev())}
          className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm"
          aria-label="Back"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-xs font-semibold text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </span>
        <Link to="/" className="text-xs font-bold text-brand-green">
          Skip
        </Link>
      </header>

      <div className="flex gap-1.5 px-6 pb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= step ? "bg-brand-green" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <section className="px-6 pb-6">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-foreground">
          {step === 0 && "Tell us about your income"}
          {step === 1 && "Choose your tax regime"}
          {step === 2 && "Add your deductions"}
          {step === 3 && "Your tax summary"}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {step === 0 && "Annual amounts — we'll calculate everything for the year."}
          {step === 1 && "The Old Regime allows deductions. The New Regime has lower rates."}
          {step === 2 && "Only fill what applies to you. Limits are shown beside each one."}
          {step === 3 && "Here's the breakdown of your estimated tax."}
        </p>

        {step === 0 && (
          <div className="space-y-4">
            {[
              { key: "baseSalary", label: "Base Salary", hint: "Your fixed annual base pay" },
              { key: "bonus", label: "Bonus", hint: "Annual bonus / joining bonus" },
              { key: "variable", label: "Variable Pay", hint: "Performance pay, RSUs, ESOPs" },
              { key: "otherIncome", label: "Other Income", hint: "Interest, rent, freelance, etc." },
            ].map((f) => (
              <div key={f.key} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </label>
                <p className="mb-3 text-[11px] text-muted-foreground">{f.hint}</p>
                <CurrencyInput
                  value={state.income[f.key as keyof IncomeInputs]}
                  onChange={(n) => setIncome({ [f.key]: n } as Partial<IncomeInputs>)}
                />
              </div>
            ))}
            <div className="mt-4 rounded-2xl bg-secondary p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Gross CTC
                </span>
                <span className="text-lg font-bold text-foreground">
                  {formatINR(result.gross)}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            {(
              [
                {
                  id: "new",
                  title: "New Regime",
                  desc: "Lower rates, ₹75k standard deduction, almost no other deductions.",
                  pros: ["Simpler", "Better if you don't invest much", "Default since FY 23-24"],
                },
                {
                  id: "old",
                  title: "Old Regime",
                  desc: "Higher rates but lets you claim 80C, HRA, home loan, NPS and more.",
                  pros: ["Best with home loan", "Rewards investments", "Full HRA exemption"],
                },
              ] as const
            ).map((r) => {
              const active = state.regime === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRegime(r.id)}
                  className={`w-full rounded-2xl border-2 p-5 text-left transition-all ${
                    active
                      ? "border-brand-green bg-brand-green-soft"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">{r.title}</h3>
                    <span
                      className={`grid size-6 place-items-center rounded-full ${
                        active ? "bg-brand-green text-foreground" : "border border-border bg-card"
                      }`}
                    >
                      {active && <Check className="size-4" strokeWidth={3} />}
                    </span>
                  </div>
                  <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.pros.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold text-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === 2 && (
          <DeductionStep state={state} setDed={setDed} />
        )}

        {step === 3 && <SummaryStep result={result} />}
      </section>

      <div className="fixed bottom-20 left-1/2 z-40 flex w-full max-w-[480px] -translate-x-1/2 gap-3 bg-gradient-to-t from-background via-background to-transparent px-6 pb-3 pt-6">
        {step > 0 && (
          <button
            onClick={prev}
            className="flex-1 rounded-xl border border-border bg-card py-3.5 text-sm font-bold text-foreground"
          >
            Back
          </button>
        )}
        <button
          onClick={next}
          className="flex-[2] rounded-xl bg-foreground py-3.5 text-sm font-bold text-background transition-transform active:scale-[0.98]"
        >
          {step === STEPS.length - 1 ? "See Full Results" : "Continue"}
        </button>
      </div>
    </main>
  );
}

function DeductionStep({
  state,
  setDed,
}: {
  state: ReturnType<typeof useAppState>[0];
  setDed: (p: Partial<DeductionInputs>) => void;
}) {
  if (state.regime === "new") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-brand-green-soft text-brand-green">
          <Info className="size-6" />
        </div>
        <h3 className="mb-1 text-base font-bold text-foreground">Standard Deduction Only</h3>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          The New Regime applies a flat ₹75,000 standard deduction. Other deductions like 80C and
          HRA don't apply here.
        </p>
      </div>
    );
  }

  const items: Array<{
    key: keyof DeductionInputs;
    code: string;
    title: string;
    limit: number;
    blurb: string;
    examples: string;
  }> = [
    { key: "sec80C", code: "80C", title: "Investments & Savings", limit: DEDUCTION_LIMITS.sec80C, blurb: "EPF, PPF, ELSS, life insurance, child tuition.", examples: "₹46,800 max tax saving" },
    { key: "sec80D", code: "80D", title: "Health Insurance", limit: DEDUCTION_LIMITS.sec80D, blurb: "Premiums for self, spouse, children.", examples: "Add senior parents for ₹50k more" },
    { key: "nps80CCD1B", code: "80CCD(1B)", title: "NPS Top-up", limit: DEDUCTION_LIMITS.nps80CCD1B, blurb: "Voluntary NPS contribution, over and above 80C.", examples: "Saves ~₹15,600" },
    { key: "homeLoan24B", code: "24(b)", title: "Home Loan Interest", limit: DEDUCTION_LIMITS.homeLoan24B, blurb: "Interest on a self-occupied home loan.", examples: "Most powerful Old-Regime lever" },
    { key: "hra", code: "HRA", title: "House Rent Allowance", limit: DEDUCTION_LIMITS.hra, blurb: "Exempt portion of HRA when paying rent.", examples: "Depends on city & basic" },
    { key: "lta", code: "LTA", title: "Leave Travel Allowance", limit: DEDUCTION_LIMITS.lta, blurb: "Domestic travel claimed twice in 4 years.", examples: "Keep boarding passes" },
    { key: "educationLoan80E", code: "80E", title: "Education Loan Interest", limit: DEDUCTION_LIMITS.educationLoan80E, blurb: "Full interest, up to 8 years.", examples: "Higher studies only" },
  ];

  return (
    <Accordion type="multiple" className="space-y-3">
      {items.map((it) => {
        const val = state.deductions[it.key];
        return (
          <AccordionItem
            key={it.key}
            value={it.key}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <AccordionTrigger className="px-5 py-4 text-left hover:no-underline [&>svg]:text-muted-foreground">
              <div className="flex flex-1 items-center justify-between pr-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Section {it.code}
                  </p>
                  <p className="text-sm font-bold text-foreground">{it.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Claimed</p>
                  <p className="text-sm font-bold text-brand-green">{formatINR(val)}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-border bg-secondary/50 px-5 py-4">
              <p className="mb-1 text-xs text-muted-foreground">{it.blurb}</p>
              <p className="mb-3 text-[11px] font-semibold text-brand-orange">{it.examples}</p>
              <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Amount you want to claim</span>
                <span>Max: {formatINR(it.limit)}</span>
              </div>
              <CurrencyInput
                value={val}
                onChange={(n) => setDed({ [it.key]: Math.min(n, it.limit) } as Partial<DeductionInputs>)}
                max={it.limit}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function SummaryStep({ result }: { result: ReturnType<typeof calculateTax> }) {
  const rows = [
    { label: "Gross Income", value: formatINR(result.gross) },
    { label: "Deductions", value: "- " + formatINR(result.totalDeductions), accent: "text-brand-green" },
    { label: "Taxable Income", value: formatINR(result.taxableIncome), bold: true },
    { label: "Tax before rebate", value: formatINR(result.taxBeforeRebate) },
    { label: "87A Rebate", value: "- " + formatINR(result.rebate), accent: "text-brand-green" },
    { label: "Surcharge", value: formatINR(result.surcharge) },
    { label: "Health & Education Cess", value: formatINR(result.cess) },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-border py-3 last:border-0"
        >
          <span className={`text-sm ${r.bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
            {r.label}
          </span>
          <span className={`text-sm font-bold ${r.accent ?? "text-foreground"}`}>{r.value}</span>
        </div>
      ))}
      <div className="-mx-5 -mb-5 mt-3 rounded-b-2xl bg-foreground p-5">
        <div className="flex items-end justify-between text-background">
          <span className="text-xs font-medium uppercase tracking-wider opacity-70">
            Net Tax Payable
          </span>
          <span className="text-2xl font-bold">{formatINR(result.netTax)}</span>
        </div>
      </div>
    </div>
  );
}