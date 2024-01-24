import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Loader from '../../../components/loader/Loader';
import { getUserMetadata } from '../../../services/auth/auth-service';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					navigate('/auth/login?error=thirdParty');
				}

				const metadata = await getUserMetadata();
				if (!metadata.data.first_name || !metadata.data.last_name) {
					navigate('/auth/user-information');
				}

				navigate('/home');
			} catch (_) {
				navigate('/auth/login?error=thirdParty');
			}
		})();
	}, []);

	return (
		<Loader isLoading={true} />
	);
}