import {
	Card,
	Rating,
	Text
} from '@mantine/core';
import classnames from './movie-list-card.module.scss';

export default function MovieListCard() {
	return (
		<Card shadow='sm' padding='lg' radius='md' className={classnames.card} withBorder>
			<Text size='sm' c='dimmed' p={'xs'} className={classnames.user}>
				u/maxmorhardt
			</Text>

			<Text p={'xs'}>Best List</Text>

			<Text size='sm' p={'xs'}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
			</Text>
			
			<Rating value={3.5} fractions={2} p={'xs'} readOnly />
		</Card>
	);
}