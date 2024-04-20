import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Loader from '../../../components/loader/Loader';
import { DUPLICATE_EMAIL_ERROR_MESSAGE } from '../../../constants/constants';
import { GET_USER_METADATA } from '../../../gql/auth';
import { UserById } from '../../../types/auth/User';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	const [getUserMetadata] = useLazyQuery<UserById>(GET_USER_METADATA, {
		fetchPolicy: 'no-cache' 
	});
	
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					navigate('/auth/login?error=thirdParty');
					return;
				}

				getUserMetadata({ variables: { id: response.user.id } })
					.then(res => {
						if (res.error) {
							navigate('/auth/login?error=metadata');
							return;
						}

						if (!res.data?.userById?.username || !res.data?.userById?.username || !res.data?.userById?.username) {
							navigate('/auth/user-information');
						} else {
							navigate('/home');
						}
					});
			} catch (e: unknown) {
				if (e instanceof Error && STGeneralError.isThisError(e) && e.message.startsWith(DUPLICATE_EMAIL_ERROR_MESSAGE)) {
					navigate('/auth/login?error=duplicateEmail');
				} else {
					navigate('/auth/login?error=thirdParty');
				}
			}
		})();
	}, []);

	return (
		<Loader isLoading={true} />
	);
}