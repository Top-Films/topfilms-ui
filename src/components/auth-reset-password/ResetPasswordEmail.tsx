import { isEmail, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import AuthFormWrapper from '../auth-form-wrapper/AuthFormWrapper';
import { Button, Group, TextInput } from '@mantine/core';
import { mainBackgroundColor, mainFontColor } from '../../shared/styles/style-constants';
import classnames from './auth-reset-password.module.scss';

export default function ResetPasswordEmail() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	
	// Define form
	const form = useForm({
		initialValues: {
			email: ''
		},
		validate: {
			email: isEmail('Invalid email')
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
			const response = await ThirdPartyEmailPassword.sendPasswordResetEmail({
				formFields: [{
					id: 'email',
					value: form.getInputProps('email').value
				}]
			});

			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					if (formField.id === 'email') {
						setErrorMessage(formField.error);
					}
				});
			} else if (response.status === 'PASSWORD_RESET_NOT_ALLOWED') {
				setErrorMessage('Oops! Something went wrong.');
			} else {
				// Reset password email sent
				navigate('/auth/reset-password?sent=true');
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