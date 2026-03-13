import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Briefcase, CalendarDays, Target } from "lucide-react";
import { motion } from "framer-motion";
import HeroAmbient from "../components/home/HeroAmbient";
import { usePartners } from "@/hooks/useLocalData";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "WHERE DATA + AI PROFESSIONALS UNITE";

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

  const { data: partners, isLoading: partnersLoading } = usePartners();

  const initiatives = [
    {
      icon: Briefcase,
      title: "Jobs",
      description: "Find your next role in Ohio's AI and data ecosystem",
      link: createPageUrl("Jobs"),
    },
    {
      icon: CalendarDays,
      title: "Events",
      description: "Connect at lightning talks, ship sessions, and more",
      link: createPageUrl("Events"),
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "Learn about our vision for open, decentralized AI",
      link: createPageUrl("Mission"),
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

            <p className="text-lg text-[#1A1A1A] mb-12 max-w-2xl leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
              Join the largest and most vibrant community of builders in Ohio. Learn, grow, and build together.
            </p>

            <div className="flex justify-start">
              <a href="https://ohioaicollective.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer">
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

          {/* Initiatives Grid */}
          <div className="relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Link to={initiative.link}>
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

      {/* Stats Section */}
      <section className="py-16 bg-[#F7F7F2] oac-grid-bg border-t-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Community Members", value: "300+" },
              { label: "Events Hosted", value: "20+" },
              { label: "Event Types", value: "4+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-[#1A1A1A]/70 text-sm uppercase tracking-wide font-medium" style={{ fontFamily: 'Geist Mono, monospace' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-16 border-t-2 border-[#1A1A1A] bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A1A] mb-12 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              Our Partners
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-16">
              {partners.map((partner) => {
                const heightClasses = {
                  small: "h-30 md:h-32",
                  medium: "h-36 md:h-40",
                  large: "h-40 md:h-48"
                };
                const heightClass = heightClasses[partner.logo_height || "large"];

                return (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center"
                  >
                    {partner.website_url ? (
                      <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className={`${heightClass} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity`}
                        />
                      </a>
                    ) : (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className={`${heightClass} w-auto object-contain opacity-80`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Community Section */}
      <section className="py-20 border-t-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                Built by the community,
                <br />
                <span style={{ color: '#D14D28' }}>
                  for the community
                </span>
              </h2>
              <p className="text-lg text-[#1A1A1A]/70 mb-6 leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
                Ohio AI Collective is a thriving community where professionals connect, learn, and grow together.
                We create inclusive spaces for knowledge sharing, skill building, and meaningful collaboration
                across all experience levels.
              </p>
              <ul className="space-y-4">
                {[
                  "Connect with industry experts and peers",
                  "Access exclusive learning opportunities",
                  "Find your next career opportunity",
                  "Contribute and give back to the community",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-[#1A1A1A]" />
                    </div>
                    <span className="text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Community collaboration"
                style={{
                  boxShadow: '8px 8px 0px 0px #1A1A1A',
                  border: '2px solid #1A1A1A'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
