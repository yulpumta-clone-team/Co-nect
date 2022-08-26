import React from 'react';
import { Outlet } from 'react-router-dom';
import ToastNotificationProvider, {
  useToastNotificationAction,
  useToastNotificationState,
} from 'contexts/ToastNotification';
import WithProvider from 'hoc/withProvider';
import { deleteMessage } from 'contexts/ToastNotification/action';
import ToastNotification from 'components/ToastNotification';
import * as S from './style';

export default WithProvider({ Provider: ToastNotificationProvider, Component: Layout });

function Layout() {
  const { toastList } = useToastNotificationState();
  const notifyDispatch = useToastNotificationAction();
  const deleteToastCallback = (id) => {
    deleteMessage(notifyDispatch, id);
  };
  return (
    <S.AppContainer>
      <S.Main>
        <Outlet />
      </S.Main>
      <ToastNotification
        toastList={toastList}
        col="top"
        row="right"
        autoDelete
        autoDeleteTime={2000}
        deleteCallback={deleteToastCallback}
      />
    </S.AppContainer>
  );
}
