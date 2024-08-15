import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Environment } from './common/environment';
import { client } from './config/apollo-config';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Discover from './pages/discover/Discover';
import Home from './pages/home/Home';
import Privacy from './pages/privacy/Privacy';
import Root from './pages/root/Root';
import Terms from './pages/terms/Terms';

// Load apollo error messages
if (Environment.isDev()) {
	loadDevMessages();
	loadErrorMessages();
}

// Router
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='home' element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path='discover' element={<Discover />} />
			<Route path='contact' element={<Contact />} />
			<Route path='privacy' element={<Privacy />} />
			<Route path='terms' element={<Terms />} />
		</Route>
	)
);

export default function App() {
	return (
		<ApolloProvider client={client}>
			<MantineProvider defaultColorScheme='dark'>
				<Notifications />
				<RouterProvider router={router} />
			</MantineProvider>
		</ApolloProvider>
	);
}
