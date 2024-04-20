import EmailVerification from 'supertokens-auth-react/recipe/emailverification';
import Session from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword, { Discord, Github, Google } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { APP_NAME } from '../constants/constants';
import { Environment } from '../util/Environment';

// Add any other urls here to be intercepted
const resourceServerUrls = [
	Environment.apiUrl(),
	Environment.authUrl()
];

// Auth configuration for Super Tokens
export const authConfig = {
	appInfo: {
		appName: APP_NAME,
		apiDomain: Environment.authUrl(),
		websiteDomain: Environment.frontendUrl()
	},
	recipeList: [
		EmailVerification.init({}),
		ThirdPartyEmailPassword.init({
			signInAndUpFeature: {
				providers: [
					Google.init(),
					Github.init(),
					Discord.init()
				]
			}
		}),
		Session.init({
			tokenTransferMethod: 'header',
			override: {
				// Add interceptor for resource server(s)
				functions(oI) {
					return {
						...oI,
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						shouldDoInterceptionBasedOnUrl(url, _, __) {
							let doIntercept = false;
							try {  
								resourceServerUrls.forEach(resourceServerUrl => {
									if (url.startsWith(resourceServerUrl)) {
										doIntercept = true;
									}
								});
							} catch (e: unknown) {
								console.log(e);
							}

							return doIntercept;
						}
					};
				}
			}
		})
	]
};