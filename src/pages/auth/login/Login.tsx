import { useLazyQuery } from '@apollo/client';
import { Group } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { User } from 'supertokens-web-js/types';
import { DUPLICATE_EMAIL_ERROR_MESSAGE } from '../../../common/constants';
import { TopFilmsError } from '../../../common/top-films-error';
import { TopFilmsUtil } from '../../../common/top-films-util';
import AuthFormWrapper from '../../../components/auth/auth-form-wrapper/AuthFormWrapper';
import { TFPrimaryButton } from '../../../components/button';
import { TFPasswordInput, TFTextInput } from '../../../components/input';
import { GET_USER_METADATA } from '../../../gql/auth';
import { UserById } from '../../../types/auth/User';
import classnames from './login.module.scss';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [getUserMetadata] = useLazyQuery<UserById>(GET_USER_METADATA, {
		fetchPolicy: 'no-cache' 
	});
		
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
		setErrorMessageQueryParam();
	}, []);

	/**
	 * Sets an error message based on the query parameter
	 */
	function setErrorMessageQueryParam() {
		if (searchParams.get('error') === 'thirdParty') {
			setErrorMessage('Unable to authenticate with third party');
		} else if (searchParams.get('error') === 'duplicateEmail') {
			setErrorMessage(DUPLICATE_EMAIL_ERROR_MESSAGE);
		} else if (searchParams.get('error') === 'metadata') {
			setErrorMessage('Unable to get user metadata. Please try again');
		} else if (searchParams.get('error') === 'verifyEmail') {
			setErrorMessage('Unable to verify email. Please try again later');
		}
	}

	/**
	 * Signs a user in and also validates email verification gql user metadata
	 * 
	 * @param e form submit event
	 */
	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const user = await signIn();
			getUserMetadata({ variables: { id: user.id } })
				.then(res => {
					navigate(TopFilmsUtil.navigatePostSignInUp(res));
				});
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * Signs in a user
	 * 
	 * @returns User object
	 */
	async function signIn(): Promise<User> {
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

		if (response.status === 'OK') {
			return response.user;
		}

		// Fields are invalid
		if (response.status === 'FIELD_ERROR') {
			response.formFields.forEach(formField => {
				throw new TopFilmsError(formField.error);
			});
		// Invalid credentials
		} else if (response.status === 'WRONG_CREDENTIALS_ERROR') { 
			throw new TopFilmsError('The provided credentials are invalid');
		}

		// Unknown error
		throw new TopFilmsError('Sign in failed. Please try again later');
	}

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
			<form onSubmit={e => onSubmit(e)}>
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
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}
