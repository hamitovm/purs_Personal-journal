import styles from './Button.module.css';
import cn from 'classnames';

function Button({ text, onClick, className}) {
	return (
		<button className={cn(styles.button, styles.accent, className)}
			onClick={onClick}
		>{ text}</button>
	);
}

export default Button;
