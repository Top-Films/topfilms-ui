import { Button, Group } from '@mantine/core';
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import AuthFormWrapper from '../../../components/auth/auth-form-wrapper/AuthFormWrapper';
import { TFPasswordInput, TFTextInput } from '../../../components/input';
import { POST_AUTH_REDIRECT_PATH } from '../../../shared/constants/constants';
import classnames from './register.module.scss';
 
export default function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 1 }),
			confirmPassword: matchesField(
				'password',
				'Passwords are not the same'
			)
		},
		validateInputOnChange: true
	});

	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Days of pain because of you
		setIsLoading(true);
		try {
			// Attempt to sign in or up using email and password from form
			const response = await ThirdPartyEmailPassword.emailPasswordSignUp({
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
			// Unkown error registering
			} else if (response.status === 'SIGN_UP_NOT_ALLOWED') { 
				setErrorMessage('Registration failed. Please try again later');
			// Successful register
			} else if (response.status === 'OK') {
				navigate(POST_AUTH_REDIRECT_PATH);
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
			formHeader='Register'
			setIsLoading={setIsLoading}
			isLoading={isLoading}
			setErrorMessage={setErrorMessage}
			errorMessage={errorMessage}
			loginOrRegisterText='Already have an account?'
			loginOrRegisterPath='/auth/login'
			enableThirdParty={true}
		>
			{/* Form for email password auth */}
			<form onSubmit={e => onClickSubmit(e)}>
				<TFTextInput label='Email' form={form} formInputProp='email'/>
				<TFPasswordInput label='Password' form={form} formInputProp='password' />
				<TFPasswordInput label='Confirm Password' form={form} formInputProp='confirmPassword' />

				{/* Submit email password auth */}
				<Group justify='center' mt='md'>
					<Button 
						type='submit' 
						disabled={!form.isValid()}
						className={classnames.button}
					>
						Submit
					</Button>
				</Group>
			</form>	
		</AuthFormWrapper>
	);
}