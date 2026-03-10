import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { motion } from "framer-motion";
import EventDialog from "../components/events/EventDialog";
import { useAllEvents } from "@/hooks/useLocalData";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: events, isLoading } = useAllEvents();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, day);
    });
  };

  const eventTypeColors = {
    "Lightning Session": { bg: "rgba(229, 254, 87, 0.12)", text: "#E5FE57", border: "rgba(229, 254, 87, 0.3)" },
    "Workshop": { bg: "rgba(168, 85, 247, 0.12)", text: "#A855F7", border: "rgba(168, 85, 247, 0.3)" },
    "Ship Session": { bg: "rgba(236, 72, 153, 0.12)", text: "#EC4899", border: "rgba(236, 72, 153, 0.3)" },
    "Social": { bg: "rgba(34, 211, 238, 0.12)", text: "#22D3EE", border: "rgba(34, 211, 238, 0.3)" },
    "Partner": { bg: "rgba(0, 245, 160, 0.12)", text: "#00F5A0", border: "rgba(0, 245, 160, 0.3)" },
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 5);

  return (
    <div className="min-h-screen" style={{ background: '#0f1011' }}>
      {/* Header */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                 style={{ 
                   backgroundColor: 'rgba(229, 254, 87, 0.12)', 
                   color: '#E5FE57',
                   letterSpacing: '0.06em'
                 }}>
              <CalendarIcon className="w-4 h-4" />
              EVENT CALENDAR
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Data and AI Community Calendar
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Stay up to date with all upcoming data and AI events and sessions
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar - Order 1 on desktop, Order 3 on mobile */}
          <div className="lg:col-span-2 order-3 lg:order-1">
            <div className="p-6 rounded-2xl border"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(17, 17, 18, 0.92), rgba(24, 24, 28, 0.88))',
                   borderColor: 'rgba(255, 255, 255, 0.08)',
                   boxShadow: '0 30px 60px rgba(0, 0, 0, 0.35)'
                 }}>
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                
                <div className="flex items-center gap-2">
                  <a href="https://calendar.google.com/calendar/u/0?cid=YTI1OGY5MzBhZjAzNjlkZjhmOWNkMjUzMTA0MWViNTIyODgzZDZkNzVhNDJkOGE0ODFhYWI1MzY0NDMwZmVjMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      className="font-semibold"
                      style={{ 
                        color: '#0f1011', 
                        backgroundColor: '#E5FE57',
                        border: 'none'
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Subscribe</span>
                    </Button>
                  </a>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/10 hover:bg-white/5"
                      style={{ color: '#0f1011', backgroundColor: 'white' }}
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 hidden sm:flex"
                      style={{ color: '#0f1011', backgroundColor: '#E5FE57' }}
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/10 hover:bg-white/5"
                      style={{ color: '#0f1011', backgroundColor: 'white' }}
                      onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-zinc-500 py-2 uppercase tracking-wide">
                    {day}
                  </div>
                ))}

                {daysInMonth.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={day.toString()}
                      className={`min-h-24 p-2 border rounded-lg ${
                        !isSameMonth(day, currentDate) ? "opacity-50" : ""
                      }`}
                      style={{
                        background: isToday ? 'rgba(229, 254, 87, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        borderColor: isToday ? 'rgba(229, 254, 87, 0.3)' : 'rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-[#E5FE57]' : 'text-zinc-400'}`}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => {
                          const colors = eventTypeColors[event.type];
                          return (
                            <button
                              key={event.title}
                              onClick={() => setSelectedEvent(event)}
                              className="w-full text-left px-2 py-1 text-xs rounded border hover:opacity-80 transition-opacity truncate"
                              style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                borderColor: colors.border
                              }}
                            >
                              {event.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - reordered for mobile */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Legend - Order 1 on mobile */}
            <div className="p-6 rounded-2xl border order-1 lg:order-2"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.78), rgba(24, 24, 27, 0.92))',
                   borderColor: 'rgba(255, 255, 255, 0.06)'
                 }}>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Event Types</h3>
              <div className="space-y-2">
                {Object.entries(eventTypeColors).map(([type, colors]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded border" 
                         style={{ 
                           backgroundColor: colors.bg,
                           borderColor: colors.border
                         }} />
                    <span className="text-sm text-zinc-400">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events - Order 2 on mobile */}
            <div className="p-6 rounded-2xl border order-2 lg:order-1"
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.78), rgba(24, 24, 27, 0.92))',
                   borderColor: 'rgba(255, 255, 255, 0.06)'
                 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-zinc-500 text-sm">No upcoming events</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const colors = eventTypeColors[event.type];
                    return (
                      <button
                        key={event.title}
                        onClick={() => setSelectedEvent(event)}
                        className="w-full text-left p-3 rounded-lg border hover:bg-white/5 transition-colors"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}
                      >
                        <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold mb-2 border"
                             style={{
                               backgroundColor: colors.bg,
                               color: colors.text,
                               borderColor: colors.border
                             }}>
                          {event.type}
                        </div>
                        <h4 className="font-medium text-white mb-2">{event.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Clock className="w-3 h-3" />
                          {format(parseISO(event.date), "MMM d, h:mm a")}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <EventDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}