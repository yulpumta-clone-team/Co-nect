import React, { useCallback, useState } from 'react';
import { skillOptions } from 'constant';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

Skill.propTypes = {
  selectedSkills: PropTypes.object.isRequired,
  userSkill: PropTypes.object.isRequired,
  onSkillChange: PropTypes.object.isRequired,
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
        <NavLink to="/signup/img">다음</NavLink>
      </div>
    </div>
  );
}
