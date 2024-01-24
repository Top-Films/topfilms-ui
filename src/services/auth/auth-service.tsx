import axios from 'axios';
import { Environment } from '../../shared/util/Environment';

// Gets first and last name from user metadata
export async function getUserMetadata() {
	return axios.get(`${Environment.authUrl()}/user`);
}

// Add first and last name to user metadata
export async function postUserMetadata(firstName: string, lastName: string) {
	await axios.post(`${Environment.authUrl()}/user`, {
		// eslint-disable-next-line camelcase
		first_name: firstName,
		// eslint-disable-next-line camelcase
		last_name: lastName
	});
}