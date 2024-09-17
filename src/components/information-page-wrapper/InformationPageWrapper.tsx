import { ReactNode } from 'react';
import classes from './information-page-wrapper.module.css';

// Wraps basic pages just displaying information text in a container for appearance
export default function InformationPageWrapper(props: {
	children: ReactNode
}) {
	return (
		<div className={classes.container}>
			{props.children}
		</div>
	);
}