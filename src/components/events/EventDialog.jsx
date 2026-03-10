import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ExternalLink, User } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function EventDialog({ event, onClose }) {
  const eventDate = parseISO(event.date);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F7F7F2] border-2 border-[#1A1A1A]" style={{ boxShadow: '6px 6px 0px 0px #1A1A1A' }}>
        {event.image_url && (
          <div className="relative overflow-hidden h-64 -mt-6 -mx-6 mb-6">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-6 right-6">
              <Badge className="border-2 border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A] uppercase mb-2" style={{ fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em' }}>
                {event.type}
              </Badge>
            </div>
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 p-4 border-2 border-[#1A1A1A] bg-[#F7F7F2]">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#1A1A1A]/50 mt-0.5" />
              <div>
                <p className="text-sm text-[#1A1A1A]/50 uppercase" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Date</p>
                <p className="font-medium text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>{format(eventDate, "MMMM d, yyyy")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1A1A1A]/50 mt-0.5" />
              <div>
                <p className="text-sm text-[#1A1A1A]/50 uppercase" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Time</p>
                <p className="font-medium text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>
                  {format(eventDate, "h:mm a")}
                  {event.duration_minutes && ` (${event.duration_minutes} min)`}
                </p>
              </div>
            </div>
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1A1A1A]/50 mt-0.5" />
                <div>
                  <p className="text-sm text-[#1A1A1A]/50 uppercase" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Location</p>
                  <p className="font-medium text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>{event.location}</p>
                </div>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#1A1A1A]/50 mt-0.5" />
                <div>
                  <p className="text-sm text-[#1A1A1A]/50 uppercase" style={{ fontFamily: 'Geist Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Speaker</p>
                  <p className="font-medium text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>{event.speaker}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-[#1A1A1A] mb-2 uppercase text-sm" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif', letterSpacing: '0.06em' }}>About this Event</h3>
            <p className="text-[#1A1A1A]/70 whitespace-pre-line" style={{ fontFamily: 'Geist Mono, monospace' }}>{event.description}</p>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2 uppercase text-sm" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif', letterSpacing: '0.06em' }}>Topics</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge key={index} className="border border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Attendees */}
          {event.max_attendees && (
            <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/60 p-3 border border-[#D14D28]/30 bg-[#D14D28]/5" style={{ fontFamily: 'Geist Mono, monospace' }}>
              <Users className="w-4 h-4" />
              <span>Limited to {event.max_attendees} attendees</span>
            </div>
          )}

          {/* Join Button / Past Event */}
          {event.meeting_url && (
            <div className="pt-4 border-t border-[#1A1A1A]">
              <a href={event.meeting_url} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full uppercase font-semibold" size="lg"
                        style={{
                          backgroundColor: event.is_past ? '#1A1A1A' : '#D14D28',
                          color: '#F7F7F2',
                          boxShadow: '4px 4px 0px 0px #1A1A1A',
                          letterSpacing: '0.06em'
                        }}>
                  {event.is_past ? 'Past Event' : 'Join Event'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
