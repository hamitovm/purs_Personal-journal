import {createContext} from 'react';
import {useState} from 'react';

export const UserContext = createContext({
	userId: 1
});

export const UserContextProvider = ({children}) => {
	const [userId, setUserId] = useState(1);
	const changeUserId = (value) => {
		console.log(userId);
		setUserId(value);
	};
	return (
		<UserContext.Provider value={{userId, setUserId: changeUserId}}>
			{children}
		</UserContext.Provider>
	)
	;
};