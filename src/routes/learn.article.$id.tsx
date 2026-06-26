import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Lightbulb } from "lucide-react";
import { LEARN_ARTICLES, type LearnArticle } from "../lib/content";

export const Route = createFileRoute("/learn/article/$id")({
  loader: ({ params }) => {
    const article = LEARN_ARTICLES.find((a) => a.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.article.title} — TaxBuddy India` },
      { name: "description", content: loaderData?.article.blurb ?? "" },
    ],
  }),
  component: ArticleView,
  notFoundComponent: () => (
    <div className="px-6 pt-20 text-center">
      <h1 className="text-xl font-bold">Article not found</h1>
      <Link to="/learn" className="mt-3 inline-block text-brand-green">Back</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="px-6 pt-20 text-center">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <button onClick={reset} className="mt-3 text-brand-green">Retry</button>
    </div>
  ),
});

function ArticleView() {
  const { article } = Route.useLoaderData() as { article: LearnArticle };
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
          {article.readMin} min read
        </span>
        <div className="size-10" />
      </header>

      <section className="px-6 py-4">
        <div className="mb-4 inline-grid size-16 place-items-center rounded-2xl bg-brand-green-soft text-4xl">
          {article.emoji}
        </div>
        <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-foreground">
          {article.title}
        </h1>
        <p className="text-sm text-muted-foreground">{article.blurb}</p>
      </section>

      <section className="px-6 py-4">
        <p className="text-sm leading-relaxed text-foreground">{article.body}</p>
      </section>

      <section className="px-6 py-4">
        <div className="rounded-2xl border border-brand-orange-soft bg-brand-orange-soft p-5">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Lightbulb className="size-4" /> Key Takeaways
          </h3>
          <ul className="space-y-2">
            {article.takeaways.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-orange" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {article.faqs.length > 0 && (
        <section className="px-6 py-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">FAQs</h3>
          <div className="space-y-3">
            {article.faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <p className="text-sm font-bold text-foreground">{f.q}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 pb-8 pt-2">
        <Link
          to="/learn"
          className="block rounded-xl border border-border bg-card py-3.5 text-center text-sm font-bold text-foreground"
        >
          Back to library
        </Link>
      </section>
    </main>
  );
}