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
  const [apiError, setApiError] = useState({
    isError: false,
    msg: '',
  });
  const [trigger, setTrigger] = useState(Date.now());
  const [controller, setController] = useState();

  const forceRefetch = () => {
    resetState();
    setTrigger(Date.now());
  };

  const resetState = () => {
    setComments([]);
    setIsLoading(true);
    setApiError({ isError: false, msg: '' });
    setAxiosInstance({ key: initKey, instance: initInstance, config: initConfig });
  };

  const execution = async () => {
    setIsLoading(true);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const { instance, config } = axiosInstance;
      const { data: responseData } = await instance({ ...config, signal: ctrl.signal });
      console.log('data', responseData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setApiError({
        isError: true,
        msg: error,
      });
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
      const { data: responseData } = await instance({ ...config, signal: ctrl.signal });
      setComments(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setApiError({
        isError: true,
        msg: error,
      });
    } finally {
      setIsLoading(false);
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
