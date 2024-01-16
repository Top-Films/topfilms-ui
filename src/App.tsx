import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SuperTokens from 'supertokens-web-js';
import ThirdPartyEmailPassword from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import Session from 'supertokens-web-js/recipe/session';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import ThirdPartyCallback from './pages/third-party-callback/ThirdPartyCallback';

SuperTokens.init({
	appInfo: {
		appName: 'Top Films',
		apiDomain: import.meta.env.AUTHENTICATION_API_URL ?? 'http://localhost:3001'
	},
	recipeList: [
		ThirdPartyEmailPassword.init(), 
		Session.init()
	]
});

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/'>
			<Route path='home' element={<Home />} />
			<Route path='auth' element={<Auth />} /> 
			<Route path='auth/callback/:providerId' element={<ThirdPartyCallback />} />
		</Route>
	)
);

const App = () => (
	<MantineProvider>
		<RouterProvider router={router} />
	</MantineProvider>
);

export default App;