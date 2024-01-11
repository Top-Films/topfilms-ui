import ThirdPartyEmailPassword, {
	Google,
	Discord,
	Github
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';

/**
 * Gets api url from env variables or defaults to http://localhost:3001
 * 
 * @returns api url
 */
export function getApiDomain() {
	const apiPort = import.meta.env.REACT_APP_API_PORT ?? 3001;
	const apiUrl = import.meta.env.REACT_APP_API_URL ?? `http://localhost:${apiPort}`;
	return apiUrl;
}

/**
 * Gets ui url from env variables or defaults to http://localhost:3000
 * 
 * @returns api url
 */
export function getWebsiteDomain() {
	const websitePort = import.meta.env.REACT_APP_WEBSITE_PORT ?? 3000;
	const websiteUrl = import.meta.env.REACT_APP_WEBSITE_URL ?? `http://localhost:${websitePort}`;
	return websiteUrl;
}

/**
 * Creates configuration for super tokens auth
 */
export const superTokensConfig = {
	appInfo: {
		appName: 'Top Films',
		apiDomain: getApiDomain(),
		websiteDomain: getWebsiteDomain()
	},
	recipeList: [
		ThirdPartyEmailPassword.init({
			signInAndUpFeature: {
				providers: [Google.init(), Github.init(), Discord.init()]
			}
		}),
		Session.init(
			import.meta.env.NODE_ENV === 'production' 
				? { sessionTokenBackendDomain: '.example.com' }
				: {}
		)
	]
};
