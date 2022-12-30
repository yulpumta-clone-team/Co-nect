import React, { useState } from 'react';
import authApi from 'api/auth.api';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { signUpValidate } from 'service/auth/auth.validation';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Divider from 'components/Common/Divider';
import Button from 'components/Common/Button';
import SocailLoginButtons from 'components/SocialLoginButtons';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import BackButton from 'components/Common/BackButton';
import { signUpParser } from 'service/auth/auth.parser';
import { ROUTE } from 'constant/route.constant';
import useAuthService from 'hooks/useAuthService';
import * as S from './SignUp.style';

export default function SignUp() {
  const notifyDispatch = useToastNotificationAction();
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(true);
  const { requestSignUp } = useAuthService();

  const submitCallback = async (submitData) => {
    const parsedSubmitData = signUpParser(submitData);
    await requestSignUp(parsedSubmitData);
  };

  const { inputValues, validateError, onChangeHandler, submitHandler, satisfyAllValidates } =
    useForm({
      initialValues: { email: '', password: '', verifiedPassword: '' },
      submitCallback,
      validate: signUpValidate,
    });

  const onClickCheckDuplicateEmail = async () => {
    // TODO: 1초가 넘으면 처리중입니다 메세지 보여지게 수정
    notifyNewMessage(notifyDispatch, '처리 중입니다...', 'Info');
    try {
      const response = await authApi.checkDuplicateEmail({ email: inputValues.email });
      const isDuplicated = response.data;
      if (isDuplicated) {
        notifyNewMessage(notifyDispatch, '이미 사용중인 이메일니다!', TOAST_TYPE.Warning);
        setIsEmailDuplicate(true);
      } else {
        notifyNewMessage(notifyDispatch, '사용가능한 이메일니다!', TOAST_TYPE.Success);
        setIsEmailDuplicate(false);
      }
    } catch (error) {
      console.error(error);
      notifyNewMessage(notifyDispatch, error.message, 'Error');
    }
  };

  const canActiveSingupButton = !satisfyAllValidates || isEmailDuplicate;

  return (
    <S.Container>
      <BackButton url={ROUTE.HOME} />
      <S.Header>
        <h2>환영합니다!</h2>
        <span>회원 가입을 통해 팀에게 꼭 맞는 팀원을 만나보세요!</span>
      </S.Header>
      <S.Form onSubmit={submitHandler} id="signupForm">
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
            type="button"
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
        form="signupForm"
        type="submit"
        disabled={canActiveSingupButton}
        customStyle={S.SubmitButton}
      >
        Sign up
      </Button>
      <Divider width="500px" marginTop="73px" marginBottom="38px" />
      <SocailLoginButtons>소셜계정으로 회원가입</SocailLoginButtons>
    </S.Container>
  );
}
