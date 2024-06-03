import { useLazyQuery } from '@apollo/client';
import { Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Session from 'supertokens-auth-react/recipe/session';
import { TOP_FILMS_LOGO_FULL, TOP_FILMS_LOGO_TEXTLESS } from '../../common/constants';
import { GET_USER_METADATA } from '../../gql/auth';
import { SMALL_BREAKPOINT_EM } from '../../styles/variables';
import { UserById } from '../../types/auth/User';
import HeaderAnonymous from './header-anonymous/HeaderAnonymous';
import HeaderAuthenticated from './header-authenticated/HeaderAuthenticated';
import HeaderDrawer from './header-drawer/HeaderDrawer';
import classnames from './header.module.scss';

const links = [
	{ link: 'home', label: 'Home' },
	{ link: 'about', label: 'About' },
	{ link: 'discover', label: 'Discover' }
];

export default function Header() {
	const navigate = useNavigate();
	const isMobile = useMediaQuery(`(max-width: ${SMALL_BREAKPOINT_EM})`);
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [initials, setInitials] = useState('');
	const [getUserMetadata] = useLazyQuery<UserById>(GET_USER_METADATA, {
		fetchPolicy: 'no-cache' 
	});

	// Nav paths based on links
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
	
	// Check auth status on component load
	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const isUserAuthenticated = await Session.doesSessionExist();
				setIsAuthenticated(isUserAuthenticated);
				if (isUserAuthenticated) {
					const userId = await Session.getUserId();
					await getUserMetadata({ variables: { id: userId } })
						.then(res => {
							if (!res.data?.userById?.username || !res.data?.userById?.firstName || !res.data?.userById?.lastName) {
								Session.signOut();
								setIsAuthenticated(false);
							} else {
								setIsAuthenticated(true);
								setInitials(`${getInitial(res.data.userById.firstName)}${getInitial(res.data.userById.lastName)}`);
							}
						})
						.catch(e => {
							setIsAuthenticated(false);
							console.log(e);
						});
				}
			} catch (_) {
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	// Gets first char from name and uppercases
	function getInitial(name: string) {
		return name.charAt(0).toUpperCase();
	} 

	return (
		<div className={classnames.header}>
			<div className={classnames.inner}>
				<Group>
					{/* Burger for mobile */}
					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' />

					{/* Change to smaller image for mobile */}
					{isMobile
						? <img 
							className={classnames.logoSmall} 
							src={TOP_FILMS_LOGO_TEXTLESS}
							alt='Top Films Logo' 
							onClick={() => navigate('/home')}
						/>
						: <img 
							className={classnames.logoFull} 
							src={TOP_FILMS_LOGO_FULL}
							alt='Top Films Logo' 
							onClick={() => navigate('/home')}
						/>
					}
				</Group>

				<Group>
					{/* Nav paths are constant for anonymous and authenticated users */}
					<Group ml={50} gap={5} visibleFrom='sm'>
						{items}
					</Group>
					{/* Show profile skeleton while determining auth status */}
					{isLoading
						? <Skeleton height={40} circle />
						: <>
							{/* Show authenticated or anonymous part of header */}
							{isAuthenticated
								? <HeaderAuthenticated setIsLoading={setIsLoading} setIsAuthenticated={setIsAuthenticated} initials={initials} />
								: <HeaderAnonymous />
							}
						</>
					}
				</Group>
				
				<HeaderDrawer items={items} drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
			</div>
		</div>
	);
}