import { Group } from '@mantine/core';
import { hasLength, matchesField, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { UNKNOWN_ERROR_MESSAGE } from '../../../../constants/constants';
import { TFSubmitButton } from '../../../button';
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
	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Attempt to submit new password
			const response = await ThirdPartyEmailPassword.submitNewPassword({
				formFields: [{
					id: 'password',
					value: form.getInputProps('password').value
				}]
			});
	
			// Invalid password
			if (response.status === 'FIELD_ERROR') {
				response.formFields.forEach(formField => {
					if (formField.id === 'password') {
						// New password did not meet password criteria on the backend.
						setErrorMessage(formField.error);
					}
				});
			// The password reset token in the URL is invalid, expired, or already consumed
			} else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
				setErrorMessage(UNKNOWN_ERROR_MESSAGE);
			// Successfully reset password
			} else {
				navigate('/auth/reset-password?success=true');
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
			loginOrRegisterText='Remember your password?'
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<form className={classnames.form} onSubmit={e => onClickSubmit(e)}>
				<TFPasswordInput label='Password' form={form} formInputProp='password' />
				<TFPasswordInput label='Confirm Password' form={form} formInputProp='confirmPassword' />

				<Group justify='center' mt='md'>
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}