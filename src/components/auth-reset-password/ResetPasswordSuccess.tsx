import AuthFormWrapper from '../auth-form-wrapper/AuthFormWrapper';
import classnames from './auth-reset-password.module.scss';

export default function ResetPasswordSuccess() {	
	return (
		<AuthFormWrapper
			formHeader='Success'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText='Sign In'
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<p className={classnames.textCenter}>Your new password has been set!</p>
		</AuthFormWrapper>
	);
}