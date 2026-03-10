import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, Zap, Target, Users, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import EventCard from "../components/events/EventCard";
import EventDialog from "../components/events/EventDialog";
import { useEvents } from "@/hooks/useLocalData";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Check for URL parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, []);

  const { data: events, isLoading } = useEvents(searchTerm, selectedType);

  // Events are already filtered by the useEvents hook
  const filteredEvents = events;

  const typeIcons = {
    "Lightning Session": Zap,
    Workshop: Target,
    "Ship Session": Sparkles,
    "Social": Users,
    "Partner": Handshake,
  };

  return (
    <div className="min-h-screen" style={{ background: '#0f1011' }}>
      {/* Header */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                 style={{
                   backgroundColor: 'rgba(229, 254, 87, 0.12)',
                   color: '#E5FE57',
                   letterSpacing: '0.06em'
                 }}>
              <Sparkles className="w-4 h-4" />
              COMMUNITY EVENTS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn, Build, and Connect
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Join our events to connect, learn, build, and ship with leaders in the Ohio tech community
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                placeholder="Search events by title, topic, or speaker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-white/10 focus:border-[#E5FE57]/50"
                style={{
                  background: 'rgba(17, 18, 20, 0.8)',
                  color: 'white'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Type Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-1 md:grid-cols-6 gap-2 md:gap-0 md:h-12 h-auto p-2"
                      style={{ background: 'rgba(17, 18, 20, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <TabsTrigger value="All" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-center">
                All Events
              </TabsTrigger>
              <TabsTrigger value="Lightning Session" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-start md:justify-center">
                <Zap className="w-4 h-4 mr-2" />
                Lightning
              </TabsTrigger>
              <TabsTrigger value="Workshop" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-start md:justify-center">
                <Target className="w-4 h-4 mr-2" />
                Workshops
              </TabsTrigger>
              <TabsTrigger value="Ship Session" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-start md:justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Ship
              </TabsTrigger>
              <TabsTrigger value="Social" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-start md:justify-center">
                <Users className="w-4 h-4 mr-2" />
                Social
              </TabsTrigger>
              <TabsTrigger value="Partner" className="text-sm data-[state=active]:bg-[#E5FE57] data-[state=active]:text-[#0f1011] justify-start md:justify-center">
                <Handshake className="w-4 h-4 mr-2" />
                Partner
              </TabsTrigger>
            </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-400">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/10 rounded w-1/2 mb-4" />
                <div className="h-20 bg-white/10 rounded mb-4" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border"
               style={{
                 background: 'rgba(26, 27, 30, 0.78)',
                 borderColor: 'rgba(255, 255, 255, 0.08)',
                 borderStyle: 'dashed'
               }}>
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
            <h3 className="text-lg font-semibold text-white mb-2">No events found</h3>
            <p className="text-zinc-500">Try adjusting your search or filters</p>
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
                  icon={typeIcons[event.type]}
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