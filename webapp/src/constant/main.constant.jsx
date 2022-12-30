import { ROUTE } from './route.constant';

export const benefits = [
  { first: '팀원들을 한 페이지에서', second: '간단하게 만날 수 있습니다.' },
  { first: '프로젝트를 여러 사람에게', second: '소개할 수 있습니다.' },
  { first: '같은 목표를 가진', second: '사람들을 만날 수 있습니다.' },
];
export const developers = [
  { name: '김윤호', field: 'FRONTEND', email: '/github.com/kimyouknow' },
  { name: '왕호은', field: 'FRONTEND', email: '/github.com/hoeun0723' },
  { name: '오현석', field: 'BACKEND', email: '/github.com/philos1234' },
  { name: '윤효정', field: 'BACKEND', email: '/github.com/hyojeongyun' },
  { name: '정영혜', field: 'DESIGNER', email: 'younghye.hello@gmail.com' },
];

export const links = [
  { icon: 'signup', route: ROUTE.SIGN_UP },
  { icon: 'board', route: ROUTE.TEAM },
  { icon: 'post', route: ROUTE.NEW_POST },
];

export const cardText = [
  {
    spanFirst: '코넥트는',
    spanSecond: '이런 어플입니다.',
    defaults:
      '한 페이지에서 나와 같은 목표를 가진 팀원을 만나보세요! 다양한 사람들과 함께 팀을 구성해보세요.목표가 같은 코넥티를 찾아 프로젝트를 진행해봐요!',
    iconFront: 'cloud',
    iconBehind: 'ghost',
  },
  {
    spanFirst: ' 내가 원하는',
    spanSecond: '코넥티만을 골라서',
    defaults:
      ' 수많은 코넥티 중 기술, 직업, 희망 작업 기간 등을 필터링해 내 프로젝트에 딱 맞는 코넥티를 빠르고 쉽게 서치할 수 있습니다.',
    iconFront: 'earth',
    iconBehind: 'heartPoint',
  },
  {
    spanFirst: '한 페이지에서',
    spanSecond: '카드를 통해 빠르게',
    defaults:
      '프로젝트에 필수적인 정보만 보고 싶다! 모집분야, 기술스택 진행기간 등의 프로젝트 정보를 심플한 카드 형식에 담아 한눈에 볼 수 있습니다.',
    iconFront: 'cellPhone',
    iconBehind: 'message',
  },
];
