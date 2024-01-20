import { ReactNode } from 'react';
import classnames from './information-page-wrapper.module.scss';

export default function InformationPageWrapper(props: {
	children: ReactNode
}) {
	return (
		<div className={classnames.container}>
			{props.children}
		</div>
	);
}