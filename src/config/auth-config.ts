import Session from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword, { Discord, Google, Twitter } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { APP_NAME } from '../constants/constants';
import { Environment } from '../util/Environment';

// Add any other urls here to be intercepted
const resourceServerUrls = [
	Environment.apiUrl()
];

// Auth configuration for Super Tokens
export const authConfig = {
	appInfo: {
		appName: APP_NAME,
		apiDomain: Environment.authUrl(),
		websiteDomain: Environment.frontendUrl()
	},
	recipeList: [
		ThirdPartyEmailPassword.init({
			signInAndUpFeature: {
				providers: [
					Google.init(),
					Twitter.init(),
					Discord.init()
				]
			}
		}),
		Session.init({
			override: {
				// Add interceptor for resource server(s)
				functions(oI) {
					return {
						...oI,
						shouldDoInterceptionBasedOnUrl(url, apiDomain, sessionTokenBackendDomain) {
							try {
								resourceServerUrls.forEach(resourceServerUrl => {
									if (url.startsWith(resourceServerUrl)) {
										console.log('HERE');
										return true;
									}
								});
							} catch (e: unknown) {
								console.log(e);
							}

							return oI.shouldDoInterceptionBasedOnUrl(url, apiDomain, sessionTokenBackendDomain);
						}
					};
				}
			}
		})
	]
};