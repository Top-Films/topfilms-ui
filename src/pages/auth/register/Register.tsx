import { Group } from '@mantine/core';
import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import { TopFilmsError } from '../../../common/top-films-error';
import { TopFilmsUtil } from '../../../common/top-films-util';
import AuthFormWrapper from '../../../components/auth/auth-form-wrapper/AuthFormWrapper';
import { TFPrimaryButton } from '../../../components/button';
import { TFPasswordInput, TFTextInput } from '../../../components/input';
 
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
			password: hasLength({ min: 1, max: 64 }),
			confirmPassword: matchesField(
				'password',
				'Passwords are not the same'
			)
		},
		validateInputOnChange: true
	});

	/**
	 * Registers user when form is submitted
	 * 
	 * @param e form submit event
	 */
	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		try {
			await register();
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	/**
	 * Registers a user and navigates to verify email page on success
	 */
	async function register() {
		const response = await EmailPassword.signUp({
			formFields: [{
				id: 'email',
				value: form.getInputProps('email').value
			}, {
				id: 'password',
				value: form.getInputProps('password').value
			}]
		});

		if (response.status === 'OK') {
			navigate('/auth/verify-email');
			return;
		}
		
		// Fields are invalid
		if (response.status === 'FIELD_ERROR') {
			response.formFields.forEach(formField => {
				throw new TopFilmsError(formField.error);
			});
		}

		// Unkown error
		throw new TopFilmsError('Regristration failed. Please try again later');
	}

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
			<form onSubmit={e => onSubmit(e)}>
				<TFTextInput label='Email' form={form} formInputProp='email'/>
				<TFPasswordInput label='Password' form={form} formInputProp='password' />
				<TFPasswordInput label='Confirm Password' form={form} formInputProp='confirmPassword' />

				{/* Submit email password auth */}
				<Group justify='center' mt='md'>
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>	
		</AuthFormWrapper>
	);
}