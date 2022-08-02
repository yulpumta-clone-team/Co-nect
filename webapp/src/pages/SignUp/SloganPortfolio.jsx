import useInput from 'hooks/useInput';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGN_UP, SIGN_UP_INFO } from 'constant/route';

SloganPortfolio.propTypes = {
  userPortfolio: PropTypes.string.isRequired,
  onPortfolioChange: PropTypes.func.isRequired,
  userSlogan: PropTypes.string.isRequired,
  onSloganChange: PropTypes.func.isRequired,
};

export default function SloganPortfolio({
  userPortfolio,
  onPortfolioChange,
  userSlogan,
  onSloganChange,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <input value={userSlogan} onChange={onSloganChange} placeholder="slogan" />
      <input value={userPortfolio} onChange={onPortfolioChange} placeholder="포트폴리오" />
      <div>
        <Link to={SIGN_UP + SIGN_UP_INFO.CONTENT}>다음</Link>
      </div>
    </div>
  );
}
