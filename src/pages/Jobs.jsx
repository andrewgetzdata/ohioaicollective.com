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

  // Jobs are already filtered by the useJobs hook
  const filteredJobs = jobs;

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
                   backgroundColor: 'rgba(31, 201, 255, 0.12)', 
                   color: '#1FC9FF',
                   letterSpacing: '0.06em'
                 }}>
              <Briefcase className="w-4 h-4" />
              CAREER OPPORTUNITIES
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Next Data Role
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Explore tech opportunities from leading Ohio companies
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                placeholder="Search by title, company, or skills..."
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
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-400 uppercase tracking-wide">Filter by type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={`font-semibold ${selectedType === type ? '' : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'}`}
                style={selectedType === type ? { 
                  backgroundColor: '#E5FE57', 
                  color: '#0f1011',
                  boxShadow: '0 8px 16px rgba(229, 254, 87, 0.25)'
                } : {}}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-400">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border p-6"
                   style={{ 
                     background: 'rgba(26, 27, 30, 0.78)',
                     borderColor: 'rgba(255, 255, 255, 0.06)'
                   }}>
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border"
               style={{ 
                 background: 'rgba(26, 27, 30, 0.78)',
                 borderColor: 'rgba(255, 255, 255, 0.08)',
                 borderStyle: 'dashed'
               }}>
            <Briefcase className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
            <h3 className="text-lg font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-zinc-500">Try adjusting your search or filters</p>
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