import {
	Container,
	Stack
} from '@mantine/core';
import { MovieListCard } from '../card';

export default function MovieList() {
	return (
		<Container>
			<Stack gap={'xs'}>
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
				<MovieListCard />
			</Stack>
		</Container>
		
	);
}