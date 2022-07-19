import useInput from 'hooks/useInput';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        <NavLink to="/signup/content">다음</NavLink>
      </div>
    </div>
  );
}
