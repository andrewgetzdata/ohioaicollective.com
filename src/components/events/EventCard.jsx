import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function EventCard({ event, onClick, icon: Icon }) {
  const typeColors = {
    "Lightning Session": { bg: "rgba(229, 254, 87, 0.12)", text: "#E5FE57", border: "rgba(229, 254, 87, 0.3)" },
    "Workshop": { bg: "rgba(168, 85, 247, 0.12)", text: "#A855F7", border: "rgba(168, 85, 247, 0.3)" },
    "Ship Session": { bg: "rgba(236, 72, 153, 0.12)", text: "#EC4899", border: "rgba(236, 72, 153, 0.3)" },
    "Social": { bg: "rgba(34, 211, 238, 0.12)", text: "#22D3EE", border: "rgba(34, 211, 238, 0.3)" },
  };

  const colors = typeColors[event.type] || typeColors["Lightning Session"];
  const eventDate = parseISO(event.date);

  return (
    <div
      className="cursor-pointer transition-all duration-300 group h-full flex flex-col rounded-2xl border overflow-hidden"
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.78), rgba(24, 24, 27, 0.92))',
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(6px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {event.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image_url} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1011] via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                 style={{
                   backgroundColor: colors.bg,
                   color: colors.text,
                   borderColor: colors.border
                 }}>
              {Icon && <Icon className="w-3 h-3" />}
              {event.type}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        {!event.image_url && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border self-start"
               style={{
                 backgroundColor: colors.bg,
                 color: colors.text,
                 borderColor: colors.border
               }}>
            {Icon && <Icon className="w-3 h-3" />}
            {event.type}
          </div>
        )}

        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2"
            style={{ 
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
          {event.title}
        </h3>
        
        <p className="text-sm text-zinc-400 mb-4 line-clamp-3 flex-1">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-zinc-500">
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