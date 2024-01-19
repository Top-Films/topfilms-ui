import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword, { Google, Discord, Twitter } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Auth from './pages/auth/Auth';
import ThirdPartyCallback from './pages/auth/third-party-callback/ThirdPartyCallback';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Root from './pages/root/Root';
import ResetPassword from './pages/auth/reset-password/ResetPassword';
import { Environment } from './shared/util/Environment';
import About from './pages/about/About';
import Discover from './pages/discover/Discover';
import Privacy from './pages/privacy/Privacy';
import Terms from './pages/terms/Terms';

SuperTokens.init({
	appInfo: {
		appName: 'Top Films',
		apiDomain: Environment.authUrl(),
		websiteDomain: Environment.frontendUrl()
	},
	recipeList: [
		ThirdPartyEmailPassword.init({
			signInAndUpFeature: {
				providers: [
					Google.init(),
					Twitter.init(),
					Discord.init()
				]
			}
		}),
		Session.init({
			tokenTransferMethod: 'header',
			override: {
				// Add interceptor for resource servers
				functions(oI) {
					return {
						...oI,
						shouldDoInterceptionBasedOnUrl(url, apiDomain, sessionTokenBackendDomain) {
							try {
								if (url.startsWith(Environment.apiUrl())) {
									return true;
								}
							} catch (e) {
								console.error(e);
								return false;
							}

							return oI.shouldDoInterceptionBasedOnUrl(url, apiDomain, sessionTokenBackendDomain);
						}
					};
				}
			}
		})
	]
});

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route path='about' element={<About />} />
			<Route path='discover' element={<Discover />} />
			<Route path='auth' element={<Auth />}> 
				<Route path='login' element={<Login />}/>
				<Route path='register' element={<Register />}/>
				<Route path='reset-password' element={<ResetPassword />}/>
				<Route path='callback/:providerId' element={<ThirdPartyCallback />} />
			</Route>
			<Route path='contact' element={<About />} />
			<Route path='privacy' element={<Privacy />} />
			<Route path='terms' element={<Terms />} />
		</Route>
	)
);

export default function App() {
	return (
		<SuperTokensWrapper>
			<MantineProvider>
				<RouterProvider router={router} />
			</MantineProvider>
		</SuperTokensWrapper>
	);
}
