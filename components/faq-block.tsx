import type { ReactNode } from "react";

import type { FaqEntry } from "../lib/seo/site-metadata";

export function FaqSection(args: {
  title?: string;
  faqs: FaqEntry[];
}) {
  const { title = "FAQ", faqs } = args;

  if (!faqs.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-medium text-stone-100">{faq.question}</h3>
            <p className="mt-1 text-stone-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqSchema({ faqs }: { faqs: FaqEntry[] }) {
  if (!faqs.length) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

export function WithSchema({ children, schema }: { children: ReactNode; schema: ReactNode }) {
  return (
    <>
      {schema}
      {children}
    </>
  );
}
