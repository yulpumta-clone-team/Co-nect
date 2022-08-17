import React from 'react';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route.constant';
import { useNavigate } from 'react-router-dom';
import { categoryList } from 'constant';

BelongTeam.propTypes = {
  isTeamBelong: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
};

export default function BelongTeam({ isTeamBelong, onChecked }) {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate(ESSENTIAL_INFO + SIGN_UP_INFO.IMG_PORTFOLIO);
  };
  return (
    <div>
      <p>팀 소속 여부를 선택해주세요</p>
      <div>
        <input type="checkbox" name="belong_team" onClick={onChecked} value={isTeamBelong} />
      </div>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
