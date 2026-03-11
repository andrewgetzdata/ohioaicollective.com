import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Rocket, BookOpen, Map, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Community() {
  const contributions = [
    {
      icon: Rocket,
      title: "Community Solutions",
      subtitle: "Build for Ohio",
      description: "Help build AI-powered tools and applications that solve real problems for Ohio communities — local gov dashboards, small business automation, nonprofit data tools, and more.",
      actions: [
        "Pitch and lead solution projects",
        "Ship tools at hackathons and build sessions",
        "Connect us with orgs that need solutions",
      ],
    },
    {
      icon: BookOpen,
      title: "AI Literacy & Ethics",
      subtitle: "Educate & Advocate",
      description: "Help Ohio understand and responsibly adopt AI. Lead workshops, create explainer content, and develop governance frameworks for local organizations.",
      actions: [
        "Lead or host educational workshops",
        "Create beginner-friendly AI content",
        "Help orgs develop responsible AI practices",
      ],
    },
    {
      icon: Map,
      title: "Localized Datasets",
      subtitle: "Contribute Ohio-Specific Data",
      description: "Help us curate the datasets that fuel our solutions and tools. Your local knowledge ensures our AI actually serves Ohioans.",
      actions: [
        "Source and curate Ohio-specific datasets",
        "Annotate and validate data quality",
        "Connect us with local data partners",
      ],
    },
  ];

  const highlights = [
    {
      name: "Community Spotlight",
      role: "Featured Project",
      description: "Our community members are building incredible things. From AI-powered agricultural tools to healthcare data pipelines, the projects born at OAC are making a real impact across Ohio.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
    },
    {
      name: "Member Stories",
      role: "Growing Together",
      description: "Whether you're a seasoned ML engineer or just starting your data journey, OAC is where you'll find mentors, collaborators, and friends who share your passion for building with AI.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
    },
    {
      name: "Open Source Wins",
      role: "Shipping Together",
      description: "Every ship session and hackathon produces tools that the whole community can use. Check out our growing portfolio of open-source projects built right here in Ohio.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 oac-grid-bg" style={{ background: '#F7F7F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-8 border-2 border-[#1A1A1A]"
                 style={{
                   backgroundColor: '#F7F7F2',
                   color: '#1A1A1A',
                   letterSpacing: '0.08em',
                   fontFamily: 'Geist Mono, monospace'
                 }}>
              <Users className="w-4 h-4" />
              COMMUNITY
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              JOIN THE COLLECTIVE
            </h1>

            <p className="text-lg text-[#1A1A1A] mb-8 max-w-2xl leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
              OAC is built by its members. Here's how you can contribute to our three core initiatives and help shape the future of AI in Ohio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contribution Sections */}
      {contributions.map((contribution, index) => (
        <section key={contribution.title} className="py-16 border-t-2 border-[#1A1A1A] bg-[#F7F7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 border-2 border-[#1A1A1A] bg-[#F7F7F2]"
                   style={{ boxShadow: '4px 4px 0px 0px #1A1A1A' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center border-2 border-[#D14D28]">
                    <contribution.icon className="w-7 h-7" style={{ color: '#D14D28' }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                      {contribution.title}
                    </h2>
                    <p className="text-sm font-medium" style={{ color: '#D14D28', fontFamily: 'Geist Mono, monospace' }}>
                      {contribution.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-[#1A1A1A]/70 mb-6 leading-relaxed max-w-3xl" style={{ fontFamily: 'Geist Mono, monospace' }}>
                  {contribution.description}
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  {contribution.actions.map((action) => (
                    <div key={action} className="flex items-start gap-3 p-4 border-2 border-[#1A1A1A]/20">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#D14D28]" />
                      </div>
                      <span className="text-[#1A1A1A] text-sm" style={{ fontFamily: 'Geist Mono, monospace' }}>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Community Highlights */}
      <section className="py-20 border-t-2 border-[#1A1A1A] bg-[#F7F7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-6 border-2 border-[#1A1A1A]"
                 style={{
                   backgroundColor: '#F7F7F2',
                   color: '#1A1A1A',
                   letterSpacing: '0.08em',
                   fontFamily: 'Geist Mono, monospace'
                 }}>
              <Star className="w-4 h-4" />
              HIGHLIGHTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              Community Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="border-2 border-[#1A1A1A] overflow-hidden h-full bg-[#F7F7F2] transition-all duration-300"
                     style={{ boxShadow: '4px 4px 0px 0px #1A1A1A' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translate(-2px, -2px)';
                       e.currentTarget.style.boxShadow = '6px 6px 0px 0px #1A1A1A';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translate(0, 0)';
                       e.currentTarget.style.boxShadow = '4px 4px 0px 0px #1A1A1A';
                     }}>
                  <img
                    src={highlight.image}
                    alt={highlight.name}
                    className="w-full h-48 object-cover"
                    style={{ borderBottom: '2px solid #1A1A1A' }}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>{highlight.name}</h3>
                    <p className="text-sm mb-3" style={{ color: '#D14D28', fontFamily: 'Geist Mono, monospace' }}>{highlight.role}</p>
                    <p className="text-[#1A1A1A]/70 text-sm" style={{ fontFamily: 'Geist Mono, monospace' }}>{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 border-t-2 border-[#1A1A1A] bg-[#F7F7F2] oac-grid-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
            Ready to get started?
          </h2>
          <p className="text-lg text-[#1A1A1A]/70 mb-8 leading-relaxed" style={{ fontFamily: 'Geist Mono, monospace' }}>
            Subscribe to our newsletter for the latest updates, or explore our events and job board.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://joinforge.beehiiv.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 font-semibold uppercase w-full sm:w-auto"
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
            <Link to={createPageUrl("Events")}>
              <Button size="lg" className="text-lg px-8 font-semibold uppercase w-full sm:w-auto"
                      style={{
                        backgroundColor: '#F7F7F2',
                        color: '#1A1A1A',
                        boxShadow: '4px 4px 0px 0px #1A1A1A',
                        border: '2px solid #1A1A1A',
                        letterSpacing: '0.04em',
                        fontFamily: 'Geist Sans, system-ui, sans-serif'
                      }}>
                Browse Events
              </Button>
            </Link>
            <Link to={createPageUrl("Jobs")}>
              <Button size="lg" className="text-lg px-8 font-semibold uppercase w-full sm:w-auto"
                      style={{
                        backgroundColor: '#F7F7F2',
                        color: '#1A1A1A',
                        boxShadow: '4px 4px 0px 0px #1A1A1A',
                        border: '2px solid #1A1A1A',
                        letterSpacing: '0.04em',
                        fontFamily: 'Geist Sans, system-ui, sans-serif'
                      }}>
                View Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}