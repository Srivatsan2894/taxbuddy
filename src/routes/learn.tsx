import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight, Lightbulb } from "lucide-react";
import { LEARN_ARTICLES, TAX_SECTIONS } from "../lib/content";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn Tax — TaxBuddy India" },
      { name: "description", content: "Beginner-friendly tax concepts and a searchable section library." },
    ],
  }),
  component: Learn,
});

const CATEGORIES = ["All", "Savings", "Insurance", "Salary", "Investments", "Home Loan", "Education", "Retirement"] as const;

function Learn() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const sections = useMemo(() => {
    return TAX_SECTIONS.filter(
      (s) =>
        (cat === "All" || s.category === cat) &&
        (q === "" ||
          s.code.toLowerCase().includes(q.toLowerCase()) ||
          s.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat]);

  return (
    <main className="font-sans">
      <header className="px-6 pt-10 pb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Library</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Learn Tax</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sections, articles & explainers — no jargon.
        </p>
      </header>

      {/* Search */}
      <section className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sections — 80C, HRA, NPS..."
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none ring-brand-green placeholder:text-muted-foreground focus:ring-2"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="overflow-x-auto px-6 pb-4">
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                cat === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 py-2">
        <h2 className="mb-3 text-sm font-bold text-foreground">Tax Sections</h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <Link
              key={s.id}
              to="/learn/section/$id"
              params={{ id: s.id }}
              className="block rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-transform active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-sm font-bold text-foreground">
                  {s.code}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                    {s.category}
                  </p>
                  <p className="truncate text-sm font-bold text-foreground">{s.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Max: <span className="font-semibold text-brand-green">{s.maxDeduction}</span>
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
          {sections.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">No sections match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 py-6">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="size-4 text-brand-orange" />
          <h2 className="text-sm font-bold text-foreground">Beginner Articles</h2>
        </div>
        <div className="space-y-3">
          {LEARN_ARTICLES.map((a) => (
            <Link
              key={a.id}
              to="/learn/article/$id"
              params={{ id: a.id }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-2xl">
                {a.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{a.title}</p>
                <p className="truncate text-[11px] text-muted-foreground">{a.blurb}</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-muted-foreground">
                {a.readMin} min
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}