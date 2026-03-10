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
    "Lightning Session": { label: "Lightning Talk", bg: "rgba(209, 77, 40, 0.12)", text: "#D14D28", border: "rgba(209, 77, 40, 0.4)" },
    "Ship Session": { label: "Ship Session", bg: "rgba(37, 99, 165, 0.12)", text: "#2563A5", border: "rgba(37, 99, 165, 0.4)" },
    "Partner": { label: "Partner Event", bg: "rgba(22, 130, 93, 0.12)", text: "#16825D", border: "rgba(22, 130, 93, 0.4)" },
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      {/* Header */}
      <section className="py-16 border-b-2 border-[#1A1A1A] oac-grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-4 border-2 border-[#1A1A1A]"
                 style={{
                   backgroundColor: '#F7F7F2',
                   color: '#1A1A1A',
                   letterSpacing: '0.08em',
                   fontFamily: 'Geist Mono, monospace'
                 }}>
              <CalendarIcon className="w-4 h-4" />
              EVENT CALENDAR
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              Community Calendar
            </h1>
            <p className="text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Geist Mono, monospace' }}>
              Stay up to date with all upcoming events and sessions
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 order-3 lg:order-1">
            <div className="p-6 border-2 border-[#1A1A1A] bg-[#F7F7F2]" style={{ boxShadow: '4px 4px 0px 0px #1A1A1A' }}>
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
                  {format(currentDate, "MMMM yyyy")}
                </h2>

                <div className="flex items-center gap-2">
                  <a href="https://calendar.google.com/calendar/u/0?cid=YTI1OGY5MzBhZjAzNjlkZjhmOWNkMjUzMTA0MWViNTIyODgzZDZkNzVhNDJkOGE0ODFhYWI1MzY0NDMwZmVjMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="sm"
                      className="font-semibold uppercase"
                      style={{
                        color: '#F7F7F2',
                        backgroundColor: '#D14D28',
                        boxShadow: '2px 2px 0px 0px #1A1A1A',
                        letterSpacing: '0.04em'
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
                      className="border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2]"
                      style={{ color: '#1A1A1A', backgroundColor: '#F7F7F2' }}
                      onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-[#1A1A1A] hidden sm:flex font-semibold uppercase"
                      style={{ color: '#F7F7F2', backgroundColor: '#D14D28' }}
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F7F2]"
                      style={{ color: '#1A1A1A', backgroundColor: '#F7F7F2' }}
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
                  <div key={day} className="text-center text-sm font-medium text-[#1A1A1A]/50 py-2 uppercase tracking-wide" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    {day}
                  </div>
                ))}

                {daysInMonth.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={day.toString()}
                      className={`min-h-24 p-2 border ${
                        !isSameMonth(day, currentDate) ? "opacity-50" : ""
                      }`}
                      style={{
                        background: isToday ? 'rgba(209, 77, 40, 0.08)' : '#F7F7F2',
                        borderColor: isToday ? '#D14D28' : '#1A1A1A',
                        borderWidth: isToday ? '2px' : '1px'
                      }}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-[#D14D28] font-bold' : 'text-[#1A1A1A]/60'}`} style={{ fontFamily: 'Geist Mono, monospace' }}>
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => {
                          const colors = eventTypeColors[event.type];
                          return (
                            <button
                              key={event.title}
                              onClick={() => setSelectedEvent(event)}
                              className="w-full text-left px-2 py-1 text-xs border hover:opacity-80 transition-opacity truncate"
                              style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                borderColor: colors.border,
                                fontFamily: 'Geist Mono, monospace'
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

          {/* Sidebar */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Legend */}
            <div className="p-6 border-2 border-[#1A1A1A] bg-[#F7F7F2]" style={{ boxShadow: '2px 2px 0px 0px #1A1A1A' }}>
              <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 uppercase tracking-wide" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>Event Types</h3>
              <div className="space-y-2">
                {Object.entries(eventTypeColors).map(([type, colors]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-3 h-3 border"
                         style={{
                           backgroundColor: colors.bg,
                           borderColor: colors.border
                         }} />
                    <span className="text-sm text-[#1A1A1A]/70" style={{ fontFamily: 'Geist Mono, monospace' }}>{colors.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="p-6 border-2 border-[#1A1A1A] bg-[#F7F7F2]" style={{ boxShadow: '2px 2px 0px 0px #1A1A1A' }}>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>Upcoming Events</h3>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-[#1A1A1A]/10 w-3/4 mb-2" />
                      <div className="h-3 bg-[#1A1A1A]/10 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-[#1A1A1A]/50 text-sm" style={{ fontFamily: 'Geist Mono, monospace' }}>No upcoming events</p>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const colors = eventTypeColors[event.type];
                    return (
                      <button
                        key={event.title}
                        onClick={() => setSelectedEvent(event)}
                        className="w-full text-left p-3 border hover:bg-[#1A1A1A]/5 transition-colors"
                        style={{ borderColor: '#1A1A1A' }}
                      >
                        <div className="inline-flex items-center gap-2 px-2 py-1 text-xs font-semibold mb-2 border"
                             style={{
                               backgroundColor: colors.bg,
                               color: colors.text,
                               borderColor: colors.border,
                               fontFamily: 'Geist Mono, monospace'
                             }}>
                          {event.type}
                        </div>
                        <h4 className="font-medium text-[#1A1A1A] mb-2" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>{event.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/50" style={{ fontFamily: 'Geist Mono, monospace' }}>
                          <Clock className="w-3 h-3" />
                          {format(parseISO(event.date), "MMM d, h:mm a")}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/50 mt-1" style={{ fontFamily: 'Geist Mono, monospace' }}>
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
