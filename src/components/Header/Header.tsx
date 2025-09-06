import styles from './Header.module.scss'


const Header = () => {
    return (
        <header className={styles.header}>
           <div>
            <img className={styles.headerLogo} src="Dentsu_logo.svg.png" alt="" />
            </div> 
        </header>
    );
}

export default Header;