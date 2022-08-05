import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authApi from 'api/auth';
import IdPassword from './IdPassword';
import * as S from './style';

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [apiError, setApiError] = useState({ isError: false, msg: '' });

  const onValid = async (submitData) => {
    const { email, nickname, password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const signUpInfo = {
      email,
      pwd: password,
      name: '',
      content: '',
      hope_session: '',
      img: '',
      job: '',
      portfolio: '',
      skills: [''],
      slogan: '',
    };
    // TODO: input validation 추가해야 함.
    try {
      const response = await authApi.POST_SIGN_UP(signUpInfo);
      console.log(response);
      navigate('/login');
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (apiError) {
      console.error(apiError);
      setApiError({
        isError: true,
        msg: apiError,
      });
    }
    // console.log(signUpInfo);
  };
  return (
    <S.ModalContainer>
      <S.Backdrop>
        <S.DialogBox>
          <button onClick={() => navigate('/')}>x</button>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onValid)}
          >
            <IdPassword register={register} errors={errors} />
          </form>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
