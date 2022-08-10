import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { OAUTH_URL } from 'constant/route';
import authApi from 'api/auth';
import { notifyNewMessage } from 'contexts/ToastNotification/action';
import { useToastNotificationAction } from 'contexts/ToastNotification';
import { TOAST_TYPE } from 'contexts/ToastNotification/type';
import * as S from './style';

export default function Login() {
  const notifyDispatch = useToastNotificationAction();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [apiError, setApiError] = useState({ isError: false, msg: '' });
  const onValid = async (submitData) => {
    const { email, password } = submitData;
    try {
      const response = await authApi.POST_LOGIN({ email, pwd: password });
      console.log(response);
      // 최초 로그인인지 아닌지
      navigate('/essential_info');
      // TODO: 성공시 이동할 페이지 정해서 이동시키기
    } catch (apiError) {
      console.error(apiError);
      notifyNewMessage(notifyDispatch, apiError, TOAST_TYPE.Error);
      setApiError({
        isError: true,
        msg: apiError,
      });
    }
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
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/i,
                  message: '이메일 형식으로 입력해주세요.',
                },
              })}
              placeholder="email"
            />
            <span>{errors?.email?.message}</span>
            <input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              placeholder="password"
            />
            <span>{errors?.password?.message}</span>
            <button type="submit">로그인</button>
            <span>{errors?.extraError?.message}</span>
          </form>
          <a href={OAUTH_URL.GITHUB}>Github</a>
          <br />
          <a href={OAUTH_URL.GOOGLE}>Google</a>
        </S.DialogBox>
      </S.Backdrop>
    </S.ModalContainer>
  );
}
