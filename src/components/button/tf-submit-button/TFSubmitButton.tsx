import { Button } from '@mantine/core';
import classnames from './tf-submit-button.module.scss';

// Submit button 
export default function TFSubmitButton(props: {
	disabled?: boolean
}) {
	return (
		<Button 
			type='submit' 
			disabled={props.disabled}
			className={classnames.button}
		>
				Submit
		</Button>
	);
}