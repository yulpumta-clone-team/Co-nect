import { useEffect, useState } from 'react';

const useAxios = (axiosInstance, config, immediate = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: '' });
  const [responseData, setResponseData] = useState(null);
  const [trigger, setTrigger] = useState(Date.now());
  const [controller, setController] = useState();

  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  const resetState = () => {
    setError({ isError: false, msg: '' });
    setResponseData(null);
    setIsLoading(false);
  };

  const execution = async () => {
    setIsLoading(true);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const {
        status,
        data: { data },
      } = await axiosInstance({ ...config, signal: ctrl.signal });
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
    resetState();
    if (immediate) {
      execution();
    }
    return () => controller && controller.abort();
  }, [trigger]);

  return { responseData, isLoading, error, execution, forceRefetch };
};

export default useAxios;
