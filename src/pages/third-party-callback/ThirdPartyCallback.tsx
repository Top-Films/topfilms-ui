import { LoadingOverlay } from '@mantine/core';
import { useEffect } from 'react';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';

export default function ThirdPartyCallback() {
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					window.location.assign('/auth?error=signin');
				}
		
				window.location.assign('/home');
			} catch (_) {
				window.location.assign('/auth/login?error=signin');
			}
		})();
	}, []);

	return (
		<>
			<LoadingOverlay visible={true} zIndex={1000} overlayProps={{ backgroundOpacity: 0.10, blur: 1 }} loaderProps={{ type: 'bars', color: '#000' }} />
		</>
	);
}