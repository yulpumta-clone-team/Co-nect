import React from 'react';
import PropTypes from 'prop-types';
import { loginValidate } from 'service/auth/auth.validation';
import useForm from 'hooks/useForm';
import TextInput from 'components/Common/TextInput';
import Button from 'components/Common/Button';
import Divider from 'components/Common/Divider';
import SocialLoginButtons from 'components/SocialLoginButtons';
import { ROUTE } from 'constant/route.constant';
import BackButton from 'components/Common/BackButton';
import { loginParser } from 'service/auth/auth.parser';
import MainLogoImg from 'assets/images/main-logo.png';
import useAuthService from 'hooks/useAuthService';
import * as S from './Login.style';

Login.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Login({ children }) {
  const { requestLogin } = useAuthService();

  const submitCallback = async (submitData) => {
    const parsedSubmitData = loginParser(submitData);
    requestLogin(parsedSubmitData);
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
      <SocialLoginButtons />
      {children}
    </S.Container>
  );
}
