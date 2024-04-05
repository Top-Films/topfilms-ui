import { useMutation } from '@apollo/client';
import { Group } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Session from 'supertokens-web-js/recipe/session';
import { AuthFormWrapper } from '../../../components/auth';
import { TFSubmitButton } from '../../../components/button';
import { TFTextInput } from '../../../components/input';
import { CREATE_USER } from '../../../gql/auth';
import { UserInput } from '../../../types/auth/User';
import classnames from '../auth.module.scss';
import { Environment } from '../../../util/Environment';
import axios from 'axios';

export default function UserInformation() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const [createUser] = useMutation<UserInput>(CREATE_USER);

	const form = useForm({
		initialValues: {
			username: '',
			firstName: '',
			lastName: ''
		},
		validate: {
			username: hasLength({ min: 1, max: 64 }),
			firstName: hasLength({ min: 1, max: 64 }),
			lastName: hasLength({ min: 1, max: 64 })
		}
	});

	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// setIsLoading(true);
		console.log(await Session.doesSessionExist());
		console.log('Fetch');
		fetch(Environment.apiUrl());
		// try {
		// 	const userId = await Session.getUserId();
		// 	const userInput: UserInput = {
		// 		id: userId,
		// 		username: form.getInputProps('username').value, 
		// 		firstName: form.getInputProps('firstName').value,
		// 		lastName: form.getInputProps('lastName').value 
		// 	};
		// 	await createUser({
		// 		variables: { input: userInput } 
		// 	});

		// 	navigate('/home');
		// } catch (_: unknown) {
		// 	setErrorMessage('Oops! Something went wrong.');
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	return (
		<AuthFormWrapper
			formHeader='User Details'
			setIsLoading={setIsLoading}
			isLoading={isLoading}
			setErrorMessage={setErrorMessage}
			errorMessage={errorMessage}
			loginOrRegisterText=''
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<form className={classnames.form} onSubmit={e => onClickSubmit(e)}>
				<TFTextInput label='Username' form={form} formInputProp='username' />
				<TFTextInput label='First Name' form={form} formInputProp='firstName' />
				<TFTextInput label='Last Name' form={form} formInputProp='lastName' />

				<Group justify='center' mt='md'>
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}