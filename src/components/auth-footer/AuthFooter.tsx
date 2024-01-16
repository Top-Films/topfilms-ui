import classnames from './auth-footer.module.scss';
import { LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
 
export default function AuthFooter(props: {
	errorMessage: string
	isLoading: boolean
	loginOrRegisterText: string
	loginOrRegisterPath: string
}) {
	const navigate = useNavigate();

	return (
		<>
			{/* Link to either register or login depending on which is currently active */}
			<div className={classnames.linkContainer}>
				<span 
					className={classnames.navRegisterOrLogin} 
					onClick={() => navigate(props.loginOrRegisterPath)}
				>
					{props.loginOrRegisterText}
				</span>
			</div>

			{/* Error message from API call */}
			<p className={classnames.error}>{props.errorMessage}</p>

			{/* Display spinner overlay while waiting for API response */}
			<LoadingOverlay 
				visible={props.isLoading} 
				zIndex={1000} 
				overlayProps={
					{ 
						backgroundOpacity: 0.10, 
						blur: 1 
					}
				} 
				loaderProps={
					{ 
						type: 'bars', 
						color: '#000' 
					}
				} />
		</>
	);
}