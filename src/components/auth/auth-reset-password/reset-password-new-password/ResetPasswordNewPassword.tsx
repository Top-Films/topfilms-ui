import { Group } from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT, RESET_PASSWORD_TOKEN_EXPIRED_ERROR_MESSAGE } from '../../../../common/constants';
import { TopFilmsError } from '../../../../common/top-films-error';
import { TopFilmsUtil } from '../../../../common/top-films-util';
import { TFPrimaryButton } from '../../../button';
import { TFPasswordInput } from '../../../input';
import AuthFormWrapper from '../../auth-form-wrapper/AuthFormWrapper';
import classnames from '../auth-reset-password.module.scss';

export default function ResetPasswordNewPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

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
	 * Submits new password
	 * 
	 * @param e submit form event
	 */
	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		try {
			await submitNewPassword();
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * Submits request for new password
	 */
	async function submitNewPassword() {
		// Attempt to submit new password
		const response = await EmailPassword.submitNewPassword({
			formFields: [{
				id: 'password',
				value: form.getInputProps('password').value
			}]
		});

		// Invalid password
		if (response.status === 'FIELD_ERROR') {
			response.formFields.forEach(formField => {
				if (formField.id === 'password') {
					throw new TopFilmsError(formField.error);
				}
			});
		// The password reset token in the URL is invalid, expired, or already consumed
		} else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
			throw new TopFilmsError(RESET_PASSWORD_TOKEN_EXPIRED_ERROR_MESSAGE);
		}

		// Successfully reset password
		navigate('/auth/reset-password?success=true');
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
				<TFPasswordInput label='Password' form={form} formInputProp='password' />
				<TFPasswordInput label='Confirm Password' form={form} formInputProp='confirmPassword' />

				<Group justify='center' mt='md'>
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}