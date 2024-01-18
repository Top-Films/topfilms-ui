import { Button, Group } from '@mantine/core';
import classnames from './header.module.scss';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
	{ link: '/about', label: 'About' },
	{ link: '/home', label: 'Home' },
	{ link: '/learn', label: 'Learn' },
	{ link: '/community', label: 'Community' }
];

export default function Header() {
	// Don't show header for auth screen
	const { pathname } = useLocation();
	if (pathname.startsWith('/auth')) {
		return;
	}

	const [active, setActive] = useState(links[0].link);
	const navigate = useNavigate();

	const items = links.map(link => (
		<span
			key={link.label}
			className={classnames.link}
			data-active={active === link.link || undefined}
			onClick={e => {
				e.preventDefault();
				setActive(link.link);
				navigate(link.link);
			}}
		>
			{link.label}
		</span>
	));

	return (
		<div className={classnames.header}>
			<div className={classnames.inner}>
				<Group>
					<img 
						className={classnames.logo} 
						src='https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-logo-white-transparent.png'
						alt='Top Films Logo'
					/>
				</Group>
				<Group>
					<Group ml={50} gap={5} className={classnames.links} visibleFrom='sm'>
						{items}
					</Group>
					<Button 
						variant='outline'
						onClick={() => navigate('/auth/login')}
					>
						Sign In
					</Button>
					<Button onClick={() => navigate('/auth/register')}>
						Register
					</Button>
				</Group>
			</div>
		</div>
	);
}