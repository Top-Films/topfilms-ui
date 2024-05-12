import { Button } from '@mantine/core';
import classnames from './tf-primary-button.module.scss';

// Submit button 
export default function TFPrimaryButton(props: {
	text: string,
	type?: 'button' | 'submit' | 'reset',
	disabled?: boolean
}) {
	return (
		<Button 
			type={props.type}
			disabled={props.disabled}
			className={classnames.button}
		>
			{props.text}
		</Button>
	);
}