import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Rocket, BookOpen, Map, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroAmbient from "../components/home/HeroAmbient";
import BlinkingDots from "../components/animations/BlinkingDots";
import ThinkingBlob from "../components/animations/ThinkingBlob";
import DataFlow from "../components/animations/DataFlow";

export default function Mission() {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "FORGING THE FUTURE OF INTELLIGENCE";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  const initiatives = [
    {
      icon: Rocket,
      title: "Community Solutions",
      description: "AI-powered tools and applications that solve real problems for Ohio communities",
    },
    {
      icon: BookOpen,
      title: "AI Literacy & Ethics",
      description: "Helping Ohio understand AI and use it responsibly",
    },
    {
      icon: Map,
      title: "Localized Datasets",
      description: "Ohio-specific datasets that fuel locally relevant AI solutions",
    },
  ];

  const expandedSections = [
    {
      title: "Community Solutions",
      icon: Rocket,
      paragraphs: [
        "We build AI-powered tools and applications that solve real problems for Ohio — local government dashboards, small business automation, nonprofit data tools, and more.",
        "Members collaborate through ship sessions and hackathons to take ideas from concept to deployment, creating practical solutions that serve our communities.",
      ],
      animation: "blinkingDots",
      reversed: false,
    },
    {
      title: "AI Literacy & Ethics",
      icon: BookOpen,
      paragraphs: [
        "We help Ohio's businesses, nonprofits, and local government understand AI — what it can do, how it works, and where the risks are. Workshops, explainers, and hands-on demos for technical and non-technical audiences alike.",
        "We also champion responsible adoption: bias awareness, governance frameworks, and community review processes so AI deployed in Ohio is accountable and trustworthy.",
      ],
      animation: "thinkingBlob",
      reversed: true,
    },
    {
      title: "Localized Datasets",
      icon: Map,
      paragraphs: [
        "Ohio-specific datasets covering regional economics, agriculture, urban planning, and public health — the local nuances that power our community solutions and tools.",
        "We partner with local institutions and businesses to ethically source data that reflects Ohio's landscape, with open access for research and development.",
      ],
      animation: "dataFlow",
      reversed: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 oac-grid-bg" style={{ background: '#F7F7F2' }}>
        <HeroAmbient />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-8 border-2 border-[#1A1A1A]"
                 style={{
                   backgroundColor: '#F7F7F2',
                   color: '#1A1A1A',
                   letterSpacing: '0.08em',
                   fontFamily: 'Geist Mono, monospace'
                 }}>
              OHIO AI COLLECTIVE
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-left" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              <span>{typedText}</span>
              <span className="inline-block w-1 h-16 md:h-20 bg-[#D14D28] ml-1" style={{
                verticalAlign: 'middle',
                animation: 'blink 1s infinite'
              }} />
            </h1>

            <style>{`
              @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
              }
            `}</style>

            <p className="text-lg text-[#1A1A1A] mb-12 max-w-2xl leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
              BUILDING DECENTRALIZED, OPEN AI FOR LOCAL INNOVATION
            </p>

            <div className="flex justify-start">
              <a href="https://joinforge.beehiiv.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg px-8 font-semibold uppercase"
                        style={{
                          backgroundColor: '#D14D28',
                          color: '#1A1A1A',
                          boxShadow: '4px 4px 0px 0px #1A1A1A',
                          letterSpacing: '0.04em',
                          fontFamily: 'Geist Sans, system-ui, sans-serif'
                        }}>
                  Subscribe to our newsletter
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Initiative Cards Grid */}
          <div className="relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Link to={createPageUrl("Community")}>
                    <div className="p-6 border-2 border-[#1A1A1A] transition-all duration-300 group cursor-pointer h-full bg-[#F7F7F2]"
                         style={{ boxShadow: '4px 4px 0px 0px #1A1A1A' }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translate(-2px, -2px)';
                           e.currentTarget.style.boxShadow = '6px 6px 0px 0px #1A1A1A';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translate(0, 0)';
                           e.currentTarget.style.boxShadow = '4px 4px 0px 0px #1A1A1A';
                         }}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4 border-2 border-[#D14D28]">
                        <initiative.icon className="w-6 h-6" style={{ color: '#D14D28' }} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                        {initiative.title}
                      </h3>
                      <p className="text-[#1A1A1A]/70 text-sm" style={{ fontFamily: 'Geist Mono, monospace' }}>
                        {initiative.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Initiative Sections */}
      {expandedSections.map((section) => (
        <section key={section.title} className="py-20 border-t-2 border-[#1A1A1A] bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={section.reversed ? 'md:order-2' : ''}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border-2 border-[#D14D28]">
                    <section.icon className="w-5 h-5" style={{ color: '#D14D28' }} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                    {section.title}
                  </h2>
                </div>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-[#1A1A1A]/70 mb-4 leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    {paragraph}
                  </p>
                ))}
                <Link to={createPageUrl("Community")} className="inline-flex items-center gap-2 mt-4 font-semibold uppercase transition-colors hover:opacity-80" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif', letterSpacing: '0.04em' }}>
                  Get involved <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={section.reversed ? 'md:order-1' : ''}>
                {section.animation === "blinkingDots" && <BlinkingDots />}
                {section.animation === "thinkingBlob" && <ThinkingBlob />}
                {section.animation === "dataFlow" && <DataFlow />}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}