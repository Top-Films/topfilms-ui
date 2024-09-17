import { Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './footer.module.css';

export default function Footer() {
	const navigate = useNavigate();

	const linkData = [
		{ link: '/contact', label: 'Contact' },
		{ link: '/privacy', label: 'Privacy' },
		{ link: '/terms', label: 'Terms' }
	];

	// Map footer links to elements
	const links = linkData.map(link => (
		<span 
			key={link.label} 
			className={classes.link} 
			onClick={e => {
				e.preventDefault();
				navigate(link.link);
			}}
		>
			{link.label}
		</span>
	));

	return (
		<div className={classes.footer}>
			<img 
				className={classes.logo} 
				src={'https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-white-textless.png'}
				alt='Top Films Logo'
			/>
			<h3 className={classes.copy}>© 2024 Top Films. All rights reserved</h3>
			<Group className={classes.links} >{links}</Group>
		</div>
	);
}