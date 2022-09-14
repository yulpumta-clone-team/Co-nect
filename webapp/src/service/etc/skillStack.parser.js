/**
 * 기술스택 raw데이터를 파싱하는 함수
 * @param {RawTechSkill} techSkills 기술스택 raw 배열 {key, category, techName, image}
 * @returns {ParsedTechSkill} 파싱된 기술스택 스키마 {id, category, label, value, image}
 */
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

/**
 * 기술스택 배열을 categroy별로 묶는 함수
 * @param {ParsedTechSkill} techSkills 파싱된 기술스택 스키마 {id, category, label, value, image}
 * @returns {CategoryTechSkill}  카테고리별로 파싱된 기술스택 스키마
 */
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

/**
 * 기술스택 배열을 id로 변환하는 함수
 * @param {ParsedTechSkill} techSkills 파싱된 기술스택 스키마 {id, category, label, value, image}
 * @returns {Array<number>}  기술스택 id 배열
 */
export const skillStackParserToIds = (techSkills) => techSkills.map(({ id }) => id);
