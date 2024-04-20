import { Group } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { AuthFormWrapper } from '../..';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT, UNKNOWN_ERROR_MESSAGE } from '../../../../constants/constants';
import { TFSubmitButton } from '../../../button';
import { TFTextInput } from '../../../input';
import classnames from '../auth-reset-password.module.scss';

export default function ResetPasswordEmail() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	
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
			// Attempt to submit email for password reset
			const response = await ThirdPartyEmailPassword.sendPasswordResetEmail({
				formFields: [{
					id: 'email',
					value: form.getInputProps('email').value
				}]
			});

			// Email is invalid
			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					if (formField.id === 'email') {
						setErrorMessage(formField.error);
					}
				});
			// Special case with account linking error
			} else if (response.status === 'PASSWORD_RESET_NOT_ALLOWED') {
				setErrorMessage(UNKNOWN_ERROR_MESSAGE);
			// Reset password email sent
			} else {
				navigate('/auth/reset-password?sent=true');
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
			formHeader='Reset Password'
			setIsLoading={setIsLoading}
			isLoading={isLoading}
			setErrorMessage={setErrorMessage}
			errorMessage={errorMessage}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<form className={classnames.form} onSubmit={e => onClickSubmit(e)}>
				<TFTextInput label='Email' form={form} formInputProp='email' />

				<Group justify='center' mt='md'>
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}