import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Filter } from "lucide-react";
import { motion } from "framer-motion";
import JobCard from "../components/jobs/JobCard";
import JobDialog from "../components/jobs/JobDialog";
import { useJobs } from "@/hooks/useLocalData";

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: jobs, isLoading } = useJobs(searchTerm, selectedType);

  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
  const filteredJobs = jobs;

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
              <Briefcase className="w-4 h-4" />
              CAREER OPPORTUNITIES
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>
              Find Your Next Role
            </h1>
            <p className="text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto" style={{ fontFamily: 'Geist Mono, monospace' }}>
              Explore tech opportunities from leading Ohio companies
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1A1A1A]/40" />
              <Input
                placeholder="Search by title, company, or skills..."
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
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-[#1A1A1A]/50" />
            <span className="text-sm font-medium text-[#1A1A1A]/60 uppercase tracking-wide" style={{ fontFamily: 'Geist Mono, monospace' }}>Filter by type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="font-semibold uppercase"
                style={selectedType === type ? {
                  backgroundColor: '#D14D28',
                  color: '#F7F7F2',
                  boxShadow: '2px 2px 0px 0px #1A1A1A',
                  letterSpacing: '0.04em'
                } : {
                  borderColor: '#1A1A1A',
                  borderWidth: '2px',
                  color: '#1A1A1A',
                  backgroundColor: '#F7F7F2',
                  letterSpacing: '0.04em'
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#1A1A1A]/60" style={{ fontFamily: 'Geist Mono, monospace' }}>
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse border-2 border-[#1A1A1A] p-6 bg-[#F7F7F2]">
                <div className="space-y-3">
                  <div className="h-4 bg-[#1A1A1A]/10 w-3/4" />
                  <div className="h-3 bg-[#1A1A1A]/10 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-[#1A1A1A] bg-[#F7F7F2]">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-[#1A1A1A]/30" />
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 uppercase">No jobs found</h3>
            <p className="text-[#1A1A1A]/50" style={{ fontFamily: 'Geist Mono, monospace' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <JobCard job={job} onClick={() => setSelectedJob(job)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <JobDialog job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
