import { useDarkModeStore } from '@/store/useDarkModeStore';
import { useEffect } from 'react';

const useDarkMode = () => {
  const { darkMode, setDarkMode } = useDarkModeStore();
  const htmlClasses = document.querySelector('html');

  const toggleDarkMode = () => {
    darkMode === 'light' ? setDarkMode('dark') : setDarkMode('light');
  };

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      htmlClasses?.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      htmlClasses?.classList.remove('dark');
    }
  }, [darkMode, htmlClasses]);

  return {
    toggleDarkMode,
  };
};

export default useDarkMode;
