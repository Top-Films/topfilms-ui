import classnames from './auth-footer.module.scss';
import { useNavigate } from 'react-router-dom';
 
export default function AuthFooter(props: {
	errorMessage: string
	loginOrRegisterText: string
	loginOrRegisterPath: string
}) {
	const navigate = useNavigate();

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
		</>
	);
}