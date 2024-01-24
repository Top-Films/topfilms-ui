import AuthFormWrapper from '../../auth-form-wrapper/AuthFormWrapper';

export default function ResetPasswordSent() {
	// Notify user that password reset email has been sent
	return (
		<AuthFormWrapper
			formHeader='Email Sent'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText='Remember your password?'
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<p>Your password reset link has been sent if it exists in our system.</p>
		</AuthFormWrapper>
	);
}