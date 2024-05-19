import { Button, Group, Modal } from '@mantine/core';
import { matches, useForm } from '@mantine/form';
import { FormEvent, useState } from 'react';
import { TopFilmsUtil } from '../../common/top-films-util';
import { TFPrimaryButton } from '../button';
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

	// Create form
	const form = useForm({
		initialValues: {
			delete: ''
		},
		validate: {
			delete: matches(new RegExp(DELETE_TEXT))
		}
	});

	// Close modal
	function onClose() {
		refreshValues();
		props.close();
	}

	// Submit form
	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			props.onSubmit();
			refreshValues();
		} catch (e: unknown) {
			setErrorMessage(TopFilmsUtil.getAuthErrorMessage(e));
		}	
	}

	// Unset values
	function refreshValues() {
		form.setFieldValue('delete', '');
		setErrorMessage('');
	}

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
					<TFPrimaryButton text='Submit' disabled={!form.isValid()} type='submit' />
				</Group>
			</form>

			<p className={classnames.error}>{errorMessage}</p>
		</Modal>
	);
}