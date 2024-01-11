import { useEffect } from 'react';
import { thirdPartySignInAndUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';

export default function GoogleCallback() {
	useEffect(() => {
		handleGoogleCallback();
	}, []);

	async function handleGoogleCallback() {
		try {
			const response = await thirdPartySignInAndUp();
			
			if (response.status === 'OK') {
				console.log(response.user);
				if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
					window.location.assign('/home');
					console.log('Sign up successful');
				} else {
					window.location.assign('/home');
					console.log('Sign in successful');
				}

				window.location.assign('/home');
			} else if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
				console.log('Error Sign in or up not allowed');
				window.location.assign('/auth'); // Redirect back to login page
			} else {
				console.log('No email provided by social login. Please use another form of login');
				window.location.assign('/auth'); // Redirect back to login page
			}
		} catch (e: unknown) {
			console.log(e);
			if (e instanceof STGeneralError) {
				console.log(e.message);
			} else {
				console.log('Oops! Something went wrong.');
			}
		}
	}

	return (
		<></>
	);
}
