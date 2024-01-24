import { Navigate, Outlet, useLocation } from 'react-router-dom';
import classnames from './auth.module.scss';

export default function Auth() {
	const { pathname } = useLocation();
	
	return (
		<div className={classnames.container}>
			{/* Navigate to login on direct match to /auth(/) */}
			{pathname === '/auth' || pathname === '/auth/'
				? <Navigate to='/auth/login' replace />
				: <div className={classnames.container}><Outlet /></div>
			}
		</div>
	);
}