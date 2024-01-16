import classnames from './auth-form-wrapper.module.scss';
import {
	Box
} from '@mantine/core';
import { containerBackgroundColor, mainFontColor } from '../../styles/style-constants';
import logo from '/topfilms/png/logo-white-no-background.png';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import ThirdPartyGroup from '../third-party-group/ThirdPartyGroup';
import AuthFooter from '../auth-footer/AuthFooter';
 
export default function AuthFormWrapper(props: {
	children: ReactNode,
	formHeader: string,
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	isLoading: boolean
	setErrorMessage: Dispatch<SetStateAction<string>>,
	errorMessage: string
	setIsLogin: Dispatch<SetStateAction<boolean>>,
	isLogin: boolean,
	loginOrRegisterText: string
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

				<ThirdPartyGroup setIsLoading={props.setIsLoading} setErrorMessage={props.setErrorMessage} />
			</Box>
			
			<AuthFooter errorMessage={props.errorMessage} isLoading={props.isLoading} setIsLogin={props.setIsLogin} isLogin={props.isLogin} loginOrRegisterText={props.loginOrRegisterText} />
		</div>
	);
}