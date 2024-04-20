import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthFormWrapper } from '../../../components/auth';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT } from '../../../constants/constants';

export default function VerifyEmail() {
	return (
		<AuthFormWrapper
			formHeader='Please Verify Your Email'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<div>
				<FontAwesomeIcon icon={faEnvelopeOpenText} size={'4x'}></FontAwesomeIcon>
			</div>
			
			<p>An email with instructions to reset your password has been sent. </p>
			<br />
			<p>If you don&apos;t receive the email within a few minutes, check your spam folder.</p>
		</AuthFormWrapper>
	);
}