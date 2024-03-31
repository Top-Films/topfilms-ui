import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import About from './pages/about/About';
import Auth from './pages/auth/Auth';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ResetPassword from './pages/auth/reset-password/ResetPassword';
import ThirdPartyCallback from './pages/auth/third-party-callback/ThirdPartyCallback';
import UserInformation from './pages/auth/user-information/UserInformation';
import Contact from './pages/contact/Contact';
import Discover from './pages/discover/Discover';
import Home from './pages/home/Home';
import Privacy from './pages/privacy/Privacy';
import Root from './pages/root/Root';
import Terms from './pages/terms/Terms';
import { authConfig } from './config/auth-config';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

SuperTokens.init(authConfig);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='home' element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path='discover' element={<Discover />} />
			<Route path='auth' element={<Auth />}> 
				<Route path='login' element={<Login />}/>
				<Route path='register' element={<Register />}/>
				<Route path='reset-password' element={<ResetPassword />}/>
				{/* Protected route so users that are signed in enter account information */}
				<Route path='user-information' element={<SessionAuth><UserInformation /></SessionAuth>}/>
				<Route path='callback/:providerId' element={<ThirdPartyCallback />} />
			</Route>
			<Route path='contact' element={<Contact />} />
			<Route path='privacy' element={<Privacy />} />
			<Route path='terms' element={<Terms />} />
		</Route>
	)
);

export default function App() {
	return (
		<SuperTokensWrapper>
			<MantineProvider defaultColorScheme='dark'>
				<RouterProvider router={router} />
			</MantineProvider>
		</SuperTokensWrapper>
	);
}
