import React from 'react';

export default function nickname() {
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
