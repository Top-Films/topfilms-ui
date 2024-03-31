import axios from 'axios';
import Session from 'supertokens-web-js/recipe/session';
import { UserMetadata } from '../../types/user/UserMetadata';
import { Environment } from '../../util/Environment';

// Gets first and last name from user metadata
export async function getUserMetadata() {
	return axios.get<UserMetadata>(`${Environment.authUrl()}/user`);
}

// Add first and last name to user metadata
export async function postUserMetadata(username: string, firstName: string, lastName: string) {
	await axios.post(`${Environment.authUrl()}/user`, {
		username,
		// eslint-disable-next-line camelcase
		first_name: firstName,
		// eslint-disable-next-line camelcase
		last_name: lastName
	});
}

// Redirects to user information form if metadata does not exist
export function checkPresentUserMetadataRedirect(metadata: UserMetadata) {
	if (checkPresentUserMetadata(metadata)) {
		window.location.href = '/auth/user-information';
	}
}

// Signs user out if metadata does not exist
export function checkPresentUserMetadataSignOut(metadata: UserMetadata): boolean {
	if (checkPresentUserMetadata(metadata)) {
		Session.signOut();
		return false;
	}

	return true;
}

function checkPresentUserMetadata(metadata: UserMetadata): boolean {
	if (!metadata.username || !metadata.first_name || !metadata.last_name) {
		return false;
	}

	return true;
}