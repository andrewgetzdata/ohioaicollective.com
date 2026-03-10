import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building2, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Job description templates stored as markdown
const jobDescriptions = {

// LOOP - DATA ENGINEER
"loop-data-engineer": `# About the Role
The Data team at Loop is on a mission to empower merchants with transformative data products that drive success beyond returns. By building tools that merchants love and fostering a robust data culture, the team enables smarter decision-making across the board. Whether creating insights to guide merchants' strategies or strengthening internal data-driven processes, the Data team is integral to shaping Loop's future and unlocking new opportunities for our merchants and teams alike.

As a Data Engineer at Loop, you'll have the chance to significantly impact our ability to solve merchant problems and fulfill merchant needs. You'll be an integral member of the team, owning all aspects of data availability, quality, and ease of use of our data platforms. Your success in this role will depend on a healthy blend of creativity and structure with a continuous focus on delivering value to the business.

At Loop, we're intentional about the way we work so that we can do our best work. We call this our Blended Working Environment. We work from our HQ in Columbus, OH, or one of our Hub or Secluded locations, and are distributed throughout the United States, select Canadian provinces, and the United Kingdom. For this position, we're looking for someone to join us in a location where we already have an established Hub or HQ.

Our data stack: Snowflake, Fivetran, dbt, GoodData, Secoda

## What you'll do:
- Maintain and optimize existing data pipelines and warehouse solutions for performance, reliability, and cost efficiency.
- Support internal analytics and ML teams with data modeling, schema updates, and ad hoc data needs.
- Contribute to dbt projects and assist in ensuring data quality, observability, and accessibility.
- Write clean, tested, and documented code, and participate in code reviews.
- Collaborate with senior data engineers to understand and contribute to new ingestion sources, ML pipelines, and other forward-looking initiatives.
- Ensure internal stakeholders can access and use data effectively, enabling faster business insights and decision-making.

## Your experience:
- 4 years of hands-on experience building and maintaining data pipelines and data sets in a cloud environment (Snowflake, GBQ, Redshift, etc.). *We're expecting top candidates to have hands-on experience with Snowflake, specifically!
- 2+ years of Python experience, creating reliable workflows and data processing scripts.
- Strong SQL skills and experience with data modeling.
- Experience with dbt or similar transformation tools. Familiarity with distributed systems and ETL/ELT processes.
- Nice to have: Experience with data observability, lineage, or governance tools.
- Nice to have: Exposure to BI tools and supporting analytics teams.
- Nice to have: Experience working on cross-functional data projects.
- Nice to have: Familiarity with Fivetran, Kafka, or modern data integration platforms.

## Our Data Team values
- Progress over perfection and focus on delivering value.
- Strong, open, and continuous collaboration with peers and stakeholders.
- Autonomy and accountability.
- Drive to solve problems.
- Engagement and participation in our Agile practices.

We know that making decisions about your career and compensation is a huge deal. Because of that, we're incredibly thoughtful about our compensation strategy. We want you to feel safe and excited, but also comfortable with the compensation package of a startup. We've outlined some important information for you here, but please know there's a lot more to compensation than we can cover in this job posting.

The posted salary range is the base salary for this opportunity. The salary range is subject to change, and may be adjusted in the future.

The actual annual salary paid for this position will be based on several factors, including, but not limited to: your prior experience and skills related to the position, geographic location, company needs, current market demands, and your total compensation goals.

Great humans deserve great benefits. At Loop, you'll be eligible for benefits such as: medical, dental, and vision insurance, flexible PTO, company holidays, sick & safe leave, parental leave, 401k, monthly wellness benefit, home workstation benefit, phone/internet benefit, and equity.`
};

