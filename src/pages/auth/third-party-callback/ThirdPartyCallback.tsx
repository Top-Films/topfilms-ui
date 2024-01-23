import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { POST_AUTH_REDIRECT_PATH } from '../../../shared/constants/constants';
import Loader from '../../../components/loader/Loader';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					navigate('/auth/login?error=thirdParty');
				}
		
				navigate(POST_AUTH_REDIRECT_PATH);
			} catch (_) {
				navigate('/auth/login?error=thirdParty');
			}
		})();
	}, []);

	return (
		<Loader isLoading={true} />
	);
}