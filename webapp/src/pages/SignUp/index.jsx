import React from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from 'api/auth.api';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import signUpValidate from 'service/signUp.validation';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Divider from 'components/Common/Divider';
import Button from 'components/Common/Button';
import SocailLoginButtons from 'components/SocialLoginButtons';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import BackButton from 'components/Common/BackButton';
import * as S from './SignUp.style';

export default function SignUp() {
  const navigate = useNavigate();
  const notifyDispatch = useToastNotificationAction();
  const submitCallback = async (submitData) => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', TOAST_TYPE.Info);
    try {
      const response = await authApi.signUp({ data: submitData });
      const { message } = response.data;
      notifyNewMessage(notifyDispatch, message, TOAST_TYPE.Success);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, TOAST_TYPE.Error);
    }
  };

  const { inputValues, validateError, onChangeHandler, submitHandler, satisfyAllValidites } =
    useForm({
      initialValues: { email: '', password: '', verifiedPassword: '' },
      submitCallback,
      validate: signUpValidate,
    });

  const onClickCheckDuplicateEmail = async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', 'Info');
    try {
      const response = await authApi.checkDuplicateEmail({ data: inputValues.email });
      const { message } = response.data;
      notifyNewMessage(notifyDispatch, message, 'Success');
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error, 'Error');
    }
  };

  return (
    <S.Container>
      <BackButton />
      <S.Header>
        <h2>환영합니다!</h2>
        <span>회원 가입을 통해 팀에게 꼭 맞는 팀원을 만나보세요!</span>
      </S.Header>
      <S.Form onSubmit={submitHandler}>
        <S.DuplicateCheckInput>
          <TextInput
            name="email"
            type="email"
            placeholder="이메일"
            value={inputValues.email}
            onChange={onChangeHandler}
            isError={!!validateError.email}
            helperText={validateError.email}
          />
          <Button
            theme="secondary"
            customStyle={S.DuplicateCheckButton}
            onClick={onClickCheckDuplicateEmail}
          >
            중복확인
          </Button>
        </S.DuplicateCheckInput>
        <TextInput
          name="password"
          type="password"
          placeholder="비밀번호"
          value={inputValues.password}
          onChange={onChangeHandler}
          isError={!!validateError.password}
          helperText={validateError.password}
        />
        <TextInput
          name="verifiedPassword"
          type="password"
          placeholder="비밀번호 확인"
          value={inputValues.verifiedPassword}
          onChange={onChangeHandler}
          isError={!!validateError.verifiedPassword}
          helperText={validateError.verifiedPassword}
        />
      </S.Form>
      <Button
        theme="primary"
        type="submit"
        disabled={!satisfyAllValidites}
        customStyle={S.SubmitButton}
      >
        Sign up
      </Button>
      <Divider width="500" marginTop="73" marginBottom="38" />
      <SocailLoginButtons>소셜계정으로 회원가입</SocailLoginButtons>
    </S.Container>
  );
}
