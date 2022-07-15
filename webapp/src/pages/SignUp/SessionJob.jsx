import useInput from 'hooks/useInput';
import React from 'react';
import { hopeSessionOption } from 'constant';

export default function SessionJob() {
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userJob, onJobChange] = useInput('');
  return (
    <>
      <span>희망 작업 기간</span>
      <select value={hopeSession} onChange={onHopeSessionChange}>
        {hopeSessionOption.map(({ id, value }) => (
          <option key={id} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input name="job" onChange={onJobChange} value={userJob} placeholder="직업" />
    </>
  );
}
