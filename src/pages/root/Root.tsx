import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
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
				: <>
					<main className={classnames.main}><Outlet /></main>
					<footer className={classnames.footer}><Footer /></footer>
				</>
			}
		</>

	);
}