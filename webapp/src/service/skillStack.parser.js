export const skillStackParser = (techSkills) => {
  if (!techSkills || techSkills?.length === 0) {
    return [];
  }
  return techSkills
    .map(({ key, category, techName, image }) => ({
      label: techName,
      value: techName,
      id: key,
      image,
      category,
    }))
    .sort((a, b) => a.id - b.id); // id를 기준으로 오름차순 정렬
};

// techskills: [{category: string, id: number, image: string, label: string, value: string}]
export const skillStackParserToIds = (techSkills) => techSkills.map(({ id }) => id);
