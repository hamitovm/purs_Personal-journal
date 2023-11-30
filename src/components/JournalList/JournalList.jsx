import './JournalList.css';
import CardButton from '../CardButton/CardButton.jsx';
import JournalItem from '../JournalItem/JournalItem.jsx';
import {useContext, useMemo} from 'react';
import {UserContext} from '../../context/user.context.jsx';

const JournalList = ({ items, selectActivePost }) => {
	const { userId } = useContext(UserContext);

	const onClickHandler = (post) => {
		selectActivePost(post);
	};

	const sortItems = (a,b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	const filteredItems = useMemo(() => items
		.sort(sortItems)
		.filter(el => el.userId === userId), [items, userId]);

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}


	return (
		<div className={'journal-list'}>
			{filteredItems
				.map(el => (
					<CardButton
						key={el.id}
						onClick={() => onClickHandler(el)}>
						<JournalItem
							title={el.title}
							date={el.date}
							post={el.post}
							id={el.id}
						/>
					</CardButton>
				))}
		</div>
	);
};

export default JournalList;