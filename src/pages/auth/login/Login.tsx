import classnames from './login.module.scss';
import {
	Button, 
	Group, 
	PasswordInput, 
	TextInput 
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { mainBackgroundColor, mainFontColor } from '../../../shared/styles/style-constants';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { FormEvent, useEffect, useState } from 'react';
import AuthFormWrapper from '../../../components/auth-form-wrapper/AuthFormWrapper';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
	// States
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
		
	// Define form
	const form = useForm({
		initialValues: {
			email: '',
			password: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 1 })
		}
	});

	// Get error query param from third party callback to display message to user
	const [searchParams] = useSearchParams();
	useEffect(() => {
		if (searchParams.get('error') === 'thirdParty') {
			setErrorMessage('Unable to authenticate with third party');
		}
	}, []);

	/**
	 * Submits email password auth
	 * 
	 * @param e submit form event
	 */
	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Days of pain because of you
		setIsLoading(true);
		try {
			// Attempt to sign in or up using email and password from form
			const response = await ThirdPartyEmailPassword.emailPasswordSignIn({
				formFields: [{
					id: 'email',
					value: form.getInputProps('email').value
				}, {
					id: 'password',
					value: form.getInputProps('password').value
				}]
			});

			// Fields are invalid
			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					// Email is invalid 
					if (formField.id === 'email') {
						setErrorMessage(formField.error);
					// Password is invalid
					} else if (formField.id === 'password') {
						setErrorMessage(formField.error);
					}
				});
			// Unkown failure signing in
			} else if (response.status === 'SIGN_IN_NOT_ALLOWED') { 
				setErrorMessage('Sign in failed. Please try again later');
			// Invalid credentials
			} else if (response.status === 'WRONG_CREDENTIALS_ERROR') { 
				setErrorMessage('The provided credentials are invalid');
			} else if (response.status === 'OK') {
				window.location.assign('/home');
			// Unexpected error
			} else {
				setErrorMessage('Unexpected error occurred. Please try again later');
			}

			setIsLoading(false);
		// Exception handling
		} catch (e: unknown) {
			if (e instanceof STGeneralError) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage('Oops! Something went wrong.');
			}

			setIsLoading(false);
		}
	};

	return (
		<AuthFormWrapper
			formHeader='Sign In'
			setIsLoading={setIsLoading}
			isLoading={isLoading}
			setErrorMessage={setErrorMessage}
			errorMessage={errorMessage}
			loginOrRegisterText="Don't have an account?"
			loginOrRegisterPath='/auth/register'
			enableThirdParty={true}
		>
			{/* Form for email password auth */}
			<form onSubmit={e => onClickSubmit(e)}>
				<TextInput
					label='Email'
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

				{/* Link to forgot password page */}
				<div className={classnames.linkContainer}>
					<span 
						className={classnames.navForgotPassword} 
						onClick={() => navigate('/auth/reset-password')}
					>
						Forgot password?
					</span>
				</div>

				{/* Submit email password auth */}
				<Group justify='center' mt='md'>
					<Button 
						type='submit' 
						disabled={!form.isValid()}
						className={classnames.button}
					>Submit</Button>
				</Group>
			</form>
		</AuthFormWrapper>
	);
}
