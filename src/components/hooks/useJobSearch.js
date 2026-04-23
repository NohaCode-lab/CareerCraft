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

  const searchParams = useMemo(
    () => ({
      query: debouncedQuery,
      ...filters,
    }),
    [debouncedQuery, filters]
  );

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetchJobs(searchParams);

        if (!isMounted) {
          return;
        }

        if (!response.success) {
          setJobs([]);
          setError(response.error || 'Failed to fetch jobs.');
          return;
        }

        setJobs(response.data);
      } catch (err) {
        if (isMounted) {
          setJobs([]);
          setError(err.message || 'Failed to fetch jobs.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    jobs,
    isLoading,
    error,
  };
};

export default useJobSearch;