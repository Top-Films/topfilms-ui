import { useLazyQuery } from '@apollo/client';
import { Group } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import AuthFormWrapper from '../../../components/auth/auth-form-wrapper/AuthFormWrapper';
import { TFSubmitButton } from '../../../components/button';
import { TFPasswordInput, TFTextInput } from '../../../components/input';
import { DUPLICATE_EMAIL_ERROR, UNKNOWN_ERROR_MESSAGE } from '../../../constants/constants';
import { GET_USER_METADATA } from '../../../gql/auth';
import { UserById } from '../../../types/auth/User';
import classnames from './login.module.scss';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [getUserMetadata] = useLazyQuery<UserById>(GET_USER_METADATA);
		
	const form = useForm({
		initialValues: {
			email: '',
			password: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 1, max: 64 })
		}
	});

	// Get error query param from third party callback to display message to user
	const [searchParams] = useSearchParams();
	useEffect(() => {
		if (searchParams.get('error') === 'thirdParty') {
			setErrorMessage('Unable to authenticate with third party');
		} else if (searchParams.get('error') === 'duplicateEmail') {
			setErrorMessage(DUPLICATE_EMAIL_ERROR);
		} else if (searchParams.get('error') === 'metadata') {
			setErrorMessage('Unable to get user metadata. Please try again');
		}
	}, []);

	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
				// If the metadata is not present then redirect to form
				getUserMetadata({ variables: { id: response.user.id } })
					.then(res => {
						if (res.error) {
							navigate('/auth/login?error=metadata');
							return;
						}

						if (!res.data?.userById?.username || !res.data?.userById?.firstName || !res.data?.userById?.lastName) {
							navigate('/auth/user-information');
						}
					});
				// Else navigate home
				navigate('/home');
			// Unexpected error
			} else {
				setErrorMessage('Unexpected error occurred. Please try again later');
			}

			setIsLoading(false);
		} catch (e: unknown) {
			if (e instanceof Error && STGeneralError.isThisError(e)) {
				setErrorMessage(e.message);
			} else {
				setErrorMessage(UNKNOWN_ERROR_MESSAGE);
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
				<TFTextInput label='Email' form={form} formInputProp='email'/>
				<TFPasswordInput label='Password' form={form} formInputProp='password' />

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
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}
