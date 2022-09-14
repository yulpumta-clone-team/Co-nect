import { useState, useEffect, useRef } from 'react';

/**
 * useDropdown를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useDropdownReturns
 * @property {Object} parent 부모에 등록할 useRef 객체
 * @property {boolean} isDropdownOpen 해당 dropdown 컴포넌트를 보여줄지 말지
 * @property {function} handleClickOutside 요소 밖을 클릭했을 때 dropdown 컴포넌트를 닫는 함수
 * @property {function} shouldCloseDropdown 요소 밖을 클릭했을 때 dropdown 컴포넌트를 닫는 함수
 * @property {function} openDropdown dropdown 컴포넌트를 여는 함수
 * @property {function} closeDropdown dropdown 컴포넌트를 닫는 함수
 */

/**
 * dropdown컴포넌트를 열고닫기 위한 hooks
 * @param {boolean} initialMode 최초에 보여줄지 말지
 * @returns {useDropdownReturns} useDropdown를 사용하는 곳에서 사용할 method 및 state
 */
const useDropdown = (initialMode = false) => {
  const parent = useRef();

  const [isDropdownOpen, setIsDropdownOpen] = useState(initialMode);

  const shouldCloseDropdown = (event) => {
    const isParentExistInComposedPath = event.composedPath().includes(parent.current);
    if (isParentExistInComposedPath) {
      console.log(parent);
    } else {
      closeDropdown();
    }
  };

  const handleClickOutside = (event) => {
    if (parent.current && !parent.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const openDropdown = (event) => {
    // if (parent.current && parent.current.contains(event.target)) {
    //   setIsDropdownOpen(true);
    // }
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [parent]);
  return {
    parent,
    isDropdownOpen,
    handleClickOutside,
    shouldCloseDropdown,
    openDropdown,
    closeDropdown,
  };
};

export default useDropdown;
