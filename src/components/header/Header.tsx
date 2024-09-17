import {
	Box,
	Burger,
	Button,
	Divider,
	Drawer,
	Group,
	Menu,
	ScrollArea,
	Text,
	UnstyledButton,
	rem,
	useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconChevronDown,
	IconHeart,
	IconLogout,
	IconMessage,
	IconSettings,
	IconTrash
} from '@tabler/icons-react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import classes from './header.module.css';
  
export function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const theme = useMantineTheme();
	const auth = useAuth();
	const navigate = useNavigate();
  
	return (
		<Box>
			<header className={classes.header}>
				<Group justify='space-between' h='100%'>
					<img 
						className={classes.logo} 
						src={'https://raw.githubusercontent.com/Top-Films/assets/main/png/top-films.png'}
						alt='Top Films Logo'
						onClick={() => navigate('/home')}
					/>
  
					<Group h='100%' gap={0} visibleFrom='sm'>
						<a href='home' className={classes.link}>
							Home
						</a>
					</Group>

					<Menu
						width={260}
						position='bottom-end'
						transitionProps={{ transition: 'pop-top-right' }}
						withinPortal
					>
						<Menu.Target>
							<UnstyledButton className={classes.user}>
								<Group gap={7}>
									<Text fw={500} size='sm' lh={1} mr={3}>
										{auth.user?.profile.preferred_username}
									</Text>
									<IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								leftSection={
									<IconHeart
										style={{ width: rem(16), height: rem(16) }}
										color={theme.colors.red[6]}
										stroke={1.5}
									/>
								}
							>
								Liked posts
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconMessage
										style={{ width: rem(16), height: rem(16) }}
										color={theme.colors.blue[6]}
										stroke={1.5}
									/>
								}
							>
								Your comments
							</Menu.Item>

							<Menu.Label>Settings</Menu.Label>
							<Menu.Item
								leftSection={
									<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
								}
							>
								Account settings
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
								}
							>
								Logout
							</Menu.Item>

							<Menu.Divider />

							<Menu.Label>Danger zone</Menu.Label>
							<Menu.Item
								color='red'
								leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
							>
								Delete account
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size='100%'
				padding='md'
				title='Navigation'
				hiddenFrom='sm'
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
					<Divider my='sm' />

					<a href='#' className={classes.link}>
						Home
					</a>
					<Divider my='sm' />

					<Group justify='center' grow pb='xl' px='md'>
						<Button variant='default'>Log in</Button>
						<Button>Sign up</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}