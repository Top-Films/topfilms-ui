import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT } from '../../../../constants/constants';
import AuthFormWrapper from '../../auth-form-wrapper/AuthFormWrapper';
import classnames from '../auth-reset-password.module.scss';

export default function ResetPasswordSent() {
	// Notify user that password reset email has been sent
	return (
		<AuthFormWrapper
			formHeader='Email Sent'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<div className={classnames.faIconContainer}>
				<FontAwesomeIcon icon={faEnvelopeOpenText} size={'4x'}></FontAwesomeIcon>
			</div>
			
			<p>An email with instructions to reset your password has been sent. </p>
			<br />
			<p>If you don&apos;t receive the email within a few minutes, check your spam folder.</p>
		</AuthFormWrapper>
	);
}