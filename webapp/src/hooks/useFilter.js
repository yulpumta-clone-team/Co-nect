import { useCallback, useState } from 'react';

const useFilter = () => {
  const [checked, setChecked] = useState([
    100, 101, 102, 103, 104, 200, 201, 202, 203, 300, 301, 302,
  ]);
  const filterObj = {
    100: 'front',
    101: 'react',
    102: 'js',
    103: 'ts',
    104: 'vue',
    200: 'back',
    201: 'nodejs',
    202: 'java',
    203: 'spring',
    300: 'design',
    301: 'xd',
    302: 'figma',
  };
  const handleFilter = useCallback(
    (list) => {
      if (list.length === 0 || !list) return [];
      const checkedList = checked.map((e) => filterObj[e]);
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
