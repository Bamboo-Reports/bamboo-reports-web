import StructuredData from "@/components/StructuredData";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export type QuestionItem = { question: string; answer: string };

/**
 * Plain question-and-answer accordion for service pages, with matching
 * FAQPage structured data. Answers stay in the HTML when collapsed, so
 * search and answer engines read every one. The first item starts open.
 */
const QuestionList = ({ title, items }: { title: string; items: QuestionItem[] }) => (
  <Section bordered>
    <StructuredData type="faq" data={{ questions: items }} />
    <Container className="flex flex-col gap-8">
      <SectionHeading eyebrow="Questions" title={title} />
      <div>
        {items.map((item, index) => (
          <details key={item.question} open={index === 0} className="group border-t border-line py-4 last:border-b">
            <summary className="flex cursor-pointer list-none items-baseline gap-3 text-lg font-semibold text-ink transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="inline-block text-primary transition-transform group-open:rotate-90 motion-reduce:transition-none"
              >
                ›
              </span>
              {item.question}
            </summary>
            <p className="max-w-[70ch] pl-6 pt-2 leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  </Section>
);

export default QuestionList;
