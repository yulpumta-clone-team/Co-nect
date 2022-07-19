import useInput from 'hooks/useInput';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

SloganPortfolio.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function SloganPortfolio({ register }) {
  const navigate = useNavigate();
  const [userSlogan, onSloganChange] = useInput('');
  const [userPortfolio, onPortfolioChange] = useInput('');
  return (
    <div>
      <input
        {...register('slogan', {
          required: 'Slogan is required',
          pattern: {
            value: { userSlogan },
            message: '슬로건을 입력해주세요.',
          },
        })}
        onChange={onSloganChange}
        placeholder="slogan"
      />
      <input
        {...register('portfolio', {
          required: 'Portfolio is required',
          pattern: {
            value: { userPortfolio },
            message: '포트폴리오를 입력해주세요.',
          },
        })}
        onChange={onPortfolioChange}
        placeholder="포트폴리오"
      />
      <div>
        <NavLink to="/signup/content">다음</NavLink>
      </div>
    </div>
  );
}
