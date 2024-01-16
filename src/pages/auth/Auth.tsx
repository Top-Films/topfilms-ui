import { Navigate, Outlet, useLocation } from 'react-router-dom';
import classnames from './auth.module.scss';

export default function Auth() {
	const { pathname } = useLocation();
	
	return (
		<div className={classnames.container}>
			{pathname === '/auth' 
				? <Navigate to='/auth/login' replace />
				: <div className={classnames.container}><Outlet /></div>
			}
		</div>
	);
}