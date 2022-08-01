import { useState, useEffect, useRef } from 'react';

const useDropdown = (initialMode = false) => {
  const parent = useRef();

  const [isDropdownOpen, setIsDropdownOpen] = useState(initialMode);

  const shouldCloseDropdown = (event) => {
    const isParentExistInComposedPath = event.composedPath().includes(parent.current);
    if (isParentExistInComposedPath) return;
    closeDropdown();
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const openDropdown = () => setIsDropdownOpen(true);

  useEffect(() => {
    window.addEventListener('click', shouldCloseDropdown, true);

    return () => {
      window.removeEventListener('click', shouldCloseDropdown, true);
    };
  }, [parent]);
  return [parent, isDropdownOpen, shouldCloseDropdown, openDropdown, closeDropdown];
};

export default useDropdown;
