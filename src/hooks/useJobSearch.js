import { useEffect, useMemo, useState } from 'react';
import useDebounce from './useDebounce';
import { fetchJobs } from '../services/jobApiService';

const useJobSearch = (initialFilters = {}) => {
  const [query, setQuery] = useState(initialFilters.query || '');
  const [filters, setFilters] = useState({
    location: initialFilters.location || '',
    remote: initialFilters.remote || false,
    employmentType: initialFilters.employmentType || '',
    seniority: initialFilters.seniority || '',
  });

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const debouncedQuery = useDebounce(query, 400);

  const searchParams = useMemo(() => ({
    query: debouncedQuery,
    ...filters,
  }), [debouncedQuery, filters]);

  useEffect(() => {
    const controller = new AbortController();

    const loadJobs = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetchJobs(searchParams, {
          signal: controller.signal,
        });

        if (!response.success) {
          setJobs([]);
          setError(response.error || 'Failed to fetch jobs.');
          return;
        }

        setJobs(response.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setJobs([]);
          setError(err.message || 'Failed to fetch jobs.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  // ✅ helper functions
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setQuery('');
    setFilters({
      location: '',
      remote: false,
      employmentType: '',
      seniority: '',
    });
  };

  return {
    query,
    setQuery,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    jobs,
    isLoading,
    error,
  };
};

export default useJobSearch;