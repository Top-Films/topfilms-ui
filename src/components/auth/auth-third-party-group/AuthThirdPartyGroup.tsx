import { faDiscord, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Group } from '@mantine/core';
import React from 'react';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { UNKNOWN_ERROR_MESSAGE } from '../../../constants/constants';
import { Environment } from '../../../util/Environment';
import classnames from './auth-third-party-group.module.scss';
 
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
	 * Sign in or up with twitter
	 */
	const onGithubClick = async () => {
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
				frontendRedirectURI: `${Environment.frontendUrl()}/auth/callback/${thirdPartyId}`
			});
			window.location.assign(authUrl);
			props.setIsLoading(false);
		} catch (e: unknown) {
			if (e instanceof Error && STGeneralError.isThisError(e)) {
				props.setErrorMessage(e.message); 
			} else {
				props.setErrorMessage(UNKNOWN_ERROR_MESSAGE);
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
				<FontAwesomeIcon className={classnames.faIcon} icon={faGithub} size='xl' onClick={onGithubClick} />
				<FontAwesomeIcon className={classnames.faIcon} icon={faDiscord} size='xl' onClick={onDiscordClick} />
			</Group>
		</>
	);
}