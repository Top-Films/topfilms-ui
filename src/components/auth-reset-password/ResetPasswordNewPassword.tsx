import { hasLength, matchesField, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import AuthFormWrapper from '../auth-form-wrapper/AuthFormWrapper';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { Button, Group, PasswordInput } from '@mantine/core';
import { mainBackgroundColor, mainFontColor } from '../../shared/styles/style-constants';
import classnames from './auth-reset-password.module.scss';

export default function ResetPasswordNewPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	// Define form
	const form = useForm({
		initialValues: {
			password: '',
			confirmPassword: ''
		},
		validate: {
			password: hasLength({ min: 1 }),
			confirmPassword: matchesField(
				'password',
				'Passwords are not the same'
			)
		}
	});

	/**
	 * Submits reset password email
	 * 
	 * @param e submit form event
	 */
	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Attempt to sign in or up using email and password from form
			const response = await ThirdPartyEmailPassword.submitNewPassword({
				formFields: [{
					id: 'password',
					value: form.getInputProps('password').value
				}]
			});
	
			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					if (formField.id === 'password') {
						// New password did not meet password criteria on the backend.
						setErrorMessage(formField.error);
					}
				});
			} else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
				// The password reset token in the URL is invalid, expired, or already consumed
				setErrorMessage('Password reset failed. Please try again');
			} else {
				navigate('/auth/reset-password?success=true');
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
			formHeader='Reset Password'
			setIsLoading={setIsLoading}
			isLoading={isLoading}
			setErrorMessage={setErrorMessage}
			errorMessage={errorMessage}
			loginOrRegisterText='Remember your password?'
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<form className={classnames.form} onSubmit={e => onClickSubmit(e)}>
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