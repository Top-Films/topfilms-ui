import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from './auth-third-party-group.module.scss';
import {
	Divider, 
	Group
} from '@mantine/core';
import { faGoogle, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
 
export default function AuthThirdPartyGroup(props: {
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
	/**
	 * Sign in or up with google
	 */
	const onGoogleClick = async () => {
		onClickThirdParty('google');
	};

	/**
	 * Sign in or up with github
	 */
	const onGitHubClick = async () => {
		onClickThirdParty('github');
	};

	/**
	 * Sign in or up with discord
	 */
	const onDiscordClick = async () => {
		onClickThirdParty('discord');
	};

	/**
	 * Handles third party auth
	 * 
	 * @param thirdPartyId Id relating to the third party provider
	 */
	const onClickThirdParty = async (thirdPartyId: string) => {
		props.setIsLoading(true);
		try {
			// Go to third party 
			const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
				thirdPartyId,
				frontendRedirectURI: `http://localhost:3000/auth/callback/${thirdPartyId}`
			});
			window.location.assign(authUrl);
			props.setIsLoading(false);
		} catch (e: unknown) {
			if (e instanceof STGeneralError) {
				props.setErrorMessage(e.message);
			} else {
				props.setErrorMessage('Oops! Something went wrong.');
			}

			props.setIsLoading(false);
		}
	};

	return (
		<>
			{/* Divide email password from third party auth */}
			<Divider mt='md' label='Or' labelPosition='center' />

			{/* Icons for third party OAuth sign in */}
			<Group justify='center' mt='md' gap='xl'>
				<FontAwesomeIcon className={classnames.faIcon} icon={faGoogle} size='xl' onClick={onGoogleClick} />
				<FontAwesomeIcon className={classnames.faIcon} icon={faGithub} size='xl' onClick={onGitHubClick} />
				<FontAwesomeIcon className={classnames.faIcon} icon={faDiscord} size='xl' onClick={onDiscordClick} />
			</Group>
		</>
	);
}