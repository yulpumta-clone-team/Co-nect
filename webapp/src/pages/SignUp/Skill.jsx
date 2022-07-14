import React from 'react';

export default function Skill() {
  return (
    <>
      <span>선택한 기술 스킬: {selectedSkills.join(', ')}</span>
      <select value={userSkill} onChange={onSkillChange}>
        {skillOptions.map(({ id, value, label }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
