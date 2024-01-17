import { Group } from '@mantine/core';
import classnames from './header.module.scss';
import logo from '/topfilms/png/logo-white-no-background.png';
import { useState } from 'react';

const links = [
	{ link: '/about', label: 'Features' },
	{ link: '/pricing', label: 'Pricing' },
	{ link: '/learn', label: 'Learn' },
	{ link: '/community', label: 'Community' }
];

export default function HeaderSearch() {
	const [active, setActive] = useState(links[0].link);

	const items = links.map(link => (
		<a
			key={link.label}
			href={link.link}
			className={classnames.link}
			data-active={active === link.link || undefined}
			onClick={event => {
				event.preventDefault();
				setActive(link.link);
			}}
		>
			{link.label}
		</a>
	));

	return (
		<header className={classnames.header}>
			<div className={classnames.inner}>
				<Group>
					<img className={classnames.logo} src={logo}></img>
				</Group>
				<Group>
					<Group ml={50} gap={5} className={classnames.links} visibleFrom='sm'>
						{items}
					</Group>
				</Group>
			</div>
		</header>
	);
}