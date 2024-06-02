import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { User } from 'supertokens-web-js/types';
import { DUPLICATE_EMAIL_ERROR_MESSAGE } from '../../../common/constants';
import { TopFilmsError } from '../../../common/top-films-error';
import { TopFilmsUtil } from '../../../common/top-films-util';
import Loader from '../../../components/loader/Loader';
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
				const user = await thirdPartyCallback();
				getUserMetadata({ variables: { id: user.id } })
					.then(async res => {
						navigate(await TopFilmsUtil.navigatePostSignInUp(res));
					});
			} catch (e: unknown) {
				handleNavigateError(e);
			}
		})();
	}, []);

	async function thirdPartyCallback(): Promise<User> {
		const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();

		if (response.status === 'OK') {
			return response.user;
		}

		throw new TopFilmsError();
	}

	function handleNavigateError(e: unknown) {
		if (e instanceof Error && STGeneralError.isThisError(e) && e.message.startsWith(DUPLICATE_EMAIL_ERROR_MESSAGE)) {
			navigate('/auth/login?error=duplicateEmail');
		} else {
			navigate('/auth/login?error=thirdParty');
		}
	}

	return (
		<Loader isLoading={true} />
	);
}