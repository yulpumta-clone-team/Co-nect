import { useCallback, useState } from 'react';
import { languageSkills } from 'utils/constant';

const useFilter = () => {
  const [checked, setChecked] = useState([
    100, 101, 102, 103, 104, 200, 201, 202, 203, 300, 301, 302,
  ]);
  const handleFilter = useCallback(
    (list) => {
      if (list.length === 0 || !list) return [];
      const checkedList = checked.map((e) => languageSkills[e]);
      const newList = [...list].filter(
        ({ skills }) => skills.filter((x) => checkedList.includes(x)).length > 0,
      );
      return newList;
    },
    [checked],
  );
  return [checked, setChecked, handleFilter];
};

export default useFilter;
