// import classnames from './login.module.scss';
// import {
// 	Button, 
// 	Group, 
// 	PasswordInput, 
// 	TextInput 
// } from '@mantine/core';
// import { isEmail, useForm } from '@mantine/form';
// import { mainBackgroundColor, mainFontColor } from '../../../styles/style-constants';
// import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
// import STGeneralError from 'supertokens-web-js/lib/build/error';
// import { FormEvent, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

export default function ResetPassword() {		
	// const [searchParams] = useSearchParams();
	// const [isLoading, setIsLoading] = useState(false);
	// const [errorMessage, setErrorMessage] = useState('');

	// // Define form
	// const form = useForm({
	// 	initialValues: {
	// 		email: ''
	// 	},
	// 	validate: {
	// 		email: isEmail('Invalid email')
	// 	},
	// 	validateInputOnChange: true
	// });

	// /**
	//  * Submits reset password email
	//  * 
	//  * @param e submit form event
	//  */
	// const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	setIsLoading(true);
	// 	try {
	// 		// Attempt to sign in or up using email and password from form
	// 		const response = await ThirdPartyEmailPassword.sendPasswordResetEmail({
	// 			formFields: [{
	// 				id: 'email',
	// 				value: form.getInputProps('email').value
	// 			}]
	// 		});

	// 		if (response.status === 'FIELD_ERROR') {
	// 			response.formFields.forEach(formField => {
	// 				if (formField.id === 'email') {
	// 					setErrorMessage(formField.error);
	// 				}
	// 			});
	// 		} else if (response.status === 'PASSWORD_RESET_NOT_ALLOWED') {
	// 			setErrorMessage('Oops! Something went wrong.');
	// 		} else {
	// 			// Reset password email sent
	// 			navigate('/auth/reset-password?sent=true');
	// 		}

	// 		setIsLoading(false);
	// 	// Exception handling
	// 	} catch (e: unknown) {
	// 		if (e instanceof STGeneralError) {
	// 			setErrorMessage(e.message);
	// 		} else {
	// 			setErrorMessage('Oops! Something went wrong.');
	// 		}

	// 		setIsLoading(false);
	// 	}
	// };
	return (<></>);
}