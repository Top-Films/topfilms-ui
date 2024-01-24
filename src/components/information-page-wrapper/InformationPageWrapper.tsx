import { ReactNode } from 'react';
import classnames from './information-page-wrapper.module.scss';

// Wraps basic pages just displaying information text in a container for appearance
export default function InformationPageWrapper(props: {
	children: ReactNode
}) {
	return (
		<div className={classnames.container}>
			{props.children}
		</div>
	);
}