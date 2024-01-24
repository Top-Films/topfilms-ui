import { PasswordInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { MAIN_BACKGROUND_COLOR, MAIN_FONT_COLOR } from '../../../shared/styles/variables';

// Input with label for a password
export default function TFPasswordInput(props: {
	label: string, // Label above input
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturnType<any> // Need any due to forms being different
	formInputProp: string // Input name within form
}) {
	return (
		<PasswordInput
			label={props.label}
			styles={{
				input: { 
					backgroundColor: MAIN_BACKGROUND_COLOR,
					borderColor: MAIN_BACKGROUND_COLOR,
					color: MAIN_FONT_COLOR,
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
			{...props.form.getInputProps(props.formInputProp)}
		/>
	);
}