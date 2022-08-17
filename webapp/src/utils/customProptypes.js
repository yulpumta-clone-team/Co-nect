/* eslint-disable consistent-return */
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
