import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from './auth-form.module.scss';
import {
	Box, 
	Button, 
	Divider, 
	Group, 
	PasswordInput, 
	TextInput 
} from '@mantine/core';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { faGoogle, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { containerBackgroundColor, mainBackgroundColor, mainFontColor } from '../../styles/style-constants';
import { useEffect, useState } from 'react';
import logo from '../../assets/logos/topfilms/png/logo-white-no-background.png';
import { LoadingOverlay } from '@mantine/core';
import { Link } from 'react-router-dom';
import { UserContext } from 'supertokens-auth-react/lib/build/types';
import { RecipeFunctionOptions } from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import type { User } from 'supertokens-web-js/types';

export default function AuthForm(props: {
	type: 'LOGIN' | 'REGISTER',
	headerText: string,
	signInOrUp: (_input: {
		formFields: {
			id: string;
			value: string;
		}[],
		options?: RecipeFunctionOptions;
		userContext?: UserContext;
	}) => Promise<
		| {
			status: 'OK';
			user: User;
			fetchResponse: Response;
		}
		| {
			status: 'FIELD_ERROR';
			formFields: {
				id: string;
				error: string;
			}[];
			fetchResponse: Response;
		}
		| {
			status: 'WRONG_CREDENTIALS_ERROR';
			fetchResponse: Response;
		}
		| {
			status: 'SIGN_IN_NOT_ALLOWED';
			reason: string;
			fetchResponse: Response;
		}
		| {
			status: 'SIGN_UP_NOT_ALLOWED';
			reason: string;
			fetchResponse: Response;
		}
	>,
	navigateSignInUpRoute: string,
	navigateSignInUpText: string
}) {
	// State for error message from API
	const [errorMessage, setErrorMessage] = useState('');
	// State for loading status when making API call
	const [isLoading, setIsLoading] = useState(false);
	// Define form
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			confirmPassword: matchesField(
				'password',
				'Passwords are not the same'
			)
		},
		validateInputOnChange: true
	});

	// Workaround to allow for optional confirm password form value
	if (props.type === 'LOGIN') {
		useEffect(() => {
			form.setFieldValue('confirmPassword', form.getInputProps('password').value);
		}, [form.getInputProps('password').value]);
	}

	/**
	 * Authentication for email password submission
	 */
	const onClickSubmit = async () => {
		setIsLoading(true);
		try {
			// Attempt to sign in or up using email and password from form
			const response = await props.signInOrUp({
				formFields: [{
					id: 'email',
					value: form.getInputProps('email').value
				}, {
					id: 'password',
					value: form.getInputProps('password').value
				}]
			});

			console.log('HERE');
			console.log(`TEST: ${response}`);
	
			// Fields are invalid
			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					// Email is invalid 
					if (formField.id === 'email') {
						setErrorMessage('Email is invalid or already exists');
					// Password is invalid
					} else if (formField.id === 'password') {
						setErrorMessage('Password does not meet strength requirements');
					}
				});
			// Unkown failure signing in
			} else if (response.status === 'SIGN_IN_NOT_ALLOWED') { 
				setErrorMessage('Sign in failed. Please try again later');
			// Unkown failure registering
			} else if (response.status === 'SIGN_UP_NOT_ALLOWED') { 
				setErrorMessage('Registration failed. Please try again later');
			// Unkown failure registering
			} else if (response.status === 'WRONG_CREDENTIALS_ERROR') { 
				setErrorMessage('The provided credentials are invalid');
			// Successful login
			} else if (response.status === 'OK') {
				// window.location.assign('/home');
			// Unexpected error
			} else {
				setErrorMessage('Unexpected error occurred. Please try again later');
			}

			setIsLoading(false);
		// Exception handling
		} catch (e: unknown) {
			console.log(e);
			console.log('here');
			if (e instanceof STGeneralError) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage('Oops! Something went wrong.');
			}

			setIsLoading(false);
		}
	};
	
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
		setIsLoading(true);
		try {
			// Go to third party 
			const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
				thirdPartyId,
				frontendRedirectURI: `http://localhost:3000/auth/callback/${thirdPartyId}`
			});
			window.location.assign(authUrl);
			setIsLoading(false);
		} catch (e: unknown) {
			console.log(e);
			if (e instanceof STGeneralError) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage('Oops! Something went wrong.');
			}

			setIsLoading(false);
		}
	};

	return (
		<div className={classnames.container}>

			{/* Top films logo outside of auth area */}
			<div className={classnames.headerContainer}>
				<img className={classnames.logo} src={logo}></img>
			</div>
			
			{/* Box surrounding the inputs, submit, and oauth areas */}
			<Box 
				style={theme => ({
					backgroundColor: containerBackgroundColor,
					color: mainFontColor,
					padding: theme.spacing.xl,
					borderRadius: theme.radius.md
				})}
			>
				<h1 className={classnames.header}>{props.headerText}</h1>

				{/* Form for email password auth */}
				<form>
					<TextInput
						label='Email'
						className={classnames.input}
						styles={{
							input: { 
								backgroundColor: mainBackgroundColor,
								borderColor: mainBackgroundColor,
								color: mainFontColor,
								marginBottom: '10px'
							},
							label: {
								marginBottom: '10px'
							},
							error: {
								marginTop: '5px',
								marginBottom: '15px'
							}
						}}
						withAsterisk
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						label='Password'
						className={classnames.input}
						styles={{
							input: { 
								backgroundColor: mainBackgroundColor,
								borderColor: mainBackgroundColor,
								color: mainFontColor,
								marginBottom: '10px'
							},
							label: {
								marginBottom: '10px'
							}
						}}
						withAsterisk
						{...form.getInputProps('password')}
					/>

					{/* Only display confirm password if the register page is active */}
					{props.type === 'REGISTER'
						? <PasswordInput
							label='Confirm Password'
							className={classnames.input}
							styles={{
								input: { 
									backgroundColor: mainBackgroundColor,
									borderColor: mainBackgroundColor,
									color: mainFontColor,
									marginBottom: '10px'
								},
								label: {
									marginBottom: '10px'
								}
							}}
							withAsterisk
							{...form.getInputProps('confirmPassword')}
						/>
						: <></>
					}

					{/* Submit email password auth */}
					<Group justify='center' mt='md'>
						<Button 
							type='submit' 
							onClick={onClickSubmit} 
							disabled={!form.isValid()}
							className={classnames.button}
						>Submit</Button>
					</Group>
				</form>	

				{/* Divide email password from third party auth */}
				<Divider mt='md' label='Or' labelPosition='center' />

				{/* Icons for third party OAuth sign in */}
				<Group justify='center' mt='md' gap='xl'>
					<FontAwesomeIcon className={classnames.faIcon} icon={ faGoogle } size='xl' onClick={onGoogleClick} />
					<FontAwesomeIcon className={classnames.faIcon} icon={ faGithub } size='xl' onClick={onGitHubClick} />
					<FontAwesomeIcon className={classnames.faIcon} icon={ faDiscord } size='xl' onClick={onDiscordClick} />
				</Group>
			</Box>

			{/* Link to either register or login depending on which is currently active */}
			<div className={classnames.linkContainer}>
				<Link to={props.navigateSignInUpRoute}>{props.navigateSignInUpText}</Link>
			</div>

			{/* Error message from API call */}
			<p className={classnames.error}>{errorMessage ? errorMessage : ''}</p>

			{/* Display spinner overlay while waiting for API response */}
			<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ backgroundOpacity: 0.10, blur: 1 }} loaderProps={{ type: 'bars', color: '#000' }} />
		</div>
	);
}
