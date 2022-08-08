import React, { useCallback, useState } from 'react';
import { skillOptions } from 'constant';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP, SIGN_UP_INFO } from 'constant/route';

Skill.propTypes = {
  selectedSkills: PropTypes.array.isRequired,
  userSkill: PropTypes.string.isRequired,
  onSkillChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default function Skill({ userSkill, onSkillChange, errors, selectedSkills, id }) {
  const navigate = useNavigate();
  const handleClickButton = (event) => {
    const { target } = event;
    if (selectedSkills) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.SLOGAN);
    }
  };
  // key 값으로 전달해주기! string 말고 key값으로!!
  return (
    <div>
      <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
      <br />
      <select value={id} onChange={onSkillChange}>
        {skillOptions.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span>{errors?.skill?.message}</span>
      <div>
        <button type="button" onClick={handleClickButton}>
          다음
        </button>
      </div>
    </div>
  );
}
