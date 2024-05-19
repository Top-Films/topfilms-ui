import { useSearchParams } from 'react-router-dom';
import { VerifyEmailCheck, VerifyEmailSendEmail, VerifyEmailSuccess } from '../../../components/auth/auth-verify-email';

export default function VerifyEmail() {
	const [searchParams] = useSearchParams();

	if (searchParams.get('success') === 'true') {
		return (
			<>
				<VerifyEmailSuccess />
			</>
		);
	}

	if (searchParams.get('token')) {
		return (
			<>
				<VerifyEmailCheck />
			</>
		);
	}

	return (
		<>
			<VerifyEmailSendEmail />
		</>
	);
}