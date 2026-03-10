import partnersData from '@/data/partners.json'
import jobsData from '@/data/jobs.json'
import eventsData from '@/data/events.json'

export const getAllPartners = () => {
  return partnersData
    .filter(p => !p.is_archived)
    .sort((a, b) => (a.display_order || 999) - (b.display_order || 999))
}

export const getAllJobs = () => {
  return jobsData
    .filter(j => !j.is_archived)
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
}

export const getAllEvents = () => {
  return eventsData
    .filter(e => !e.is_past)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const searchJobs = (jobs, searchTerm) => {
  if (!searchTerm) return jobs
  const term = searchTerm.toLowerCase()
  return jobs.filter(job =>
    job.title?.toLowerCase().includes(term) ||
    job.company?.toLowerCase().includes(term) ||
    job.role_summary?.toLowerCase().includes(term) ||
    job.tags?.some(tag => tag.toLowerCase().includes(term))
  )
}

export const searchEvents = (events, searchTerm) => {
  if (!searchTerm) return events
  const term = searchTerm.toLowerCase()
  return events.filter(event =>
    event.title?.toLowerCase().includes(term) ||
    event.description?.toLowerCase().includes(term) ||
    event.speaker?.toLowerCase().includes(term) ||
    event.tags?.some(tag => tag.toLowerCase().includes(term))
  )
}

export const filterJobsByType = (jobs, jobType) => {
  if (jobType === 'All') return jobs
  return jobs.filter(job => job.job_type === jobType)
}

export const filterEventsByType = (events, eventType) => {
  if (eventType === 'All') return events
  return events.filter(event => event.type === eventType)
}