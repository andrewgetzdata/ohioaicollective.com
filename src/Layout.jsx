import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";


const navigationItems = [
  {
    title: "MISSION",
    url: createPageUrl("Mission"),
  },
  {
    title: "COLLECTIVE",
    url: createPageUrl("Community"),
  },
  {
    title: "JOBS",
    url: createPageUrl("Jobs"),
  },
  {
    title: "EVENTS",
    url: createPageUrl("Events"),
  },
  {
    title: "CALENDAR",
    url: createPageUrl("Calendar"),
  },
];

const pageTitles = {
  Home: "Home",
  Mission: "Mission",
  Community: "Collective",
  Jobs: "Jobs",
  Events: "Events",
  Calendar: "Calendar",
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const title = pageTitles[currentPageName] || currentPageName;
    document.title = `OAC | ${title}`;
  }, [currentPageName]);

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F2] border-b border-[#1A1A1A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <span className="text-xl font-bold tracking-tight uppercase" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                OAC
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
                    className={`px-4 py-2 transition-all font-medium text-sm uppercase`}
                    style={{
                      letterSpacing: '0.08em',
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      color: isActive ? '#D14D28' : '#1A1A1A',
                      borderBottom: isActive ? '2px solid #D14D28' : '2px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#D14D28';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#1A1A1A';
                    }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1A1A1A]"
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
          <div className="md:hidden bg-[#F7F7F2] border-t border-[#1A1A1A]">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 font-medium text-sm uppercase transition-all`}
                    style={{
                      letterSpacing: '0.08em',
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      color: isActive ? '#D14D28' : '#1A1A1A',
                      borderLeft: isActive ? '2px solid #D14D28' : '2px solid transparent',
                    }}
                  >
                    {item.title}
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
      <footer className="bg-[#F7F7F2] border-t-2 border-[#1A1A1A] mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold uppercase" style={{ color: '#D14D28', fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                  Ohio AI Collective
                </span>
              </div>
              <p className="text-sm text-[#1A1A1A]/70 font-mono">
                Building decentralized, open AI for local innovation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-4 uppercase text-sm" style={{ letterSpacing: '0.08em' }}>Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.url}
                      className="text-[#1A1A1A]/70 hover:text-[#D14D28] transition-colors font-mono"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-4 uppercase text-sm" style={{ letterSpacing: '0.08em' }}>Community</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-mono">
                Join our collective of AI builders, researchers, and innovators across Ohio.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#1A1A1A] text-center text-sm text-[#1A1A1A]/50 font-mono">
            &copy; 2026 Ohio AI Collective. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
