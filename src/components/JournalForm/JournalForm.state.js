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
		return {
			...state,
			values: {
				...state.values,
				...action.payload
			}
		};
	case 'CLEAR':
		return INITIAL_STATE;
	case 'SUBMIT': {
		const postValidity = action.payload.post.trim().length;
		const titleValidity = action.payload.title.trim().length;
		const dateValidity = action.payload.date;
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