import React from 'react';
import { Outlet } from 'react-router-dom';
import ToastNotificationProvider, {
  useToastNotificationAction,
  useToastNotificationState,
} from 'contexts/ToastNotification';
import WithProvider from 'hoc/withProvider';
import { deleteMessage } from 'contexts/ToastNotification/action';
import ToastNotification from 'components/ToastNotification';
import * as S from './layout.style';

export default WithProvider({
  Providers: [ToastNotificationProvider],
  Component: LayoutFullPage,
});

function LayoutFullPage() {
  const { toastList } = useToastNotificationState();
  const notifyDispatch = useToastNotificationAction();
  const deleteToastCallback = (id) => {
    deleteMessage(notifyDispatch, id);
  };
  return (
    <S.AppContainer>
      <S.Full>
        <Outlet />
      </S.Full>
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
