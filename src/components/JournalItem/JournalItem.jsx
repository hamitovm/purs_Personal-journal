import './JournalItem.css';

function JournalItem({title, date, post}) {
	const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<div className="journal-item">
			<h2 className="journal-item__header">{title}</h2>
			<div className="journal-item__body">
				<div className="journal-item__date">{formattedDate}</div>
				<div className="journal-item__post">{post}</div>
			</div>
		</div>
	);
}

export default JournalItem;