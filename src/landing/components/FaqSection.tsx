import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const faqs = [
    {
      q: 'What is the ObjectFlow Playbook?',
      a: 'ObjectFlow is a guided playbook that walks you through a five-stage workflow for creating talking-object AI videos, from developing your concept to joining and publishing your clips.'
    },
    {
      q: 'Is it suitable for beginners?',
      a: 'The playbook provides step-by-step guidance. You should review the required tools and accounts in the Get Ready stage before starting.'
    },
    {
      q: 'Is ₹299 a recurring payment?',
      a: 'No. The course offer is a one-time payment of ₹299.'
    },
    {
      q: 'How will I access the course after purchasing?',
      a: 'After you complete your manual UPI payment and upload your payment screenshot, our team verifies the transaction. Once verified, your course access credentials and private dashboard link are dispatched directly to your WhatsApp and email.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="landing-section faq-section" id="faq">
      <div className="section-container faq-container">
        <div className="section-header text-center">
          <span className="section-badge">CLEAR ANSWERS</span>
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="section-subtitle">
            Everything you need to know about the ObjectFlow Playbook and how the course works.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div 
                key={idx} 
                className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq-q-number">0{idx + 1}</span>
                  <span className="faq-q-title">{faq.q}</span>
                  <span className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={20} />
                  </span>
                </button>

                {isOpen && (
                  <div 
                    id={`faq-answer-${idx}`}
                    className="faq-answer-panel"
                  >
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
