import styles from './Header.module.css';

const Header = () => {
	return (
		<img className={styles.logo} src="../../../public/logo.svg" alt="Логотип журнала"/>
	);
};

export default Header;