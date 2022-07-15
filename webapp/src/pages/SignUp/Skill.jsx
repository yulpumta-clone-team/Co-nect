import React, { useCallback, useState } from 'react';
import { skillOptions } from 'constant';

export default function Skill() {
  const [userSkill, setUserSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const onSkillChange = useCallback((e) => {
    setUserSkill(e.target.value);
    setSelectedSkills((prev) => [...prev, e.target.value]);
  }, []);
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
