import { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { IoSearch } from 'react-icons/io5';
import type { Category } from 'src/types/Category';

interface SearchBarProps {
  options?: Category[];
  setSearchOpen?: (open: boolean) => void; 
}

const SearchBar = ({ options, setSearchOpen }: SearchBarProps) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= BREAKPOINTS.desktop);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= BREAKPOINTS.desktop);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setSearchOpen?.(true);
  };

  return (
    <div className={`${styles.searchBar} ${isOpen && !isDesktop ? styles.expanded : ''}`}>
      {!isOpen && !isDesktop ? (
        <button className={styles.iconButton} onClick={handleOpen}>
          <IoSearch size={24} />
        </button>
      ) : (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className={styles.input}
            autoFocus={!isDesktop}
            list="search-options"
          />
          <datalist id="search-options">
            {options?.map((option) => (
              <option key={option.id} value={option.name} />
            ))}
          </datalist>
        </>
      )}
    </div>
  );
};

export default SearchBar;
