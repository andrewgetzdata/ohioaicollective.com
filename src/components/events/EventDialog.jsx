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
  const typeColors = {
    "Lightning Session": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Workshop": "bg-purple-100 text-purple-800 border-purple-300",
    "Ship Session": "bg-pink-100 text-pink-800 border-pink-300",
  };

  const eventDate = parseISO(event.date);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {event.image_url && (
          <div className="relative overflow-hidden rounded-lg h-64 -mt-6 -mx-6 mb-6">
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <Badge className={`${typeColors[event.type]} border mb-2`}>
                {event.type}
              </Badge>
            </div>
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{format(eventDate, "MMMM d, yyyy")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">
                  {format(eventDate, "h:mm a")}
                  {event.duration_minutes && ` (${event.duration_minutes} min)`}
                </p>
              </div>
            </div>
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{event.location}</p>
                </div>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Speaker</p>
                  <p className="font-medium text-gray-900">{event.speaker}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About this Event</h3>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Attendees */}
          {event.max_attendees && (
            <div className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-blue-50 rounded-lg">
              <Users className="w-4 h-4" />
              <span>Limited to {event.max_attendees} attendees</span>
            </div>
          )}

          {/* Join Button */}
          {event.meeting_url && (
            <div className="pt-4 border-t">
              <a href={event.meeting_url} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                  Join Event
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