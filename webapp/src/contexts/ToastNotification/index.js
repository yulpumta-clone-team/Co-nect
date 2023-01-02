import React, { useReducer, createContext, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { initState, reducer } from './reducer';

const ToastNotificationStateContext = createContext();
const ToastNotificationActionContext = createContext();

ToastNotificationProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ToastNotificationProvider({ children }) {
  const [state, notifyDispatch] = useReducer(reducer, initState);

  const states = useMemo(() => ({ ...state }), [state]);

  return (
    <ToastNotificationActionContext.Provider value={notifyDispatch}>
      <ToastNotificationStateContext.Provider value={states}>
        {children}
      </ToastNotificationStateContext.Provider>
    </ToastNotificationActionContext.Provider>
  );
}

export function useToastNotificationState() {
  const value = useContext(ToastNotificationStateContext);
  if (value === undefined) {
    throw new Error('useToastNotification must be used within ToastNotificationContext');
  }
  return value;
}

export const useToastNotificationAction = () => {
  const context = useContext(ToastNotificationActionContext);

  if (!context) {
    throw new Error('useToastNotification must be used within ToastNotificationContext');
  }

  return context;
};
