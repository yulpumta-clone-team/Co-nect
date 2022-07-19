import useInput from 'hooks/useInput';
import React from 'react';
import { hopeSessionOption } from 'constant';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

SessionJob.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function SessionJob({ register }) {
  const navigate = useNavigate();
  const [hopeSession, onHopeSessionChange] = useInput('무관');
  const [userJob, onJobChange] = useInput('');
  return (
    <div>
      <span>희망 작업 기간</span>
      <select value={hopeSession} onChange={onHopeSessionChange}>
        {hopeSessionOption.map(({ id, value }) => (
          <option key={id} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input value={userJob} onChange={onJobChange} placeholder="직업" />
      <div>
        <NavLink to="/signup/slogan-portfolio">다음</NavLink>
      </div>
    </div>
  );
}
