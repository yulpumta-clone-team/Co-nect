import React, { useCallback, useState } from 'react';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';
import useInput from 'hooks/useInput';
import { SIGN_UP, SIGN_UP_INFO } from 'constant/route';
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
    };
    // TODO: input validation 추가해야 함.

    try {
      const response = await authApi.POST_SIGN_UP(signUpInfo);
      console.log(response);
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (apiError) {
      console.error(apiError);
      setApiError({
        isError: true,
        msg: apiError,
      });
    }
    navigate('/login');
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
            <Routes>
              <Route path="" element={<IdPassword register={register} errors={errors} />} />
            </Routes>
          </form>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
