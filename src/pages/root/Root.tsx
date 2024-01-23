import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import classnames from './root.module.scss';

export default function Root() {
	const { pathname } = useLocation();
	
	return (
		<>
			{pathname === '/' 
				? <Navigate to='/home' replace />
				: <div className={classnames.contentWrapper}>
					<header><Header /></header>
					<main className={classnames.main}><Outlet /></main>
					<footer className={classnames.footer}><Footer /></footer>
				</div>
			}
		</>

	);
}