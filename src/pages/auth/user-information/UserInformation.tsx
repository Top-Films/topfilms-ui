import { Group } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormWrapper } from '../../../components/auth';
import { TFSubmitButton } from '../../../components/button';
import { TFTextInput } from '../../../components/input';
import { postUserMetadata } from '../../../services/auth/auth-service';
import classnames from '../auth.module.scss';

export default function UserInformation() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			firstName: '',
			lastName: ''
		},
		validate: {
			firstName: hasLength({ min: 1 }),
			lastName: hasLength({ min: 1 })
		}
	});

	const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await postUserMetadata(
				form.getInputProps('firstName').value, 
				form.getInputProps('lastName').value
			);
			navigate('/home');
		} catch (_) {
			setErrorMessage('Oops! Something went wrong.');
		} finally {
			setIsLoading(false);
		}
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
				<TFTextInput label='First Name' form={form} formInputProp='firstName' />
				<TFTextInput label='Last Name' form={form} formInputProp='lastName' />

				<Group justify='center' mt='md'>
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>
		</AuthFormWrapper>
	);
}