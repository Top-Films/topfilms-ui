import { Outlet } from 'react-router-dom';

export default function Root() {
	return (
		<>
			<header>

			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}