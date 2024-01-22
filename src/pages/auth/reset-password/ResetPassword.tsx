import { useSearchParams } from 'react-router-dom';
import { ResetPasswordEmail, ResetPasswordNewPassword, ResetPasswordSent, ResetPasswordSuccess } from '../../../components/auth-reset-password';

export default function ResetPassword() {
	const [searchParams] = useSearchParams();

	if (searchParams.get('success') === 'true') {
		return (
			<>
				<ResetPasswordSuccess />
			</>
		);
	}

	if (searchParams.get('token')) {
		return (
			<>
				<ResetPasswordNewPassword />
			</>
		);
	}

	if (searchParams.get('sent') === 'true') {
		return (
			<>
				<ResetPasswordSent />
			</>
		);
	}

	return (
		<>
			<ResetPasswordEmail />
		</>
	);
}