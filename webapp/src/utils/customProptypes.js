/* eslint-disable consistent-return */

/**
 * theme의 타입을 확인하는 사용자 정의 proptypes 함수 : https://ko.reactjs.org/docs/typechecking-with-proptypes.html
 * @param {Object} props react props
 * @param {string} propName theme
 * @param {string} componentName 해당 함수를 적용한 react component
 * @returns {void} 에러가 발생하면  propTypes error를 throw
 */
export const themePropTypesChecker = (props, propName, componentName) => {
  const themes = ['primary', 'secondary', 'important', 'gray', 'none'];

  const isThemeNameValid = themes.filter((theme) => theme === props[propName]).length !== 0;

  if (!isThemeNameValid) {
    return new Error(`Invalid prop ${propName} passed to ${componentName}. Expected ${themes}`);
  }
};

// export const customStylePropTypesChecker = (props, propName, componentName) => {
//   if (!isThemeNameValid) {
//     return new Error(`Invalid prop ${propName} passed to ${componentName}. Expected ${themes}`);
//   }
// };
