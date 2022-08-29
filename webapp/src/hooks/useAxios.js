import { useEffect, useReducer, useState } from 'react';
import useUserInfo from './useUserInfo';

const useAxios = ({ axiosInstance, axiosConfig, immediate = true }) => {
  const { handleExiredToken } = useUserInfo();
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    responseData: null,
    error: null,
  });
  const [trigger, setTrigger] = useState(Date.now());
  const [controller, setController] = useState();

  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  const resetState = () => {
    dispatch({ type: RESET_TYPE });
  };

  const execution = async (newConfig) => {
    dispatch({ type: LOADING_TYPE });
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const { data: responseData } = await axiosInstance({
        ...axiosConfig,
        ...newConfig,
        signal: ctrl.signal,
      });
      dispatch({ type: SUCCESS_TYPE, responseData });
    } catch (error) {
      handleExiredToken(error.httpStatus);
      console.error(error);
      dispatch({ type: ERROR_TYPE, error });
    }
  };

  useEffect(() => {
    resetState();
    if (immediate) {
      execution();
    }
    return () => controller && controller.abort();
  }, [trigger]);

  return [state, execution, forceRefetch];
};

export default useAxios;

const LOADING_TYPE = 'LOADING';
const SUCCESS_TYPE = 'SUCCESS';
const ERROR_TYPE = 'ERROR';
const RESET_TYPE = 'RESET';

function reducer(state, action) {
  switch (action.type) {
    case LOADING_TYPE:
      return {
        isLoading: true,
        responseData: null,
        error: null,
      };
    case SUCCESS_TYPE:
      return {
        isLoading: false,
        responseData: action.responseData,
        error: null,
      };
    case ERROR_TYPE:
      return {
        isLoading: false,
        responseData: null,
        error: action.error,
      };
    case RESET_TYPE:
      return {
        isLoading: false,
        responseData: null,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
