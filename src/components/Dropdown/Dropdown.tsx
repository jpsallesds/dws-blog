import { useState, useRef, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import styles from './Dropdown.module.scss';
import type { Category } from 'src/types/Category';
import type { Author } from 'src/types/Author';

interface DropdownProps {
    options: Category[] | Author[];
    placeholder?: string;
}

const Dropdown = ({ options, placeholder = "Category" }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: string) => {
        setSelected(prev => {
            const exists = prev.includes(option);
            const newSelected = exists ? prev.filter(item => item !== option) : [...prev, option];
            return newSelected;
        });
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelected([]);
    };

    useEffect(() => {
  const handleClickOutside = (e: PointerEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("pointerdown", handleClickOutside);
  return () => document.removeEventListener("pointerdown", handleClickOutside);
}, []);


    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button type="button" className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                {selected.length > 0 ? selected.join(', ') : placeholder}

                {selected.length > 0 ? (
                    <span className={styles.icon} onClick={handleReset}>
                        ✕
                    </span>
                ) : (
                    <span className={styles.icon}>
                        <FaAngleDown size={12} />
                    </span>
                )}
            </button>

            {isOpen && (
                <div className={styles.menuContainer}>
                    <ul className={styles.menu}>
                        {options.map(option => (
                            <li
                                key={option.id}
                                className={styles.option}
                                onClick={() => handleSelect(option.name)}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
