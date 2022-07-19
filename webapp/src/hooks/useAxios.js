import { useEffect, useState } from 'react';

const useAxios = (fetcher) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ isError: false, msg: '' });
  const [responseData, setResponseData] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = () => {
    setIsLoading(true);
    setTrigger(Date.now());
  };

  const fetch = async () => {
    setIsLoading(true);
    try {
      const response = await fetcher();
      console.log('response', response);
      setResponseData(response);
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
    fetch();
  }, [trigger]);

  return [responseData, isLoading, error, refetch];
};

export default useAxios;
