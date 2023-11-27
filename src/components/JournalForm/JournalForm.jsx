import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useEffect, useReducer} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';

// const INITIAL_FORM_VALID_STATE = {
// 	title: true,
// 	post: true,
// 	date: true
// };

const JournalForm = ({onSubmit}) => {
	// const [formValidState, setFormValidState] = useState(INITIAL_FORM_VALID_STATE);
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(()=> {
		let timerId;
		if (!isValid.title || !isValid.post || !isValid.date) {
			timerId = setTimeout(()=> {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({
				type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, onSubmit, values]);

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {[e.target.name]: e.target.value}
		});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({
			type: 'SUBMIT'});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					className={cn( styles.input, styles['journal-form__title-input'],
						{
							[styles.invalid] : !isValid.title
						})}
					value={values.title}
					onChange={onChange}
					placeholder={'Введите название'}
					type="text"
					name={'title'}
				/>
			</div>
			<div className={styles['journal-form__form-wrapper']}>
				<div className={styles['journal-form__date-input-wrapper']}>
					<label htmlFor="date">
						<img src="../../../public/calendar-icon.svg" alt="Calendar icon"/>
						<span>Дата</span>
					</label>
					<input
						className={cn( styles.input, styles['journal-form__date-input'],
							{
								[styles.invalid] : !isValid.date
							})}
						value={values.date}
						onChange={onChange}
						placeholder={'Введите дату'}
						type="date"
						name={'date'}
						id={'date'}
					/>
				</div>
				<div className={styles['journal-form__tag-input-wrapper']}>
					<label htmlFor="tag">
						<img src="../../../public/folder-icon.svg" alt="Calendar icon"/>
						<span>Метки</span>
					</label>
					<input
						className={cn(styles.input, styles['journal-form__tag-input'])}
						value={values.tag}
						onChange={onChange}
						placeholder={'Введите тег'}
						type="text"
						name={'tag'}
						id={'tag'}
					/>
				</div>
			</div>
			<textarea
				className={cn( styles.input, styles['journal-form__post-input'],
					{
						[styles.invalid] : !isValid.post
					})}
				value={values.post}
				onChange={onChange}
				name="post" id=""
				cols="30"
				rows="10">
			</textarea>
			<Button  className={styles['journal-form__button']} text={'Сохранить'}/>
		</form>
	);
};

export default JournalForm;