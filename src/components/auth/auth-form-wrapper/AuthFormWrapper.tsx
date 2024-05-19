import { Box } from '@mantine/core';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFooter } from '..';
import { TOP_FILMS_LOGO_FULL } from '../../../common/constants';
import { LIGHT_BACKGROUND_COLOR, MAIN_FONT_COLOR } from '../../../styles/variables';
import Loader from '../../loader/Loader';
import AuthThirdPartyGroup from '../auth-third-party-group/AuthThirdPartyGroup';
import classnames from './auth-form-wrapper.module.scss';
 
export default function AuthFormWrapper(props: {
	children: ReactNode // Form as children element
	formHeader: string // Header within the form box
	loginOrRegisterText: string // Message to nave to login or register
	loginOrRegisterPath: string // Path to login or register -- whichever is not displayed
	enableThirdParty: boolean // Enable/disable third party -- only needed for reset password so we can reuse this component
	setIsLoading?: Dispatch<SetStateAction<boolean>> // Set is loading state if child makes API call
	isLoading: boolean // Current state of is loading
	setErrorMessage?: Dispatch<SetStateAction<string>> // Set error message state if child makes API call
	errorMessage: string // Current error message
}) {
	const navigate = useNavigate();

	return (
		<div className={classnames.container}>

			{/* Top films logo outside of auth area */}
			<div className={classnames.headerContainer}>
				<img 
					className={classnames.logo} 
					src={TOP_FILMS_LOGO_FULL}
					alt='Top Films Logo'
					onClick={() => navigate('/home')}
				/>
			</div>
			
			{/* Box surrounding the inputs, submit, and third party oauth icons */}
			<Box 
				style={theme => ({
					backgroundColor: LIGHT_BACKGROUND_COLOR,
					color: MAIN_FONT_COLOR,
					padding: theme.spacing.xl,
					borderRadius: theme.radius.md
				})}
			>
				<h2 className={classnames.formHeader}>{props.formHeader}</h2>

				{/* Form goes here */}
				{props.children}
				
				{/* Only show third party for login/register */}
				{props.setIsLoading && props.setErrorMessage && props.enableThirdParty
					? <AuthThirdPartyGroup setIsLoading={props.setIsLoading} setErrorMessage={props.setErrorMessage} />
					: <></>
				}
			</Box>
			
			{/* Footer for auth */}
			<AuthFooter errorMessage={props.errorMessage} loginOrRegisterText={props.loginOrRegisterText} loginOrRegisterPath={props.loginOrRegisterPath} />

			{/* Display spinner overlay while waiting for API response */}
			<Loader isLoading={props.isLoading} />
		</div>
	);
}