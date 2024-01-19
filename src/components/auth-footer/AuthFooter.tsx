import { Group } from '@mantine/core';
import { FOOTER_LINKS } from '../../shared/constants/constants';
import classnames from './auth-footer.module.scss';
import { useNavigate } from 'react-router-dom';
 
export default function AuthFooter(props: {
	errorMessage: string
	loginOrRegisterText: string
	loginOrRegisterPath: string
}) {
	const navigate = useNavigate();

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

			<Group justify='center' mt={'2em'}>{items}</Group>
		</>
	);
}