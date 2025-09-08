import { SearchBar } from '@components';
import styles from './Header.module.scss';
import { useState } from 'react';
import type { Category } from 'src/types/Category';

interface HeaderProps {
    categories?: Category[];
}

const Header = ({ categories }: HeaderProps) => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className={styles.header}>
            <img className={`${styles.headerLogo} ${searchOpen ? styles.headerLogoHidden : ''} `} src="/Dentsu_logo.svg.png" alt="Logo" />
            <SearchBar options={categories} setSearchOpen={setSearchOpen} />
        </header>
    );
};

export default Header;
