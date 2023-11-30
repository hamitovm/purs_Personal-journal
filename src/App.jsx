import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useLocalstorage} from './hooks/use-localstorage.hook.js';
import {UserContext, UserContextProvider} from './context/user.context.jsx';
import { useState, useContext } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items
		.map(item => ({
			...item,
			date: new Date(item.date)
		}));
}

function App() {
	const [items, saveItems] = useLocalstorage('data');
	const [activePost, setActivePost] = useState(null);
	const { userId } = useContext(UserContext);

	const addItem = (newItem) => {
		const newItems = [...mapItems(items)
			.filter(el => el.id !== newItem.id),
		{
			...newItem,
			date: new Date(newItem.date),
			id: newItem.id ? newItem.id : items?.length > 0 ? Math.max( ...items.map(el => el.id)) + 1 : 1
		}];
		saveItems(newItems);
	};

	const selectActivePost = (post) => {
		setActivePost(post);
	};

	const deletePost = (id) => {
		saveItems([...items.filter(el => el.id !== id)]);
	};



	const clearForm = () => {
		setActivePost(null);
	};



	return (
		<UserContextProvider>
			<div className={'app'}>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={clearForm}/>
					<JournalList
						selectActivePost={selectActivePost}
						items={mapItems(items, userId)}
					/>
				</LeftPanel>
				<Body>
					<JournalForm
						activePost={activePost}
						selectActivePost={selectActivePost}
						deletePost={deletePost}
						onSubmit={addItem}/>

				</Body>
			</div>
		</UserContextProvider>

	);
}

export default App;
