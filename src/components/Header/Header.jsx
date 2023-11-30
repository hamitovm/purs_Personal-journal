import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser.jsx';

const Header = () => {
	return (
		<>
			<img className={styles.logo} src="../../../public/logo.svg" alt="Логотип журнала"/>
			<SelectUser/>
		</>

	);
};

export default Header;