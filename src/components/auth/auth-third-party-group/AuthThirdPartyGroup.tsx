import { faDiscord, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Group } from '@mantine/core';
import React from 'react';
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { Environment } from '../../../common/environment';
import { TopFilmsUtil } from '../../../common/top-films-util';
import classnames from './auth-third-party-group.module.scss';
 
export default function AuthThirdPartyGroup(props: {
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
	/**
	 * Sign in or up with google
	 */
	async function onGoogleClick() {
		onClickThirdParty('google');
	}

	/**
	 * Sign in or up with twitter
	 */
	async function onGithubClick() {
		onClickThirdParty('github');
	}

	/**
	 * Sign in or up with discord
	 */
	async function onDiscordClick() {
		onClickThirdParty('discord');
	}

	/**
	 * Handles third party auth
	 * 
	 * @param thirdPartyId Id relating to the third party provider
	 */
	async function onClickThirdParty(thirdPartyId: string) {
		props.setIsLoading(true);
		try {
			// Go to third party 
			const authUrl = await ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
				thirdPartyId,
				frontendRedirectURI: `${Environment.frontendUrl()}/auth/callback/${thirdPartyId}`
			});
			window.location.assign(authUrl);
		} catch (e: unknown) {
			props.setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			props.setIsLoading(false);
		}
	}

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