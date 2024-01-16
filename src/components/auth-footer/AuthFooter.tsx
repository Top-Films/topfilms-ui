import classnames from './auth-footer.module.scss';
import { LoadingOverlay } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
 
export default function AuthFooter(props: {
	errorMessage: string,
	isLoading: boolean,
	loginOrRegisterText: string
	setIsLogin: Dispatch<SetStateAction<boolean>>,
	isLogin: boolean
}) {
	/**
	 * Changes state from login page to register page or vice versa
	 */
	const invertIsLogin = () => {
		props.setIsLogin(!props.isLogin);
	};

	return (
		<>
			{/* Link to either register or login depending on which is currently active */}
			<div className={classnames.linkContainer}>
				<span className={classnames.navText} onClick={invertIsLogin}>{props.loginOrRegisterText}</span>
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