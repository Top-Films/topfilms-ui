import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { sendVerificationEmail } from 'supertokens-auth-react/recipe/emailverification';
import { AuthFormWrapper } from '../..';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT } from '../../../../common/constants';
import classnames from '../verify-email.module.scss';

export default function VerifyEmailSendEmail() {
	// Send email on page load
	useEffect(() => {
		(async () => {
			await sendVerificationEmail();
		})();
	}, []);

	return (
		<AuthFormWrapper
			formHeader='Please Verify Your Email'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<div className={classnames.faIconContainer}>
				<FontAwesomeIcon icon={faEnvelopeOpenText} size={'4x'}></FontAwesomeIcon>
			</div>
			
			<p>A verification email has been sent to your inbox.</p>
			<br />
			<p>If you don&apos;t receive the email within a few minutes, check your spam folder.</p>
		</AuthFormWrapper>
	);
}