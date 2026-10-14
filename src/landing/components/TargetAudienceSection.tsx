import React from 'react';
import { Video, Megaphone, Store, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const audiences = [
    {
      num: '01',
      title: 'Content Creators',
      desc: 'Explore talking-object videos as a creative, high-retention addition to your Reels, YouTube Shorts, and TikTok storytelling.',
      icon: <Video size={24} />,
      tag: 'Reels, YouTube Shorts & TikTok Storytellers'
    },
    {
      num: '02',
      title: 'Digital Marketers',
      desc: 'Experiment with attention-grabbing AI video creatives for direct-response campaigns, product promotions, and brand awareness ads.',
      icon: <Megaphone size={24} />,
      tag: 'Direct Response & High-CTR Video Ads'
    },
    {
      num: '03',
      title: 'Small Business Owners',
      desc: 'Turn your everyday physical or digital products into entertaining talking characters that showcase benefits and drive sales.',
      icon: <Store size={24} />,
      tag: 'E-commerce, Local Stores & Product Makers'
    },
    {
      num: '04',
      title: 'Social Media Managers',
      desc: 'Add a fresh, viral format to your content calendar and deliver high-engagement concepts to your clients without high production costs.',
      icon: <Share2 size={24} />,
      tag: 'Agencies, Freelancers & Account Managers'
    },
    {
      num: '05',
      title: 'AI Curious Beginners',
      desc: 'Follow clear, step-by-step guided stages and master how modern AI video tools fit together — zero prior experience required.',
      icon: <Sparkles size={24} />,
      tag: 'Anyone Wanting Practical, Hands-On AI Skills'
    }
  ];

  return (
    <section className="landing-section audience-section" id="audience">
      <div className="section-container audience-container">
        <div className="audience-two-col-layout">

          {/* LEFT: Both Posters Stacked */}
          <div className="audience-poster-col">
            <div className="audience-poster-sticky-wrap">
              <div className="audience-poster-card">
                <img
                  src="/audience-poster.jpg"
                  alt="THYNK Digital Solutions - AI Viral Video Creation Playbook with Gokul Ravi"
                  className="audience-poster-img"
                  loading="lazy"
                />
              </div>

              <div className="audience-poster-card">
                <img
                  src="/audience-poster-2.jpg"
                  alt="Made For People With Ideas To Share - ObjectFlow Benefits Infographic"
                  className="audience-poster-img audience-poster-img-secondary"
                  loading="lazy"
                />
              </div>

              <div className="audience-poster-caption">
                <div className="poster-caption-pill">
                  <CheckCircle2 size={16} className="caption-check-icon" />
                  <span>Practical Step-by-Step Workflow Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content in Order with Larger Fonts */}
          <div className="audience-content-col">
            <div className="audience-header-block">
              <span className="audience-badge">WHO SHOULD LEARN OBJECTFLOW</span>
              <h2 className="audience-heading">
                Made For People With <span className="text-green-accent">Ideas To Share</span>
              </h2>
              <p className="audience-subtext">
                Whether you're exploring AI creativity for the first time or looking for a structured, repeatable way to create scroll-stopping social media content — ObjectFlow gives you a battle-tested workflow to practise.
              </p>
            </div>

            {/* Ordered Audience List */}
            <div className="audience-ordered-list">
              {audiences.map((aud) => (
                <div key={aud.num} className="audience-ordered-item">
                  <div className="audience-item-left">
                    <span className="audience-step-num">{aud.num}</span>
                    <div className="audience-step-icon">{aud.icon}</div>
                  </div>
                  <div className="audience-item-body">
                    <div className="audience-item-header">
                      <h3 className="audience-item-title">{aud.title}</h3>
                      <span className="audience-item-tag">{aud.tag}</span>
                    </div>
                    <p className="audience-item-desc">{aud.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
