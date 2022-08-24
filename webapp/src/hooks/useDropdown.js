import { useState, useEffect, useRef } from 'react';

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
