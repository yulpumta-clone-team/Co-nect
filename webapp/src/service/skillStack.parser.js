export const skillStackParser = (techSkills) => {
  if (!techSkills || techSkills?.length === 0) {
    return [];
  }
  return techSkills
    .filter((arr, index, callback) => index === callback.findIndex((t) => t.key === arr.key))
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
export const skillStackParserWithCategory = (techSkills) =>
  techSkills.reduce((acc, cur) => {
    const newAcc = { ...acc };
    const { category } = cur;
    const targetCategory = newAcc[category];
    if (targetCategory) {
      newAcc[category] = [...newAcc[category], cur];
    } else {
      newAcc[category] = [cur];
    }
    return newAcc;
  }, {});

// techskills: [{category: string, id: number, image: string, label: string, value: string}]
export const skillStackParserToIds = (techSkills) => techSkills.map(({ id }) => id);
