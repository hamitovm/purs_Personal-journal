import styles from './Button.module.css';
import cn from 'classnames';

function Button({ children, onClick, className }) {
	return (
		<button className={cn(styles.button, styles.accent, className)}
			onClick={onClick}
		>
			{ children }
		</button>
	);
}

export default Button;
