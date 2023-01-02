import { useState, useEffect, useRef } from 'react';

/**
 * useDropdown를 사용하는 곳에서 사용할 method 및 state
 * @typedef {Object} useDropdownReturns
 * @property {Object} parent 부모에 등록할 useRef 객체
 * @property {boolean} isDropdownOpen 해당 dropdown 컴포넌트를 보여줄지 말지
 * @property {(Event) => void} handleClickOutside 요소 밖을 클릭했을 때 dropdown 컴포넌트를 닫는 함수
 * @property {(Event) => void} shouldCloseDropdown 요소 밖을 클릭했을 때 dropdown 컴포넌트를 닫는 함수
 * @property {() => void} openDropdown dropdown 컴포넌트를 여는 함수
 * @property {() => void} closeDropdown dropdown 컴포넌트를 닫는 함수
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
    if (!isParentExistInComposedPath) {
      setIsDropdownOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    const isParentExistInComposedPath = event.composedPath().includes(parent.current);
    if (!isParentExistInComposedPath) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleClickdropdownTrigger = () => {
    isDropdownOpen ? closeDropdown() : openDropdown();
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
    handleClickdropdownTrigger,
  };
};

export default useDropdown;
