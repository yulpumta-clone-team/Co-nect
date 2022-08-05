import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useEffect, useState } from 'react';

const useCommentApi = (initKey, initInstance, initConfig) => {
  const notifyDispatch = useToastNotificationAction();
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
    notifyNewMessage(notifyDispatch, '요청 중...', TOAST_TYPE.Info);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const { instance, config } = axiosInstance;
      const { data: responseData } = await instance({ ...config, signal: ctrl.signal });
      console.log('data', responseData);
      notifyNewMessage(notifyDispatch, '요청 성공', TOAST_TYPE.Success);
      getExecution();
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
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

  const changeApi = (key, instance, config) => {
    setAxiosInstance({ key, instance, config });
    execution();
  };

  const isGetRequest = axiosInstance.key === getInstance.key;

  useEffect(() => {
    if (isGetRequest) {
      getExecution();
    } else {
      execution();
    }
    return () => controller && controller.abort();
  }, [trigger]);

  return { comments, setComments, isLoading, apiError, changeApi, forceRefetch };
};

export default useCommentApi;
