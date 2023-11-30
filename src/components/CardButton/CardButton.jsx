import './CardButton.css';

function CardButton({children, className, ...restProps}) {
	const cl = 'card-button' + (className ? ' ' + className : '');

	return (
		<button className={cl} {...restProps}>{children}</button>
	);
}

export default CardButton;