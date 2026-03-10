import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Sparkles, Calendar, Zap, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import HeroAmbient from "../components/home/HeroAmbient";
import { usePartners } from "@/hooks/useLocalData";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "where data + AI professionals unite";
  
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

  const features = [
    {
      icon: Briefcase,
      title: "Job Board",
      description: "Discover opportunities in the data ecosystem",
      link: createPageUrl("Jobs"),
      color: "rgba(31, 201, 255, 0.15)",
    },
    {
      icon: Zap,
      title: "Lightning Sessions",
      description: "Quick, impactful talks from data leaders",
      link: createPageUrl("Events") + "?type=Lightning%20Session",
      color: "rgba(229, 254, 87, 0.15)",
    },
    {
      icon: Target,
      title: "Workshops",
      description: "Hands-on learning experiences",
      link: createPageUrl("Events") + "?type=Workshop",
      color: "rgba(168, 85, 247, 0.15)",
    },
    {
      icon: Sparkles,
      title: "Ship Sessions",
      description: "Build and launch projects together",
      link: createPageUrl("Events") + "?type=Ship%20Session",
      color: "rgba(236, 72, 153, 0.15)",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20" style={{ background: '#0f1011' }}>
        <HeroAmbient />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8" 
                 style={{ 
                   backgroundColor: 'rgba(229, 254, 87, 0.12)', 
                   color: '#E5FE57',
                   letterSpacing: '0.06em'
                 }}>
              <Sparkles className="w-4 h-4" />
              WELCOME TO FORGE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span>{typedText}</span>
              {!isTypingComplete && (
                <span className="inline-block w-1 h-16 md:h-20 bg-[#E5FE57] ml-1 animate-pulse" style={{ verticalAlign: 'middle' }} />
              )}
              {isTypingComplete && (
                <span className="inline-block w-1 h-16 md:h-20 bg-[#E5FE57] ml-1" style={{ 
                  verticalAlign: 'middle',
                  animation: 'blink 1s infinite'
                }} />
              )}
            </h1>
            
            <style>{`
              @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
              }
            `}</style>
            
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the largest and most vibrant community of builders in Ohio.
              <br />
              Learn, grow, and build together.
            </p>
            
            <div className="flex justify-center">
              <a href="https://joinforge.beehiiv.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="text-lg px-8 font-semibold" 
                        style={{ 
                          backgroundColor: '#E5FE57', 
                          color: '#0f1011',
                          boxShadow: '0 18px 34px rgba(229, 254, 87, 0.28)'
                        }}>
                  Subscribe to our newsletter
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Link to={feature.link}>
                    <div className="p-6 rounded-2xl border transition-all duration-300 group cursor-pointer h-full"
                         style={{ 
                           background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.78), rgba(24, 24, 27, 0.92))',
                           backdropFilter: 'blur(6px)',
                           borderColor: 'transparent'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.borderColor = 'rgba(229, 254, 87, 0.35)';
                           e.currentTarget.style.transform = 'translateY(-4px)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.borderColor = 'transparent';
                           e.currentTarget.style.transform = 'translateY(0)';
                         }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                           style={{ backgroundColor: feature.color }}>
                        <feature.icon className="w-6 h-6" style={{ color: '#E5FE57' }} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 text-sm">
                        {feature.description}
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
      <section className="py-16" style={{ background: 'linear-gradient(135deg, rgba(17, 18, 20, 0.88), rgba(43, 45, 49, 0.9))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { label: "Community Members", value: "300+" },
              { label: "Events Hosted", value: "20+" },
              { label: "Event Types", value: "4+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#E5FE57' }}>
                  {stat.value}
                </div>
                <div className="text-zinc-400 text-sm uppercase tracking-wide font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-16 border-t border-white/5" style={{ background: '#0f1011' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
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
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Built by the community,
                <br />
                <span style={{ color: '#E5FE57' }}>
                  for the community
                </span>
              </h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
                Forge is a thriving data community where professionals connect, learn, and grow together. 
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
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                         style={{ backgroundColor: 'rgba(229, 254, 87, 0.12)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E5FE57' }} />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Community collaboration"
                className="rounded-2xl"
                style={{ 
                  boxShadow: '0 40px 80px rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}