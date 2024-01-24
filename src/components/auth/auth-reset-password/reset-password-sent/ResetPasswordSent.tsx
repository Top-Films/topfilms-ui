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
			<p><strong>Important:</strong> The password reset link is time-sensitive and will expire. If you encounter any issues, please contact our support team.</p>
		</AuthFormWrapper>
	);
}