import React, { useCallback, useState } from 'react';
import { skillOptions } from 'constant';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ESSENTIAL_INFO, SIGN_UP, SIGN_UP_INFO } from 'constant/route';

Skill.propTypes = {
  selectedSkills: PropTypes.array.isRequired,
  userSkill: PropTypes.string.isRequired,
  onSkillChange: PropTypes.func.isRequired,
};

export default function Skill({ selectedSkills, userSkill, onSkillChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
      <select value={userSkill} onChange={onSkillChange}>
        {skillOptions.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div>
        <Link to={ESSENTIAL_INFO + SIGN_UP_INFO.IMG}>다음</Link>
      </div>
    </div>
  );
}
