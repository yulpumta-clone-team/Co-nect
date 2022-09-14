import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useEffect, useReducer, useState } from 'react';
import useUserInfo from './useUserInfo';

/**
 * useAxios가 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} useAxiosParams
 * @property {Function} axiosInstance axios instance
 * @property {Object} axiosConfig axios intance를 실행할 때 넘겨줄 params
 * @property {boolean} immediate 컴포넌트가 렌더링되자마자 요청 보내는지 여부 (get요청일 때만 true)
 */

/**
 * useAxios를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useAxiosReturns
 * @property {boolean} state isLoading, responseData, error로 구성
 * @property {boolean} execution 새로운 axios config와 함께 api호출을 실행하는 함수
 * @property {boolean} forceRefetch 기존 axios config로 같은 api호출을 실행하는 함수
 */

/**
 * custom useAxios hooks
 * @param {useAxiosParams} useAxiosParams useAxios가 동작하기 위해 외부에서 주입해야하는 params
 * @returns {useAxiosReturns} useAxios를 사용하는 곳에서 사용할 method 및 state
 */
const useAxios = ({ axiosInstance, axiosConfig, immediate = true }) => {
  const notifyDispatch = useToastNotificationAction();
  const { handleExiredToken } = useUserInfo();
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    responseData: null,
    error: null,
  });
  const [trigger, setTrigger] = useState(Date.now());
  const [controller, setController] = useState();

  /**
   * 기존 config값으로 api요청을 다시 요청
   */
  const forceRefetch = () => {
    setTrigger(Date.now());
  };

  /**
   * state를 초기화
   */
  const resetState = () => {
    dispatch({ type: RESET_TYPE });
  };

  /**
   * 새로운 axios config와 함께 api호출을 실행하는 함수
   * @param {Object} newConfig axios instance에 넘겨줄 새로운 axios config
   */
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
      !immediate && notifyNewMessage(notifyDispatch, '요청 성공!', TOAST_TYPE.Success);
      dispatch({ type: SUCCESS_TYPE, responseData });
    } catch (error) {
      console.error(error);
      handleExiredToken(error.httpStatus);
      !immediate && notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
      dispatch({
        type: ERROR_TYPE,
        error: {
          httpStatus: error.httpStatus,
          message: error.message,
        },
      });
    }
  };

  useEffect(() => {
    // resetState 내부의 dispatch 때문에 두 번 execution이 발생함.
    // resetState();
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
