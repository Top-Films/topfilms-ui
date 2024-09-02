import { Environment } from '../common/environment';

export const oidcConfig = {
	onSignIn() {},
	authority: 'https://auth.topfilms.io/realms/top-films',
	clientId: 'top-films',
	redirectUri: Environment.frontendUrl()
};