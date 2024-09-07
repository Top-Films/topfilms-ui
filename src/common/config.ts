/* eslint-disable camelcase */
import { Environment } from './environment';

export const oidcConfig = {
	authority: 'https://auth.topfilms.io/realms/top-films',
	client_id: 'top-films',
	redirect_uri: Environment.frontendUrl()
};