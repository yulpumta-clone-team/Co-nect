export const USER = 'user';
export const TEAM = 'team';
export const AUTH_KEY = 'Authorization';
export const USER_INFO = 'userInfo';
export const DEFAULT_PROFILE_IMG =
  'https://user-images.githubusercontent.com/71386219/157435570-a48382a8-63e5-4d25-91f4-e506289424b5.png';

export const belongTeamOptions = [
  { id: 0, label: '팀소속 ✅', value: true },
  { id: 1, label: '팀소속 ❌', value: false },
];

export const jobOptions = [
  { id: 0, value: '학생', label: '학생' },
  { id: 1, value: '실무자', label: '실무자' },
  { id: 2, value: '무직', label: '무직' },
];

export const hopeSessionOption = [
  { id: 0, value: '무관', label: '무관' },
  { id: 1, value: '1개월 이하', label: '1개월 이하' },
  { id: 2, value: '3개월 이하', label: '3개월 이하' },
  { id: 3, value: '6개월 이하', label: '6개월 이하' },
  { id: 4, value: '6개월 이상', label: '6개월 이상' },
];

export const categoryList = [
  { id: 0, value: '팀 소속 O', label: '팀 소속 O' },
  { id: 1, value: '팀 소속 X', label: '팀 소속 X' },
];

export const DOMAIN_TYPE = {
  USER: 'user',
  TEAM: 'team',
};

export const POST_TYPE = {
  LIKE: 'like',
  READ: 'read',
};
