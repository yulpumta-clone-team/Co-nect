import { ROUTE } from './route.constant';

export const emailRegex = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/i;
export const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}/;

export const emptyTrigger = {
  user: {
    emptyMessage: '등록된 회원이 없네요😓',
    triggerMessage: '회원가입을 해주세요!',
    triggerLink: ROUTE.SIGN_UP,
  },
  team: {
    emptyMessage: '등록된 팀이 없네요😓',
    triggerMessage: '새로운 팀을 등록해주세요!',
    triggerLink: ROUTE.NEW_POST,
  },
};
