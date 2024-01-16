import { LoadingOverlay } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';

export default function ThirdPartyCallback() {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const response = await ThirdPartyEmailPassword.thirdPartySignInAndUp();
				if (response.status !== 'OK') {
					navigate('/auth?error=thirdParty');
				}
		
				navigate('/home');
			} catch (_) {
				navigate('/auth?error=thirdParty');
			}
		})();
	}, []);

	return (
		<LoadingOverlay 
			visible={true} 
			zIndex={1000}
			overlayProps={{ backgroundOpacity: 0.10, blur: 1 }} 
			loaderProps={{ type: 'bars', color: '#000' }} 
		/>
	);
}