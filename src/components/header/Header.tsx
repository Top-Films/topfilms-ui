import { Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOP_FILMS_LOGO_FULL, TOP_FILMS_LOGO_TEXTLESS } from '../../common/constants';
import { SMALL_BREAKPOINT_EM } from '../../styles/variables';
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
		
	}, []);

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
								? <HeaderAuthenticated setIsLoading={setIsLoading} setIsAuthenticated={setIsAuthenticated} initials={'MM'} />
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