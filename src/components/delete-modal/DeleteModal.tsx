import { Button, Group, Modal } from '@mantine/core';
import { matches, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { UNKNOWN_ERROR_MESSAGE } from '../../constants/constants';
import { TFSubmitButton } from '../button';
import { TFTextInput } from '../input';
import classnames from './delete-modal.module.scss';

export default function DeleteModal(props: {
	opened: boolean,
	close: () => void,
	title: string,
	onSubmit: () => void
}) {
	const [errorMessage, setErrorMessage] = useState('');
	const DELETE_TEXT = 'DELETE';

	const form = useForm({
		initialValues: {
			delete: ''
		},
		validate: {
			delete: matches(new RegExp(DELETE_TEXT))
		}
	});

	const onClose = () => {
		refreshValues();
		props.close();
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			props.onSubmit();
			refreshValues();
		} catch (err: unknown) {
			if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage(UNKNOWN_ERROR_MESSAGE);
			}
		}	
	};

	const refreshValues = () => {
		form.setFieldValue('delete', '');
		setErrorMessage('');
	};

	return (
		<Modal 
			opened={props.opened} 
			onClose={onClose}
			title={props.title}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3
			}}
		>
			<form onSubmit={e => onSubmit(e)}>
				<TFTextInput label='To confirm enter DELETE' form={form} formInputProp='delete' />

				<Group justify='center' mt='md'>
					<Button variant='default' onClick={onClose}>
						Cancel
					</Button>
					<TFSubmitButton disabled={!form.isValid()} />
				</Group>
			</form>

			<p className={classnames.error}>{errorMessage}</p>
		</Modal>
	);
}