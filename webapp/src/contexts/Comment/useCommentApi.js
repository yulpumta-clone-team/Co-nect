import { useEffect, useState } from 'react';

const useCommentApi = (initKey, initInstance, initConfig) => {
  const getInstance = {
    key: initKey,
    instance: initInstance,
    config: initConfig,
  };
  const [axiosInstance, setAxiosInstance] = useState({
    key: initKey,
    instance: initInstance,
    config: initConfig,
  });
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [trigger, setTrigger] = useState(Date.now());
  const [controller, setController] = useState();

  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  const resetState = () => {
    setComments([]);
    setIsLoading(true);
    setApiError(null);
    setAxiosInstance({ key: initKey, instance: initInstance, config: initConfig });
  };

  const execution = async () => {
    setIsLoading(true);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const { instance, config } = axiosInstance;
      const {
        status,
        data: { data },
      } = await instance({ ...config, signal: ctrl.signal });
      console.log('data', data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setApiError(error);
    } finally {
      getExecution();
    }
  };

  const getExecution = async () => {
    setIsLoading(true);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const { instance, config } = getInstance;
      const {
        status,
        data: { data },
      } = await instance({ ...config, signal: ctrl.signal });
      setComments(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setApiError(error);
    }
  };

  const changeApi = (key, instance, config) => setAxiosInstance({ key, instance, config });

  const isGetRequest = axiosInstance.key === getInstance.key;

  useEffect(() => {
    if (isGetRequest) {
      getExecution();
    } else {
      resetState();
      execution();
    }
    return () => controller && controller.abort();
  }, [trigger, axiosInstance.key]);

  return { comments, setComments, isLoading, apiError, changeApi, forceRefetch };
};

export default useCommentApi;
