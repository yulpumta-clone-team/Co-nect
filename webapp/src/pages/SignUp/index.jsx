import React from 'react';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Divider from 'components/Common/Divider';
import Button from 'components/Common/Button';
import SocialLoginButtons from 'components/SocialLoginButtons';
import BackButton from 'components/Common/BackButton';
import { signUpParser } from 'service/auth/auth.parser';
import { ROUTE } from 'constant/route.constant';
import useAuthService from 'hooks/useAuthService';
import useCheckUserDuplicate from 'hooks/useCheckUserDuplicate';
import { signUpValidate } from 'service/auth/auth.validation';
import * as S from './SignUp.style';

export default function SignUp() {
  const { requestSignUp } = useAuthService();
  const { isEmailDuplicate, onClickCheckDuplicateEmail } = useCheckUserDuplicate();

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

  const canActiveSignUpButton = !satisfyAllValidates || isEmailDuplicate;

  return (
    <S.Container>
      <BackButton url={ROUTE.HOME} />
      <S.Header>
        <h2>환영합니다!</h2>
        <span>회원 가입을 통해 팀에게 꼭 맞는 팀원을 만나보세요!</span>
      </S.Header>
      <S.Form onSubmit={submitHandler} id="signUpForm">
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
            onClick={() => onClickCheckDuplicateEmail(inputValues.email)}
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
        form="signUpForm"
        type="submit"
        disabled={canActiveSignUpButton}
        customStyle={S.SubmitButton}
      >
        Sign up
      </Button>
      <Divider width="500px" marginTop="73px" marginBottom="38px" />
      <SocialLoginButtons>소셜계정으로 회원가입</SocialLoginButtons>
    </S.Container>
  );
}
