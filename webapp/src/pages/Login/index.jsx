import React from 'react';
import { Outlet } from 'react-router-dom';
import authApi from 'api/auth.api';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { loginValidate } from 'service/auth/auth.validation';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import Divider from 'components/Common/Divider';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import SocailLoginButtons from 'components/SocialLoginButtons';
import { TOKEN } from 'constant/api.constant';
import { ROUTE } from 'constant/route.constant';
import BackButton from 'components/Common/BackButton';
import { loginParser } from 'service/auth/auth.parser';
import MainLogoImg from 'assets/images/main-logo.png';
import useHandleLogin from 'hooks/useHandleLogin';
import * as S from './Login.style';

export default function Login() {
  const notifyDispatch = useToastNotificationAction();
  const { handleLogin } = useHandleLogin();

  const submitCallback = async (submitData) => {
    const parsedSubmitData = loginParser(submitData);
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await authApi.login({ submitData: parsedSubmitData });
      const {
        headers,
        data: { isFirst: isFirstLogin },
      } = response;
      handleLogin({
        accessToken: headers[TOKEN.ACCESS],
        refreshToken: headers[TOKEN.REFRESH],
        isFirstLogin,
      });
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, TOAST_TYPE.Error);
    }
  };

  const { inputValues, validateError, onChangeHandler, submitHandler, satisfyAllValidates } =
    useForm({
      initialValues: { email: '', password: '' },
      submitCallback,
      validate: loginValidate,
    });

  return (
    <S.Container>
      <BackButton url={ROUTE.HOME} />
      <S.Header>
        <S.MainLogo src={MainLogoImg} alt="메인로고" />
        <h1>Co-nect</h1>
      </S.Header>
      <S.Form onSubmit={submitHandler} id="loginForm">
        <TextInput
          name="email"
          type="email"
          placeholder="이메일"
          value={inputValues.email}
          onChange={onChangeHandler}
          isError={!!validateError.email}
          helperText={validateError.email}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="비밀번호"
          value={inputValues.password}
          onChange={onChangeHandler}
          isError={!!validateError.password}
          helperText={validateError.password}
        />
      </S.Form>
      <Button
        theme="primary"
        type="submit"
        form="loginForm"
        disabled={!satisfyAllValidates}
        customStyle={S.SubmitButton}
      >
        Login
      </Button>
      <Divider width="500px" marginTop="67px" marginBottom="38px" />
      <SocailLoginButtons />
      <Outlet />
    </S.Container>
  );
}
