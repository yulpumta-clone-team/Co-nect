import { useCallback, useState } from 'react';

const languageSkills = {
  100: 'Javascript',
  101: 'React',
  102: 'Vue',
  103: 'Angular',
  104: 'Svelte',
  105: 'Typescript',
  200: 'C',
  201: 'C++',
  202: 'C#',
  203: 'Java',
  204: 'Spring',
  205: 'Node.js',
  206: 'Python',
  207: 'Django',
  208: 'Ruby',
  209: 'Ruby',
  210: 'Go',
  300: 'Swift',
  301: 'Kotlin',
  302: 'Flutter',
  303: 'React-Native',
  304: 'Objective-C',
  400: 'XD',
  401: 'Figma',
};

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
