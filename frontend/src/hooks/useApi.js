import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API calls with loading, error, and data state management
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Options object
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const {
    immediate = true, // Whether to call API immediately on mount
    onSuccess = null, // Success callback
    onError = null,   // Error callback
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      
      if (result.success) {
        setData(result.data);
        if (onSuccess) onSuccess(result.data);
      } else {
        const errorMessage = result.error || 'An unknown error occurred';
        setError(errorMessage);
        if (onError) onError(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
};

/**
 * Hook for form submission with API
 * @param {Function} submitFunction - The API function for form submission
 * @returns {Object} - { submit, loading, error, success }
 */
export const useApiSubmit = (submitFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await submitFunction(formData);
      
      if (result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        const errorMessage = result.error || 'Submission failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [submitFunction]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    submit,
    loading,
    error,
    success,
    reset,
  };
};

/**
 * Hook for paginated API data
 * @param {Function} apiFunction - The API function that supports pagination
 * @param {Object} options - Options object
 * @returns {Object} - { data, loading, error, pagination, loadMore, refetch }
 */
export const usePaginatedApi = (apiFunction, options = {}) => {
  const {
    perPage = 10,
    initialPage = 1,
    onSuccess = null,
    onError = null,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    perPage,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  const fetchData = useCallback(async (page = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(page, perPage);
      
      if (result.success) {
        const responseData = result.data;
        
        if (append) {
          setData(prevData => [...prevData, ...responseData.data]);
        } else {
          setData(responseData.data);
        }

        setPagination({
          page: responseData.page,
          perPage: responseData.per_page,
          total: responseData.total,
          totalPages: responseData.total_pages,
          hasMore: responseData.page < responseData.total_pages,
        });

        if (onSuccess) onSuccess(responseData);
      } else {
        const errorMessage = result.error || 'Failed to fetch data';
        setError(errorMessage);
        if (onError) onError(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, perPage, onSuccess, onError]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      fetchData(pagination.page + 1, true);
    }
  }, [fetchData, pagination.hasMore, pagination.page, loading]);

  const refetch = useCallback(() => {
    fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(initialPage);
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    loadMore,
    refetch,
  };
};

export default useApi;