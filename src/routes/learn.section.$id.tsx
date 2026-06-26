import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Check, AlertTriangle, FileText, Users } from "lucide-react";
import { TAX_SECTIONS, type TaxSection } from "../lib/content";

export const Route = createFileRoute("/learn/section/$id")({
  loader: ({ params }) => {
    const section = TAX_SECTIONS.find((s) => s.id === params.id);
    if (!section) throw notFound();
    return { section };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Section ${loaderData?.section.code} — TaxBuddy India` },
      { name: "description", content: loaderData?.section.summary ?? "" },
    ],
  }),
  component: SectionDetail,
  notFoundComponent: () => (
    <div className="px-6 pt-20 text-center">
      <h1 className="text-xl font-bold">Section not found</h1>
      <Link to="/learn" className="mt-3 inline-block text-brand-green">
        Back to library
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="px-6 pt-20 text-center">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <button onClick={reset} className="mt-3 text-brand-green">Retry</button>
    </div>
  ),
});

function SectionDetail() {
  const { section } = Route.useLoaderData() as { section: TaxSection };

  return (
    <main className="font-sans">
      <header className="flex items-center justify-between px-6 pt-10 pb-3">
        <Link
          to="/learn"
          className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <span className="text-xs font-semibold text-muted-foreground">
          {section.category}
        </span>
        <div className="size-10" />
      </header>

      <section className="px-6 py-4">
        <div className="rounded-[24px] bg-foreground p-6 text-background">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-background/60">
            Section {section.code}
          </p>
          <h1 className="mb-3 text-2xl font-bold leading-tight">{section.title}</h1>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-sm">
            <span className="text-background/70">Max deduction</span>{" "}
            <span className="font-bold">{section.maxDeduction}</span>
          </div>
        </div>
      </section>

      <Section title="What is this section?">
        <p className="text-sm leading-relaxed text-foreground">{section.summary}</p>
      </Section>

      <Section title="Who can use it?" icon={<Users className="size-4" />}>
        <p className="text-sm leading-relaxed text-foreground">{section.whoCanUse}</p>
      </Section>

      <Section title="Real-life examples" icon={<Check className="size-4" />}>
        <ul className="space-y-2">
          {section.examples.map((e, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-green" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Documents required" icon={<FileText className="size-4" />}>
        <ul className="space-y-2">
          {section.documents.map((d, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Common mistakes" icon={<AlertTriangle className="size-4" />}>
        <ul className="space-y-2">
          {section.commonMistakes.map((m, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-orange" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="px-6 pb-8 pt-2">
        <Link
          to="/calculator"
          className="block rounded-xl bg-foreground py-3.5 text-center text-sm font-bold text-background"
        >
          Use this in my calculation
        </Link>
      </section>
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-3">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {icon}
          {title}
        </h3>
        {children}
      </div>
    </section>
  );
}