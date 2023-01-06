import React from 'react';
import GlobalNavigation from 'components/GlobalNavigation';
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
  Component: LayoutWithHeader,
});

function LayoutWithHeader() {
  const { toastList } = useToastNotificationState();
  const notifyDispatch = useToastNotificationAction();
  const deleteToastCallback = (id) => {
    deleteMessage(notifyDispatch, id);
  };
  return (
    <S.AppContainer>
      <S.Header>
        <GlobalNavigation />
      </S.Header>
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
