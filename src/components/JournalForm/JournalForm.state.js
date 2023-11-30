export const INITIAL_STATE = {
	isValid: {
		title: true,
		post: true,
		date: true
	},
	values: {
		title: '',
		post: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export const formReducer = (state, action) => {
	switch (action.type) {
	case 'RESET_VALIDITY':
		return {
			...state,
			isValid: INITIAL_STATE.isValid
		};
	case 'SET_VALUE':
		console.log(action.payload);
		return {
			...state,
			values: {
				...state.values,
				...action.payload
			}
		};
	case 'SET_SELECTED_POST':
		return {
			...state,
			isvalid: INITIAL_STATE.isValid,
			values: {
				...action.payload
			},
			isFormReadyToSubmit: false
		};
	case 'CLEAR':
		return INITIAL_STATE;
	case 'SUBMIT': {
		const postValidity = state.values.post.trim().length;
		const titleValidity = state.values.title.trim().length;
		const dateValidity = state.values.date;
		return {
			...state,
			isValid: {
				title: titleValidity,
				post: postValidity,
				date: dateValidity
			},
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity
		};
	}
	}
};
