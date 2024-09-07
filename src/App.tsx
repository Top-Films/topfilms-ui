 
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from 'react-oidc-context';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { oidcConfig } from './common/config';
import Home from './pages/home/Home';
import Root from './pages/root/Root';
import Contact from './pages/contact/Contact';
import Privacy from './pages/privacy/Privacy';
import Terms from './pages/terms/Terms';

// Router
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='home' element={<Home />} />
			<Route path='contact' element={<Contact />} />
			<Route path='privacy' element={<Privacy />} />
			<Route path='terms' element={<Terms />} />
		</Route>
	)
);

export default function App() {
	return (
		<AuthProvider {...oidcConfig}>
			<MantineProvider forceColorScheme='dark'>
				<Notifications />
				<RouterProvider router={router} />
			</MantineProvider>
		</AuthProvider>
	);
}
