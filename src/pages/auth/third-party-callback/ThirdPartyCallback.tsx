import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Loader from '../../../components/loader/Loader';
import { GET_USER_METADATA } from '../../../gql/auth';
import { UserById } from '../../../types/auth/User';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	const [getUserMetadata] = useLazyQuery<UserById>(GET_USER_METADATA);
	
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status === 'OK') {
					console.log(response.user.id);
					getUserMetadata({ variables: { id: response.user.id } })
						.then(res => {
							console.log(res);
							if (!res.data?.userById?.username || !res.data?.userById?.username || !res.data?.userById?.username) {
								navigate('/auth/user-information');
							} else {
								navigate('/home');
							}
						})
						.catch(() => {
							navigate('/auth/login?error=thirdParty');
						});
				}
			} catch (_) {
				navigate('/auth/login?error=thirdParty');
			}
		})();
	}, []);

	return (
		<Loader isLoading={true} />
	);
}