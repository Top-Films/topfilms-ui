import {
	Divider,
	Drawer,
	ScrollArea,
	rem
} from '@mantine/core';
import { ReactNode } from 'react';
import { APP_NAME } from '../../../shared/constants/constants';

export default function HeaderDrawer(props: {
	items: ReactNode,
	drawerOpened: boolean,
	closeDrawer: () => void
}) {
	return (
		<Drawer
			opened={props.drawerOpened}
			onClose={props.closeDrawer}
			size='60%'
			padding='md'
			title={APP_NAME}
			hiddenFrom='sm'
			zIndex={1000000}
		>
			<ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
				<Divider my='sm' />
				{props.items}
			</ScrollArea>
		</Drawer>
	);
}