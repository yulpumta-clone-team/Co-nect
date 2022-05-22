import { DEFAULT_PROFILE_IMG } from 'constant';

export function setDefaultProfileImage(img) {
  return (!img || img.length < 10) && DEFAULT_PROFILE_IMG;
}

export const languageSkills = {
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
