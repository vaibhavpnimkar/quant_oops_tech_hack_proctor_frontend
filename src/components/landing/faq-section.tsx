import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How are users being proctored manually?",
    answer:
      "The organization assigns some admins also known as proctors to view all the student users live who are giving the exams. Furthermore, they can take actions against the suspicious user.",
  },
  {
    question: "How to create an exam?",
    answer:
      "An organization can create an exam from the organization interface. The exam date, time limit, type of exam, creating/modifying questions and other configurations can be implemented.",
  },
  {
    question: "How are students being verified?",
    answer:
      "User verification is done by facial scanning at the time of registration and autherization.",
  },
  {
    question: "What is Full Screen Mode in a quiz?",
    answer:
      "Full Screen Mode in a quiz makes sure that the participants do not switch tabs. They will be thrown out of the quiz and would not be able to attempt it further if they violate the Full Screen Mode.",
  },
  // {
  //   question: "What's the best thing about Switzerland?",
  //   answer:
  //     "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  // },
  // {
  //   question: "What's the best thing about Switzerland?",
  //   answer:
  //     "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  // },
  // More questions...
];

export const FAQSection = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-0 space-y-6 divide-y divide-gray-900/10">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index: number) => (
                <AccordionItem value={`item-${index + 1}`} key={faq.question}>
                  <AccordionTrigger className="flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </dl>
        </div>
      </div>
    </div>
  );
};
