import  { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "What is this for?",
      answer: "YouTube authentication is required so only you can host streams for your videos.",
    },
    {
      question: "What data are you accessing?",
      answer: "StreamSync only accesses all publicly available data related to live streams from your channel.",
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };
  
  return (
    <div className="w-full space-y-1 mt-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="w-full border-b border-slate-700 last:border-b-0 group"
        >
          <div
            className="flex justify-between items-center py-3 px-1 cursor-pointer 
            hover:bg-slate-800/50 transition-all duration-300 ease-in-out
            active:bg-slate-800/70"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-sm text-gray-200 flex-grow group-hover:text-white transition-colors">
              {faq.question}
            </h3>
            <ChevronDown
              className={`
                w-4 h-4 text-gray-400 transition-all duration-300
                group-hover:text-white
                ${openIndex === index ? 'rotate-180 text-white' : ''}
              `}
            />
          </div>
          {openIndex === index && (
            <p className="text-xs text-gray-400 pb-2 px-1 animate-fade-in">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
