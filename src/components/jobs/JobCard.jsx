
import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Building2 } from "lucide-react";

export default function JobCard({ job, onClick }) {
  const typeColors = {
    "Full-time": "bg-green-100 text-green-800",
    "Part-time": "bg-blue-100 text-blue-800",
    "Contract": "bg-purple-100 text-purple-800",
    "Internship": "bg-orange-100 text-orange-800",
  };

  // Handle location as both string (old data) and array (new data)
  const locations = Array.isArray(job.location) 
    ? job.location 
    : (job.location ? [job.location] : []);

  return (
    <div
      className="cursor-pointer transition-all duration-300 group h-full flex flex-col rounded-2xl border p-6"
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(26, 27, 30, 0.78), rgba(24, 24, 27, 0.92))',
        borderColor: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(6px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(31, 201, 255, 0.35)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        {job.company_logo ? (
          <img 
            src={job.company_logo} 
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
               style={{ background: 'linear-gradient(135deg, rgba(31, 201, 255, 0.2), rgba(168, 85, 247, 0.2))' }}>
            <Building2 className="w-6 h-6" style={{ color: '#1FC9FF' }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Badge className={`${typeColors[job.job_type]} mb-2`}>
            {job.job_type}
          </Badge>
          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-[#1FC9FF] transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1">{job.company}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-400 mb-4 line-clamp-5 flex-1">
        {job.role_summary || job.description}
      </p>

      <div className="space-y-2 text-sm text-zinc-500">
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
                <span className="text-zinc-600">+{locations.length - 2} more</span>
              )}
            </div>
          </div>
        )}
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
          {job.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-white/5 text-zinc-400 border-0">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-white/5 text-zinc-500 border-0">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
