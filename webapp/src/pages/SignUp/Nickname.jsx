import React from 'react';
import { useForm } from 'react-hook-form';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';
import { useNavigate } from 'react-router-dom';

export default function Nickname() {
  const navigate = useNavigate();
  const {
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const { handleSubmit } = useForm({
    defaultValues: {},
  });
  const onValid = async (submitData) => {
    const { email, nickname, password, verifiedPassword } = submitData;
    if (password !== verifiedPassword) {
      setError('verifiedPassword', { message: 'Password is not same' }, { shouldFocus: true });
    }
    const signUpInfo = {
      email,
      name: nickname,
      pwd: password,
    };
    // TODO: input validation 추가해야 함.
    const { value, error, isError } = await handleFetcher(authApi.POST_SIGN_UP, signUpInfo);
    if (isError) {
      console.log(error);
      return;
    }
    navigate('/login');
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register('nickname', {
            required: '2자리 이상 닉네임을 입력해주세요.',
            minLength: 2,
          })}
          placeholder="nickname"
        />
        <span>{errors?.nickname?.message}</span>
      </form>
    </div>
  );
}
