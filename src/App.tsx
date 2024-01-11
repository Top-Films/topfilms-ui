import '@mantine/core/styles.css';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { superTokensConfig } from './config/auth-config';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import { MantineProvider } from '@mantine/core';
import GoogleCallback from './pages/callback/google/GoogleCallback';
import Login from './components/login/Login';
import Register from './components/register/Register';

SuperTokens.init(superTokensConfig);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/'>
			<Route path='home' element={<SessionAuth><Home /></SessionAuth>} />
			<Route path='auth' element={<Auth />}> 
				<Route path='login' element={<Login />}/>
				<Route path='register' element={<Register />}/>
			</Route>
			<Route path='auth/callback'>
				<Route path='google' element={<GoogleCallback />}/>
			</Route>
		</Route>
	)
);

const App = () => (
	<MantineProvider>
		<SuperTokensWrapper>
			<RouterProvider router={router} />
		</SuperTokensWrapper>
	</MantineProvider>
);

export default App;