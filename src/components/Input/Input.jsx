import styles from './Input.module.css';
import cn from 'classnames';
import {forwardRef} from 'react';

const Input = forwardRef(function Input({ className, isValid = true, appearance, ...props}, ref) {
	return (
		<input {...props}
			className={cn( className, styles['input'],
				{
					[styles['input-title']] : appearance === 'title',
					[styles['invalid']] : !isValid
				})}
			ref={ref}
		/>
	);
});

export default Input;