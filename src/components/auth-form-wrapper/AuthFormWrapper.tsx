import classnames from './auth-form-wrapper.module.scss';
import {
	Box, LoadingOverlay
} from '@mantine/core';
import { containerBackgroundColor, mainFontColor } from '../../styles/style-constants';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import AuthFooter from '../auth-footer/AuthFooter';
import AuthThirdPartyGroup from '../auth-third-party-group/AuthThirdPartyGroup';
 
export default function AuthFormWrapper(props: {
	children: ReactNode
	formHeader: string
	setIsLoading: Dispatch<SetStateAction<boolean>>
	isLoading: boolean
	setErrorMessage: Dispatch<SetStateAction<string>>
	errorMessage: string
	loginOrRegisterText: string
	loginOrRegisterPath: string
	enableThirdParty: boolean
}) {
	return (
		<div className={classnames.container}>

			{/* Top films logo outside of auth area */}
			<div className={classnames.headerContainer}>
				<img 
					className={classnames.logo} 
					src='https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-logo-white-transparent.png'
					alt='Top Films Logo'
				/>
			</div>
			
			{/* Box surrounding the inputs, submit, and oauth areas */}
			<Box 
				style={theme => ({
					backgroundColor: containerBackgroundColor,
					color: mainFontColor,
					padding: theme.spacing.xl,
					borderRadius: theme.radius.md
				})}
			>
				<h1 className={classnames.formHeader}>{props.formHeader}</h1>

				{props.children}

				{props.enableThirdParty
					? <AuthThirdPartyGroup setIsLoading={props.setIsLoading} setErrorMessage={props.setErrorMessage} />
					: <></>
				}
			</Box>
			
			<AuthFooter errorMessage={props.errorMessage} loginOrRegisterText={props.loginOrRegisterText} loginOrRegisterPath={props.loginOrRegisterPath} />

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
				} 
			/>
		</div>
	);
}