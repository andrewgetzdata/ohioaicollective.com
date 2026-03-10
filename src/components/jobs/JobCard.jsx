import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2 } from "lucide-react";

export default function JobCard({ job, onClick }) {
  const typeColors = {
    "Full-time": { bg: "#D14D28", text: "#F7F7F2" },
    "Part-time": { bg: "#1A1A1A", text: "#F7F7F2" },
    "Contract": { bg: "#B46428", text: "#F7F7F2" },
    "Internship": { bg: "#C8783C", text: "#F7F7F2" },
  };

  const locations = Array.isArray(job.location)
    ? job.location
    : (job.location ? [job.location] : []);

  const colors = typeColors[job.job_type] || typeColors["Full-time"];

  return (
    <div
      className="cursor-pointer transition-all duration-300 group h-full flex flex-col border-2 border-[#1A1A1A] p-6 bg-[#F7F7F2]"
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
      <div className="flex items-start gap-3 mb-4">
        {job.company_logo ? (
          <img
            src={job.company_logo}
            alt={job.company}
            className="w-12 h-12 object-cover flex-shrink-0 border border-[#1A1A1A]"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-2 border-[#D14D28] bg-[#F7F7F2]">
            <Building2 className="w-6 h-6 text-[#D14D28]" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Badge className="mb-2" style={{ backgroundColor: colors.bg, color: colors.text, border: 'none', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
            {job.job_type}
          </Badge>
          <h3 className="text-lg font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#D14D28] transition-colors" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
            {job.title}
          </h3>
          <p className="text-sm text-[#1A1A1A]/60 mt-1" style={{ fontFamily: 'Geist Mono, monospace' }}>{job.company}</p>
        </div>
      </div>

      <p className="text-sm text-[#1A1A1A]/60 mb-4 line-clamp-5 flex-1" style={{ fontFamily: 'Geist Mono, monospace' }}>
        {job.role_summary || job.description}
      </p>

      <div className="space-y-2 text-sm text-[#1A1A1A]/50" style={{ fontFamily: 'Geist Mono, monospace' }}>
        {job.salary_range && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary_range}</span>
          </div>
        )}
        {locations.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {locations.slice(0, 2).map((loc, index) => (
                <span key={index}>
                  {loc}
                  {index < Math.min(locations.length, 2) - 1 && ", "}
                </span>
              ))}
              {locations.length > 2 && (
                <span className="text-[#1A1A1A]/30">+{locations.length - 2} more</span>
              )}
            </div>
          </div>
        )}
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-[#1A1A1A]">
          {job.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/60 border border-[#1A1A1A]/20" style={{ fontFamily: 'Geist Mono, monospace' }}>
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-[#1A1A1A]/5 text-[#1A1A1A]/40 border border-[#1A1A1A]/20" style={{ fontFamily: 'Geist Mono, monospace' }}>
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
