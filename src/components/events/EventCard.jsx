import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function EventCard({ event, onClick, icon: Icon }) {
  const eventDate = parseISO(event.date);

  return (
    <div
      className="cursor-pointer transition-all duration-300 group h-full flex flex-col border-2 border-[#1A1A1A] overflow-hidden bg-[#F7F7F2]"
      onClick={onClick}
      style={{ boxShadow: '2px 2px 0px 0px #1A1A1A' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px #1A1A1A';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px #1A1A1A';
      }}
    >
      {event.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border-2 border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A] uppercase"
                 style={{ letterSpacing: '0.06em', fontFamily: 'Geist Mono, monospace' }}>
              {event.type}
            </div>
            {event.is_past && (
              <div className="inline-flex items-center px-3 py-1.5 text-xs font-semibold border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F7F7F2] uppercase"
                   style={{ letterSpacing: '0.06em', fontFamily: 'Geist Mono, monospace' }}>
                Past Event
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {!event.image_url && (
          <div className="flex gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border-2 border-[#D14D28] text-[#D14D28] self-start uppercase"
                 style={{ letterSpacing: '0.06em', fontFamily: 'Geist Mono, monospace' }}>
              {event.type}
            </div>
            {event.is_past && (
              <div className="inline-flex items-center px-3 py-1.5 text-xs font-semibold border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F7F7F2] self-start uppercase"
                   style={{ letterSpacing: '0.06em', fontFamily: 'Geist Mono, monospace' }}>
                Past Event
              </div>
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3 line-clamp-2 group-hover:text-[#D14D28] transition-colors"
            style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
          {event.title}
        </h3>

        <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-3 flex-1" style={{ fontFamily: 'Geist Mono, monospace' }}>
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-[#1A1A1A]/50" style={{ fontFamily: 'Geist Mono, monospace' }}>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(eventDate, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {format(eventDate, "h:mm a")}
              {event.duration_minutes && ` (${event.duration_minutes} min)`}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
          {event.speaker && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{event.speaker}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
