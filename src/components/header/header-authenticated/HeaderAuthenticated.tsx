import { faGear, faRightFromBracket, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Group, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction } from 'react';
import DeleteModal from '../../delete-modal/DeleteModal';
import classnames from '../header.module.scss';

// Show profile dropdown for authenticated users
export default function HeaderAuthenticated(props: {
	setIsLoading: Dispatch<SetStateAction<boolean>>,
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
	initials: string
}) {
	const [opened, { open, close }] = useDisclosure(false);

	// Remove session and navigate to home when user clicks sign out
	const onSignOut = async () => {
		
	};

	// Deletes account data
	const onSubmitDeleteAccount = async () => {
		
	};
		
	return (
		<>	
			<Menu
				width={260}
				position='bottom-end'
				transitionProps={{ transition: 'pop-top-right' }}
				withinPortal
			>
				<Menu.Target>
					<UnstyledButton className={classnames.profile}>
						<Group>
							<Avatar size={40} color='blue'>{props.initials}</Avatar>
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item 
						color='white' 
						leftSection={<FontAwesomeIcon icon={faUser} />}
					>
						Profile
					</Menu.Item>
					<Menu.Item 
						color='white' 
						leftSection={<FontAwesomeIcon icon={faGear} />}
					>
						Account Settings
					</Menu.Item>
					<Menu.Item 
						color='white' 
						leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
						onClick={onSignOut}
					>
						Sign Out
					</Menu.Item>
					<Menu.Item 
						color='red' 
						leftSection={<FontAwesomeIcon icon={faTrash} />}
						onClick={() => open()}
					>
						Delete Account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>

			<DeleteModal 
				opened={opened} 
				close={close}
				title='Are you sure you want to delete your account?' 
				onSubmit={onSubmitDeleteAccount} 
			/>
		</>
	);
}