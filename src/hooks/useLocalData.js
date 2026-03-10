import { useMemo } from 'react'
import {
  getAllJobs,
  getAllEvents,
  getAllPartners,
  searchJobs,
  searchEvents,
  filterJobsByType,
  filterEventsByType
} from '@/lib/dataLoader'

export const useJobs = (searchTerm = '', jobType = 'All') => {
  const data = useMemo(() => {
    let jobs = getAllJobs()

    if (searchTerm) {
      jobs = searchJobs(jobs, searchTerm)
    }

    if (jobType !== 'All') {
      jobs = filterJobsByType(jobs, jobType)
    }

    return jobs
  }, [searchTerm, jobType])

  return {
    data,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true
  }
}

export const useEvents = (searchTerm = '', eventType = 'All') => {
  const data = useMemo(() => {
    let events = getAllEvents()

    if (searchTerm) {
      events = searchEvents(events, searchTerm)
    }

    if (eventType !== 'All') {
      events = filterEventsByType(events, eventType)
    }

    return events
  }, [searchTerm, eventType])

  return {
    data,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true
  }
}

export const usePartners = () => {
  const data = useMemo(() => getAllPartners(), [])

  return {
    data,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true
  }
}

// Hook for jobs without filters (for simple cases)
export const useAllJobs = () => {
  const data = useMemo(() => getAllJobs(), [])

  return {
    data,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true
  }
}

// Hook for events without filters (for simple cases)
export const useAllEvents = () => {
  const data = useMemo(() => getAllEvents(), [])

  return {
    data,
    isLoading: false,
    error: null,
    isError: false,
    isSuccess: true
  }
}