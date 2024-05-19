import { Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FOOTER_LINKS } from '../../../common/constants';
import { AUTH_ELEMENT_SPACING } from '../../../styles/variables';
import classnames from './auth-footer.module.scss';

/**
 * Specialized footer for the /auth path
 */
export default function AuthFooter(props: {
	errorMessage: string // Message to display for auth error
	loginOrRegisterText: string // Message to visit auth or register page
	loginOrRegisterPath: string // Path to register or login -- should point to the one that is not currently displayed
}) {
	const navigate = useNavigate();

	// Map footer links to jsx elements
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
		<>
			{/* Error message from API call */}
			<p className={classnames.error}>{props.errorMessage}</p>

			{/* Link to either register or login depending on which is currently active */}
			<div className={classnames.linkContainer}>
				<span 
					className={classnames.navRegisterOrLogin} 
					onClick={() => navigate(props.loginOrRegisterPath)}
				>
					{props.loginOrRegisterText}
				</span>
			</div>

			{/* Footer links */}
			<Group justify='center' mt={AUTH_ELEMENT_SPACING}>{links}</Group>
		</>
	);
}