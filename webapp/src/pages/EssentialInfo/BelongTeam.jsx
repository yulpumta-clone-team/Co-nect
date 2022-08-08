import React from 'react';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP_INFO } from 'constant/route';
import { useNavigate } from 'react-router-dom';
import { categoryList } from 'constant';

BelongTeam.propTypes = {
  checkedList: PropTypes.string.isRequired,
  onCheckedElement: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default function BelongTeam({ checkedList, onCheckedElement, errors }) {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate(ESSENTIAL_INFO + SIGN_UP_INFO.IMG_PORTFOLIO);
  };
  return (
    <div>
      <p>팀 소속 여부를 선택해주세요</p>
      {categoryList.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            name="belong_team"
            value={item.value}
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes(item.value) ? 1 : 0}
          />
          <div>{item.value}</div>
        </div>
      ))}
      <span>{errors?.checkedList?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
