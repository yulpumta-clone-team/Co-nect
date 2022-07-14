import React from 'react';

export default function Nickname() {
  return (
    <>
      <input
        {...register('nickname', {
          required: '2자리 이상 닉네임을 입력해주세요.',
          minLength: 2,
        })}
        placeholder="nickname"
      />
      <span>{errors?.nickname?.message}</span>
    </>
  );
}