export default function JobDialog({ job, onClose }) {
  const typeColors = {
    "Full-time": { bg: "#D14D28", text: "#F7F7F2" },
    "Part-time": { bg: "#1A1A1A", text: "#F7F7F2" },
    "Contract": { bg: "#B46428", text: "#F7F7F2" },
    "Internship": { bg: "#C8783C", text: "#F7F7F2" },
  };

  const formatMarkdown = (text) => {
    if (!text) return "";
    return text.replace(/<br\s*\/?>/gi, '\n');
  };

  const locations = Array.isArray(job.location)
    ? job.location
    : (job.location ? [job.location] : []);

  const getDescription = () => {
    if (job.description_template && job.description_template !== 'custom') {
      return jobDescriptions[job.description_template] || job.description;
    }
    return job.description;
  };

  const displayContent = getDescription();
  const colors = typeColors[job.job_type] || typeColors["Full-time"];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F7F7F2] border-2 border-[#1A1A1A]" style={{ boxShadow: '6px 6px 0px 0px #1A1A1A' }}>
        <style>{`
          .job-markdown h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #1A1A1A;
            line-height: 1.3;
            font-family: 'Geist Sans', system-ui, sans-serif;
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }
          .job-markdown h2 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            color: #1A1A1A;
            line-height: 1.3;
            font-family: 'Geist Sans', system-ui, sans-serif;
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }
          .job-markdown h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #1A1A1A;
            line-height: 1.3;
            font-family: 'Geist Sans', system-ui, sans-serif;
            text-transform: uppercase;
          }
          .job-markdown ul {
            list-style-type: square;
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
            padding-left: 2rem;
          }
          .job-markdown ol {
            list-style-type: decimal;
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
            padding-left: 2rem;
          }
          .job-markdown li {
            margin-top: 0.375rem;
            margin-bottom: 0.375rem;
            line-height: 1.6;
            font-family: 'Geist Mono', monospace;
          }
          .job-markdown p {
            margin-top: 0.75rem;
            margin-bottom: 0.75rem;
            line-height: 1.6;
            font-family: 'Geist Mono', monospace;
          }
          .job-markdown strong {
            font-weight: 600;
            color: #1A1A1A;
          }
          .job-markdown code {
            background-color: rgba(26, 26, 26, 0.05);
            padding: 0.125rem 0.375rem;
            font-size: 0.875em;
            font-family: 'Geist Mono', monospace;
            border: 1px solid rgba(26, 26, 26, 0.2);
          }
          .job-markdown blockquote {
            border-left: 4px solid #D14D28;
            padding-left: 1rem;
            margin-left: 0;
            color: #1A1A1A;
            font-style: italic;
          }
        `}</style>

        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                alt={job.company}
                className="w-16 h-16 object-cover border-2 border-[#1A1A1A]"
              />
            ) : (
              <div className="w-16 h-16 border-2 border-[#D14D28] bg-[#F7F7F2] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#D14D28]" />
              </div>
            )}
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2 text-[#1A1A1A] uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif' }}>{job.title}</DialogTitle>
              <p className="text-lg text-[#1A1A1A]/60 font-medium" style={{ fontFamily: 'Geist Mono, monospace' }}>{job.company}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-3">
            <Badge style={{ backgroundColor: colors.bg, color: colors.text, border: 'none', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {job.job_type}
            </Badge>
            {job.salary_range && (
              <Badge className="flex items-center gap-1 border-2 border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>
                <Clock className="w-3 h-3" />
                {job.salary_range}
              </Badge>
            )}
            {locations.length > 0 && (
              <>
                {locations.map((loc, index) => (
                  <Badge key={index} className="flex items-center gap-1 border-2 border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    <MapPin className="w-3 h-3" />
                    {loc}
                  </Badge>
                ))}
              </>
            )}
          </div>

          {/* Job Details */}
          {displayContent ? (
            <div className="job-markdown text-[#1A1A1A]/80">
              <ReactMarkdown
                components={{
                  ul: ({node, ...props}) => <ul style={{listStyleType: 'square', paddingLeft: '2rem'}} {...props} />,
                  ol: ({node, ...props}) => <ol style={{listStyleType: 'decimal', paddingLeft: '2rem'}} {...props} />,
                }}
              >
                {formatMarkdown(displayContent)}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-[#1A1A1A]/40 italic" style={{ fontFamily: 'Geist Mono, monospace' }}>No job description available</p>
          )}

          {/* Requirements (only if using old format) */}
          {!job.description_template && job.requirements && (
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-3 text-lg uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif', letterSpacing: '0.04em' }}>Requirements</h3>
              <div className="job-markdown text-[#1A1A1A]/80">
                <ReactMarkdown
                  components={{
                    ul: ({node, ...props}) => <ul style={{listStyleType: 'square', paddingLeft: '2rem'}} {...props} />,
                    ol: ({node, ...props}) => <ol style={{listStyleType: 'decimal', paddingLeft: '2rem'}} {...props} />,
                  }}
                >
                  {formatMarkdown(job.requirements)}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Skills/Tags */}
          {job.tags && job.tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-3 text-lg uppercase" style={{ fontFamily: 'Geist Sans, system-ui, sans-serif', letterSpacing: '0.04em' }}>Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <Badge key={index} className="text-sm border border-[#1A1A1A] bg-[#F7F7F2] text-[#1A1A1A]" style={{ fontFamily: 'Geist Mono, monospace' }}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          {job.application_url && (
            <div className="pt-4 border-t border-[#1A1A1A]">
              <a href={job.application_url} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full uppercase font-semibold" size="lg"
                        style={{ backgroundColor: '#D14D28', color: '#F7F7F2', boxShadow: '4px 4px 0px 0px #1A1A1A', letterSpacing: '0.06em' }}>
                  Apply Now
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
