import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Briefcase, Calendar, Ticket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Jobs",
    url: createPageUrl("Jobs"),
    icon: Briefcase,
  },
  {
    title: "Events",
    url: createPageUrl("Events"),
    icon: Ticket,
  },
  {
    title: "Calendar",
    url: createPageUrl("Calendar"),
    icon: Calendar,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1011]">
      <style>{`
        :root {
          --forge-lime: #E5FE57;
          --forge-teal: #00F5A0;
          --forge-cyan: #1FC9FF;
          --forge-dark: #0f1011;
          --forge-dark-card: #111214;
        }
        
        body {
          background: 
            radial-gradient(circle at 12% -8%, rgba(229, 254, 87, 0.14), transparent 45%),
            radial-gradient(circle at 82% 10%, rgba(31, 201, 255, 0.12), transparent 42%),
            #0f1011;
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111214]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6910bba3f3d0053b1743a9b3/d3f628c61_Version1-Photoroom.png" 
                alt="Forge Logo" 
                className="w-7 h-7 transition-transform group-hover:scale-110"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-xl font-bold tracking-tight" style={{ color: '#E5FE57', fontFamily: 'ui-rounded, system-ui, sans-serif' }}>
                forge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                      isActive
                        ? "text-[#E5FE57]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111214] border-t border-white/5">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                      isActive
                        ? "bg-[#E5FE57]/10 text-[#E5FE57]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-[#111214] border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6910bba3f3d0053b1743a9b3/d3f628c61_Version1-Photoroom.png" 
                  alt="Forge Logo" 
                  className="w-6 h-6"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-lg font-bold" style={{ color: '#E5FE57', fontFamily: 'ui-rounded, system-ui, sans-serif' }}>forge</span>
              </div>
              <p className="text-sm text-zinc-400">
                Building the future of data together, one session at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.url}
                      className="text-zinc-400 hover:text-[#E5FE57] transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <p className="text-sm text-zinc-400">
                Join our vibrant data and AI community and connect with like-minded professionals.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-zinc-500">
            © 2025 Forge Data Community. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}