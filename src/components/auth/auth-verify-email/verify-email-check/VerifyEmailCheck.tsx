import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from 'supertokens-auth-react/recipe/emailverification';
import Loader from '../../../loader/Loader';

export default function VerifyEmailCheck() {	
	const navigate = useNavigate();

	// Verify email on page load
	useEffect(() => {
		(async () => {
			await verifyEmail()
				.then(() => {
					navigate('/auth/verify-email?success=true');
				})
				.catch(() => {
					navigate('/auth/login?error=verifyEmail');
				});
		})();
	}, []);

	return (
		<Loader isLoading={true}></Loader>
	);
}