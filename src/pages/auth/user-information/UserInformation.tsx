import { useMutation } from '@apollo/client';
import { Group } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Session from 'supertokens-auth-react/recipe/session';
import { TopFilmsError } from '../../../common/top-films-error';
import { TopFilmsUtil } from '../../../common/top-films-util';
import { AuthFormWrapper } from '../../../components/auth';
import { TFPrimaryButton } from '../../../components/button';
import { TFTextInput } from '../../../components/input';
import { CREATE_USER } from '../../../gql/auth';
import { UserInput } from '../../../types/auth/User';
import classnames from '../auth.module.scss';

export default function UserInformation() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const [createUser] = useMutation<UserInput>(CREATE_USER, {
		fetchPolicy: 'no-cache' 
	});

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

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		try {
			await submitUserData();
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		} finally {
			setIsLoading(false);
		}
	}

	async function submitUserData() {
		const userId = await Session.getUserId();
		const userInput: UserInput = {
			id: userId,
			username: form.getInputProps('username').value, 
			firstName: form.getInputProps('firstName').value,
			lastName: form.getInputProps('lastName').value 
		};
		await createUser({ variables: { input: userInput } })
			.then(res => {
				if (res.errors) {
					console.log(res.errors);
					throw new TopFilmsError(res.errors[0].toString());
				}
			});

		navigate('/home');
	}

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
			<form className={classnames.form} onSubmit={e => onSubmit(e)}>
				<TFTextInput label='Username' form={form} formInputProp='username' />
				<TFTextInput label='First Name' form={form} formInputProp='firstName' />
				<TFTextInput label='Last Name' form={form} formInputProp='lastName' />

				<Group justify='center' mt='md'>
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}