import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import classnames from './root.module.scss';

/**
 * Root element for the UI. Wraps child component with the header and footer
 */
export default function Root() {
	const { pathname } = useLocation();
	
	return (
		<>
			{/* Home/Landing page at /home -- no root path */}
			{pathname === '/' 
				? <Navigate to='/home' replace />
				// Content wrapper on auth page not needed due to no header/footer
				: <div className={pathname.startsWith('/auth') ? '' : classnames.contentWrapper}>
					{/* No header and footer for auth page -- it has its own */}
					{/* Mobile auth ui needs to fit all in one screen */}
					{pathname.startsWith('/auth')
						? <main className={classnames.main}><Outlet /></main>
						: <>
							<header><Header /></header>
							<main className={classnames.main}><Outlet /></main>
							<footer className={classnames.footer}><Footer /></footer>
						</>
					}
				</div>
			}
		</>

	);
}