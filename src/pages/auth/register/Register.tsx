import classnames from './register.module.scss';
import {
	Button, 
	Group, 
	PasswordInput, 
	TextInput 
} from '@mantine/core';
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { mainBackgroundColor, mainFontColor } from '../../../styles/style-constants';
import { FormEvent, useState } from 'react';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import AuthFormWrapper from '../../../components/auth-form-wrapper/AuthFormWrapper';
 
export default function Register() {
	// States
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// Form
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

				<PasswordInput
					label='Confirm Password'
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