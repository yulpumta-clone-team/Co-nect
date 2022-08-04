import React from 'react';
import GlobalNavigation from 'components/GlobalNavigation';
import { Outlet } from 'react-router-dom';
import * as S from './style';

export default function Layout() {
  // const { toastList, notifyDispatch } = useNotification();
  // const deleteToastCallback = (id) => {
  //   deleteMessage(notifyDispatch, id);
  // };
  return (
    <S.AppContainer>
      <S.Header>
        <GlobalNavigation />
      </S.Header>
      <S.Main>
        <Outlet />
      </S.Main>
      {/* <ToastNotification
        toastList={toastList}
        col="top"
        row="right"
        autoDelete
        autoDeleteTime={2000}
        deleteCallback={deleteToastCallback}
      /> */}
    </S.AppContainer>
  );
}
