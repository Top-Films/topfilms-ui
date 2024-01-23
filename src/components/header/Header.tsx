import classnames from './header.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
	Avatar,
	UnstyledButton,
	Group,
	Menu,
	Button,
	Skeleton,
	Burger,
	Drawer,
	ScrollArea,
	Divider,
	rem
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Session from 'supertokens-web-js/recipe/session';
import { useEffect, useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { SMALL_BREAKPOINT_EM } from '../../shared/styles/style-constants';

const links = [
	{ link: 'home', label: 'Home' },
	{ link: 'about', label: 'About' },
	{ link: 'discover', label: 'Discover' }
];

export default function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const isMobile = useMediaQuery(`(max-width: ${SMALL_BREAKPOINT_EM})`);

	const items = links.map(link => (
		<NavLink
			key={link.label}
			to={link.link}
			className={({ isActive }) =>
				[
					classnames.link,
					isActive ? classnames.active : ''
				].join(' ')
			}
		>
			{link.label}
		</NavLink>
	));

	useEffect(() => {
		setIsLoading(true);
		// Need to wait before authenticated status has updated
		setTimeout(() => {
			checkAuthenticated();
			setIsLoading(false);
		}, 2000);
		console.log(isMobile);
	}, []);

	const checkAuthenticated = async () => {
		try {
			const isAuthenticatedStatus = await Session.doesSessionExist();
			setIsAuthenticated(isAuthenticatedStatus);
		} catch (_) {
			setIsAuthenticated(false);
		}
	};

	const onSignOut = async () => {
		await Session.signOut();
		setIsAuthenticated(false);
		navigate('/home');
	};

	// Don't show header for auth screen
	if (pathname.startsWith('/auth')) {
		return (<></>);
	}

	return (
		<div className={classnames.header}>
			<div className={classnames.inner}>
				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size='60%'
					padding='md'
					title='Top Films'
					hiddenFrom='sm'
					zIndex={1000000}
				>
					<ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
						<Divider my='sm' />
						{items}
					</ScrollArea>
				</Drawer>

				<Group>
					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
					{isMobile
						? <img 
							className={classnames.logoSmall} 
							src='https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-logo-white-transparent-textless.png'
							alt='Top Films Logo' 
						/>
						: <img 
							className={classnames.logoFull} 
							src='https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films-logo-white-transparent.png'
							alt='Top Films Logo' 
						/>
					}

				</Group>
				<Group>
					<Group ml={50} gap={5} visibleFrom='sm'>
						{items}
					</Group>
					{isLoading
						? <Skeleton height={40} circle />
						: <>
							{isAuthenticated
								? <Menu
									width={260}
									position='bottom-end'
									transitionProps={{ transition: 'pop-top-right' }}
									withinPortal
								>
									<Menu.Target>
										<UnstyledButton className={classnames.profile}>
											<Group>
												<Avatar size={40} color='blue'>MM</Avatar>
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
										>
											Delete Account
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
								: <>
									<Button
										size='xs'
										variant='outline'
										onClick={() => navigate('/auth/login')}
									>
										Sign In
									</Button>
									<Button 
										size='xs'
										onClick={() => navigate('/auth/register')}
									>
										Register
									</Button>
								</>
							}
						</>
					}
				</Group>
			</div>
		</div>
	);
}