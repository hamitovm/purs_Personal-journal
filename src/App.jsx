import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import Body from './layouts/Body/Body.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Header from './components/Header/Header.jsx';
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import {useEffect, useState} from 'react';

// const INITIAL_DATA = [
// 	// {
// 	// 	id: 1,
// 	// 	title: 'Подготовка к обновлению курсов',
// 	// 	date: new Date(),
// 	// 	text: 'Горные походы открывают удивительные природные ландшафты'
// 	// },
// 	// {
// 	// 	id: 2,
// 	// 	title: 'Поход в горы',
// 	// 	date: new Date(),
// 	// 	text: 'Думал, что очень много времени'
// 	// }
// ];


function App() {
	const [items, setItems] = useState([]);

	useEffect(()=> {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			console.log(data);
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(()=> {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = (item) => {

		setItems(oldItems => [...oldItems, {
			...item,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max( ...oldItems.map(el => el.id)) + 1 : 1
		}]);
	};



	return (
		<div className={'app'}>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList items={items}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
