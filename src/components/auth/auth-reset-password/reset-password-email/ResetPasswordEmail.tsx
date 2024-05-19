import { Group } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdPartyEmailPassword from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import { AuthFormWrapper } from '../..';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT, UNKNOWN_ERROR_MESSAGE } from '../../../../common/constants';
import { TopFilmsError } from '../../../../common/top-films-error';
import { TopFilmsUtil } from '../../../../common/top-films-util';
import { TFPrimaryButton } from '../../../button';
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
	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		try {
			await submitEmail();
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * Sends email to user for password reset
	 */
	async function submitEmail() {
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
					throw new TopFilmsError(formField.error);
				}
			});
		// Special case with account linking error
		} else if (response.status === 'PASSWORD_RESET_NOT_ALLOWED') {
			throw new TopFilmsError(UNKNOWN_ERROR_MESSAGE);
		}

		// Reset password email sent
		navigate('/auth/reset-password?sent=true');
	}

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
			<form className={classnames.form} onSubmit={e => onSubmit(e)}>
				<TFTextInput label='Email' form={form} formInputProp='email' />

				<Group justify='center' mt='md'>
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}