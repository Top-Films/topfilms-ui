import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import classnames from './root.module.scss';

export default function Root() {
	return (
		<div className={classnames.contentWrapper}>
			<header><Header /></header>
			<main className={classnames.main}><Outlet /></main>
			<footer className={classnames.footer}><Footer /></footer>
		</div>
	);
}