import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Loader from '../../../components/loader/Loader';
import { checkPresentUserMetadataRedirect, getUserMetadata } from '../../../services/auth/auth-service';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					console.log(response.status);
					navigate('/auth/login?error=thirdParty');
				}

				console.log('Before getting metadata');
				const metadata = await getUserMetadata();
				console.log('Before check present');
				checkPresentUserMetadataRedirect(metadata.data);

				console.log('Before navigate');
				navigate('/home');
			} catch (_) {
				console.log('In catch');
				navigate('/auth/login?error=thirdParty');
			}
		})();
	}, []);

	return (
		<Loader isLoading={true} />
	);
}