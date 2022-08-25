export const skillStackParserToSelectInput = (techSkills) =>
  techSkills
    .map(({ key, category, techName, image }) => ({
      label: techName,
      value: techName,
      id: key,
      image,
      category,
    }))
    .sort((a, b) => a.id - b.id); // id를 기준으로 오름차순 정렬

export const skillStackParserToIds = (techSkills) => techSkills.map(({ key }) => key);
