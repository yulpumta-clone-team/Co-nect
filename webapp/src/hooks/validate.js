export default function validate({
  nickname,
  skill,
  selectedSlogan,
  hopeSession,
  selectedJob,
  checkedList,
}) {
  const errors = {};

  if (!nickname) {
    errors.email = '닉네임이 입력되지 않앗습니다.';
  } else if (nickname.length < 1) {
    errors.nickname = '1자 이상의 닉네임을 사용해야 합니다.';
  }

  if (!skill) {
    errors.password = '기술이 선택되지 않았습니다.';
  }

  if (!selectedSlogan) {
    errors.password = '슬로건이 입력되지 않았습니다.';
  }
  if (!hopeSession) {
    errors.password = '희망기간이 선택되지 않았습니다.';
  }
  if (!selectedJob) {
    errors.password = '직업이 선택되지 않았습니다.';
  }
  if (!checkedList) {
    errors.password = '팀소속여부가 선택되지 않았습니다.';
  }

  return errors;
}
