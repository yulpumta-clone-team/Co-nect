import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authApi from 'api/auth.api';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import loginValidate from 'service/login.validation';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import Divider from 'components/Common/Divider';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import SocailLoginButtons from 'components/SocialLoginButtons';
import { TOKEN } from 'constant/api.constant';
import { ROUTE } from 'constant/route.constant';
import { handleToken } from 'service/auth';
import BackButton from 'components/Common/BackButton';
import { loginParser } from 'service/auth.parser';
import useUserInfo from 'hooks/useUserInfo';
import * as S from './Login.style';

export default function Login() {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();
  const { updateUserInfo } = useUserInfo({ notifyNewMessage, notifyDispatch });

  const handleShowEssesntialModal = () => {
    navigate(ROUTE.ESSENTIAL_INFO.INDEX);
  };

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
      handleToken.saveAccessToken(headers[TOKEN.ACCESS]);
      handleToken.saveRefreshToken(headers[TOKEN.REFRESH]);
      notifyNewMessage(notifyDispatch, '로그인이 성공적으로 완료되었습니다.', TOAST_TYPE.Success);
      setTimeout(() => {
        if (isFirstLogin) {
          handleShowEssesntialModal();
        } else {
          updateUserInfo();
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
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
      <BackButton />
      <S.Header>
        <S.MainLogo />
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
      <SocailLoginButtons>소셜계정으로 로그인</SocailLoginButtons>
      <Outlet />
    </S.Container>
  );
}
