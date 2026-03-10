import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, Zap, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import EventCard from "../components/events/EventCard";
import EventDialog from "../components/events/EventDialog";
import { useEvents } from "@/hooks/useLocalData";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, []);

  const { data: events, isLoading } = useEvents(searchTerm, selectedType);
  const filteredEvents = events;

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      {/* Header */}
      <section className="py-16 border-b-2 border-[#1A1A1A] oac-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-4 border-2 border-[#1A1A1A]"
                 style={{
                   backgroundColor: '#F7F7F2',
                   color: '#1A1A1A',
                   letterSpacing: '0.08em',
                   fontFamily: 'Geist Mono, monospace'
                 }}>
              <Sparkles className="w-4 h-4" />
              COMMUNITY EVENTS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              Learn, Build, and Connect
            </h1>
            <p className="text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Geist Mono, monospace' }}>
              Join our events to connect, learn, build, and ship with leaders in the Ohio tech community
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1A1A1A]/40" />
              <Input
                placeholder="Search events by title, topic, or speaker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-[#1A1A1A] focus:border-[#D14D28] bg-[#F7F7F2] text-[#1A1A1A]"
                style={{ fontFamily: 'Geist Mono, monospace' }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Type Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-1 md:grid-cols-4 gap-2 md:gap-0 md:h-12 h-auto p-2 bg-[#F7F7F2] border-2 border-[#1A1A1A]">
              <TabsTrigger value="All" className="text-sm data-[state=active]:bg-[#D14D28] data-[state=active]:text-[#F7F7F2] uppercase font-semibold justify-center" style={{ letterSpacing: '0.06em' }}>
                All
              </TabsTrigger>
              <TabsTrigger value="Lightning Session" className="text-sm data-[state=active]:bg-[#D14D28] data-[state=active]:text-[#F7F7F2] justify-start md:justify-center">
                <Zap className="w-4 h-4 mr-2" />
                Lightning Talk
              </TabsTrigger>
              <TabsTrigger value="Ship Session" className="text-sm data-[state=active]:bg-[#D14D28] data-[state=active]:text-[#F7F7F2] justify-start md:justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Ship Session
              </TabsTrigger>
              <TabsTrigger value="Partner" className="text-sm data-[state=active]:bg-[#D14D28] data-[state=active]:text-[#F7F7F2] justify-start md:justify-center">
                <Handshake className="w-4 h-4 mr-2" />
                Partner Event
              </TabsTrigger>
            </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#1A1A1A]/60" style={{ fontFamily: 'Geist Mono, monospace' }}>
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-2 border-[#1A1A1A] p-6 animate-pulse bg-[#F7F7F2]">
                <div className="h-4 bg-[#1A1A1A]/10 w-3/4 mb-3" />
                <div className="h-3 bg-[#1A1A1A]/10 w-1/2 mb-4" />
                <div className="h-20 bg-[#1A1A1A]/10 mb-4" />
                <div className="h-3 bg-[#1A1A1A]/10 w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-[#1A1A1A] bg-[#F7F7F2]">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#1A1A1A]/30" />
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 uppercase">No events found</h3>
            <p className="text-[#1A1A1A]/50" style={{ fontFamily: 'Geist Mono, monospace' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <EventCard
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                  icon={null}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
