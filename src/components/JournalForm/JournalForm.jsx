import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useEffect, useReducer, useRef, useContext} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

const JournalForm = ({onSubmit, selectActivePost, activePost, deletePost}) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(()=> {
		if (activePost) {
			const post = {
				...activePost,
				date: activePost.date.toISOString().split('T')[0]
			};
			dispatchForm({
				type: 'SET_VALUE',
				payload: post
			});
		} else {
			dispatchForm({
				type: 'CLEAR'});
		}
	}, [activePost]);

	useEffect(()=> {
		let timerId;
		if (!isValid.title || !isValid.post || !isValid.date) {
			focusError(isValid);
			timerId = setTimeout(()=> {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);


	useEffect(() => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {userId}
		});
	}, [userId]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit({
				...values,
				userId
			});
			dispatchForm({
				type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, onSubmit, values, userId]);


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
		selectActivePost(null);
	};

	const deletePostHandler = (e) => {
		e.preventDefault();
		if (activePost) {
			deletePost(activePost.id);
			selectActivePost(null);
			dispatchForm({
				type: 'CLEAR'});
		}
	};


	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					isValid={isValid.title}
					appearance={'title'}
					value={values.title}
					onChange={onChange}
					placeholder={'Введите название'}
					type="text"
					name={'title'}
					ref={titleRef}
				/>
				{activePost &&
					<button className={styles['journal-border__delete-button']} onClick={deletePostHandler}>
						<img src="../../../public/archive-icon.svg" alt=""/>
					</button>
				}

			</div>
			<div className={styles['journal-form__form-wrapper']}>
				<div className={styles['journal-form__date-input-wrapper']}>
					<label htmlFor="date">
						<img src="../../../public/calendar-icon.svg" alt="Calendar icon"/>
						<span>Дата</span>
					</label>
					<Input
						className={cn(styles['journal-form__date-input'])}
						isValid={isValid.date}
						value={values.date}
						// value={'2029-01-03'}
						onChange={onChange}
						placeholder={'Введите дату'}
						type="date"
						name={'date'}
						ref={dateRef}
						id={'date'}
					/>
				</div>
				<div className={styles['journal-form__tag-input-wrapper']}>
					<label htmlFor="tag">
						<img src="../../../public/folder-icon.svg" alt="Calendar icon"/>
						<span>Метки</span>
					</label>
					<Input
						className={cn(styles['journal-form__tag-input'])}
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
				ref={postRef}
				cols="30"
				rows="10">
			</textarea>
			<Button  className={styles['journal-form__button']}>Сохранить</Button>
		</form>
	);
};

export default JournalForm;