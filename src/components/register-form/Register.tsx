import classnames from './register-form.module.scss';
import {
	Button, 
	Group, 
	PasswordInput, 
	TextInput 
} from '@mantine/core';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { mainBackgroundColor, mainFontColor } from '../../styles/style-constants';
import { Dispatch, SetStateAction } from 'react';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import STGeneralError from 'supertokens-web-js/lib/build/error';
 
export default function RegisterForm(props: {
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	setErrorMessage: Dispatch<SetStateAction<string>>
}) {
	// Define form
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			confirmPassword: matchesField(
				'password',
				'Passwords are not the same'
			)
		},
		validateInputOnChange: true
	});

	const onClickSubmit = async () => {
		props.setIsLoading(true);
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
						props.setErrorMessage('Email is invalid or already exists');
					// Password is invalid
					} else if (formField.id === 'password') {
						props.setErrorMessage('Password does not meet strength requirements');
					}
				});
			// Unkown error registering
			} else if (response.status === 'SIGN_UP_NOT_ALLOWED') { 
				props.setErrorMessage('Registration failed. Please try again later');
			// Successful register
			} else if (response.status === 'OK') {
				window.location.assign('/home');
			// Unexpected error
			} else {
				props.setErrorMessage('Unexpected error occurred. Please try again later');
			}

			props.setIsLoading(false);
		// Exception handling
		} catch (e: unknown) {
			if (e instanceof STGeneralError) {
				props.setErrorMessage(e.message);
			} else {
				props.setErrorMessage('Oops! Something went wrong.');
			}

			props.setIsLoading(false);
		}
	};

	return (
		<>
			{/* Form for email password auth */}
			<form>
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
						onClick={onClickSubmit}
					>Submit</Button>
				</Group>
			</form>	
		</>
	);
}