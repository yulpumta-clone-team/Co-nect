import { useEffect, useState } from 'react';

const useAxios = (axiosInstance, config) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: '' });
  const [responseData, setResponseData] = useState(null);
  const [trigger, setTrigger] = useState(Date.now());

  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  const resetState = () => {
    setError({ isError: false, msg: '' });
    setResponseData(null);
    setIsLoading(false);
  };

  const fetchData = async (signal) => {
    setIsLoading(true);
    try {
      const {
        status,
        data: { data },
      } = await axiosInstance({ ...config, signal });
      setResponseData(data);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        msg: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    resetState();
    fetchData(signal);
    return () => {
      controller.abort();
    };
  }, [trigger]);

  return [responseData, isLoading, error, forceRefetch];
};

export default useAxios;
