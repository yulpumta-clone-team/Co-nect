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
};

export default function Skill({ userSkill, onSkillChange, errors, selectedSkills }) {
  const navigate = useNavigate();
  const handleClickButton = (event) => {
    const { target } = event;
    if (userSkill) {
      target.disabled = false;
      navigate(ESSENTIAL_INFO + SIGN_UP_INFO.SLOGAN);
    }
  };
  return (
    <div>
      <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
      <br />
      <select value={userSkill} onChange={onSkillChange}>
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
