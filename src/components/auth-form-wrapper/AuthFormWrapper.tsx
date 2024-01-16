import classnames from './auth-form-wrapper.module.scss';
import {
	Box
} from '@mantine/core';
import { containerBackgroundColor, mainFontColor } from '../../styles/style-constants';
import logo from '/topfilms/png/logo-white-no-background.png';
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
				<img className={classnames.logo} src={logo}></img>
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
			
			<AuthFooter errorMessage={props.errorMessage} isLoading={props.isLoading} loginOrRegisterText={props.loginOrRegisterText} loginOrRegisterPath={props.loginOrRegisterPath} />
		</div>
	);
}