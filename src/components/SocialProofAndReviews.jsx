import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';
import { REVIEWS, FAQS } from '../services/bundlesData';

export default function SocialProofAndReviews() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Reviews Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            Real Customer Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading">
            Trusted by <span className="text-emerald-400">18,400+ Indians</span> Daily
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            See how Mugwort herbal heat is helping grandparents climb stairs, yoga practitioners stretch, and desk workers relieve joint fatigue.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-xl"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  "{review.title}"
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                  {review.comment}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-neutral-850 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-neutral-400 text-[11px]">{review.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-300 bg-neutral-900 px-2 py-1 rounded block">
                    {review.bundleBought.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Got Questions? We Have Answers.
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
