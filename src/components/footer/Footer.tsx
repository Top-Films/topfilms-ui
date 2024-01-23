import { Group } from '@mantine/core';
import classnames from './footer.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { FOOTER_LINKS } from '../../shared/constants/constants';

export function Footer() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// Don't show header for auth screen
	if (pathname.startsWith('/auth')) {
		return (
			<></>
		);
	}

	const items = FOOTER_LINKS.map(link => (
		<span 
			key={link.label} 
			className={classnames.link} 
			onClick={e => {
				e.preventDefault();
				navigate(link.link);
			}}
		>
			{link.label}
		</span>
	));

	return (
		<div className={classnames.footer}>
			<img 
				className={classnames.logo} 
				src='https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-logo-gray-transparent.png'
				alt='Top Films Logo'
			/>
			<h3 className={classnames.copy}>© 2024 Top Films. All rights reserved</h3>
			<Group className={classnames.links} >{items}</Group>
		</div>
	);
}