import { API_MESSAGE } from 'constant/api.constant';
import { ROUTE } from 'constant/route.constant';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserInfo } from 'service/auth';

/**
 * useAxios가 동작하기 위해 외부에서 주입해야하는 params
 * @typedef {Object} useAxiosParams
 * @property {(axiosConfig: Object) => Promise<any>} axiosInstance axios instance
 * @property {Object} axiosConfig axios intance를 실행할 때 넘겨줄 params
 * @property {boolean} immediate 컴포넌트가 렌더링되자마자 요청 보내는지 여부 (get요청일 때만 true)
 */

// return { state, getExecution, notGetExecution, handleExiredToken, forceRefetch, resetState };

/**
 * useAxios를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useAxiosReturns
 * @property {boolean} state isLoading, responseData, error로 구성
 * @property {boolean} getExecution GET API 새로운 axios config와 함께 api호출을 실행하는 함수
 * @property {boolean} notGetExecution GET API 이외의 새로운 axios config와 함께 api호출을 실행하는 함수
 * @property {boolean} forceRefetch 기존 axios config로 같은 api호출을 실행하는 함수
 * @property {boolean} resetState 새로운 axios config와 함께 api호출을 실행하는 함수
 */

/**
 * custom useAxios hooks
 * @param {useAxiosParams} useAxiosParams useAxios가 동작하기 위해 외부에서 주입해야하는 params
 * @returns {useAxiosReturns} useAxios를 사용하는 곳에서 사용할 method 및 state
 */
const useAxios = ({ axiosInstance, axiosConfig, immediate = true }) => {
  const notifyDispatch = useToastNotificationAction();
  const navigate = useNavigate();
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
   * httpStatus가 401,403이면 유저정보 삭제 후 로그인페이지로 이동
   * @param {number} httpStatus
   * @returns {Promise<void>}
   */
  const handleExiredToken = (httpStatus) => {
    if (httpStatus !== 403 && httpStatus !== 401) {
      return;
    }
    deleteUserInfo();
    notifyNewMessage(notifyDispatch, API_MESSAGE.EXPIRE_TOKEN, TOAST_TYPE.Info);
    setTimeout(() => {
      navigate(ROUTE.LOGIN);
    }, 2000);
  };

  /**
   * 새로운 axios config와 함께 api호출을 실행하는 함수
   * @param {Object} newConfig axios instance에 넘겨줄 새로운 axios config
   */
  const getExecution = async (newConfig) => {
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
      console.error(error);
      handleExiredToken(error.httpStatus);
      dispatch({
        type: ERROR_TYPE,
        error: {
          httpStatus: error.httpStatus,
          message: error.message,
        },
      });
    }
  };

  const notGetExecution = async ({ newConfig, successMessage = '요청 성공!', seconds = 1500 }) => {
    let isOverStandard = true;
    setTimeout(() => {
      if (isOverStandard) notifyNewMessage(notifyDispatch, API_MESSAGE.LOADING, TOAST_TYPE.Info);
    }, seconds);
    try {
      const ctrl = new AbortController();
      setController(ctrl);
      const response = await axiosInstance({
        ...axiosConfig,
        ...newConfig,
        signal: ctrl.signal,
      });
      // const message = response?.message;
      notifyNewMessage(notifyDispatch, successMessage, TOAST_TYPE.Success);
      return response;
    } catch (error) {
      handleExiredToken(error.httpStatus);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
    } finally {
      isOverStandard = false;
    }
    return null;
  };

  useEffect(() => {
    if (immediate) {
      getExecution();
    }
    return () => controller && controller.abort();
  }, [trigger]);

  return { state, getExecution, notGetExecution, forceRefetch, resetState };
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
