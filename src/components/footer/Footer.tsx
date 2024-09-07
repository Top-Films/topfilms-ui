import { Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FOOTER_LINKS } from '../../common/constants';
import classnames from './footer.module.scss';

export default function Footer() {
	const navigate = useNavigate();

	// Map footer links to elements
	const links = FOOTER_LINKS.map(link => (
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
				src={'https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-white-textless.png'}
				alt='Top Films Logo'
			/>
			<h3 className={classnames.copy}>© 2024 Top Films. All rights reserved</h3>
			<Group className={classnames.links} >{links}</Group>
		</div>
	);
}