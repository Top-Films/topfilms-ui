import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import Session from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword, { Google, Github, Discord } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import ThirdPartyCallback from './pages/auth/third-party-callback/ThirdPartyCallback';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Root from './pages/root/Root';
import ResetPassword from './pages/auth/reset-password/ResetPassword';

SuperTokens.init({
	appInfo: {
		appName: 'Top Films',
		apiDomain: import.meta.env.AUTHENTICATION_API_URL ?? 'http://localhost:3001',
		websiteDomain: import.meta.env.FRONTEND_URL ?? 'http://localhost:3000'
	},
	recipeList: [
		ThirdPartyEmailPassword.init({
			signInAndUpFeature: {
				providers: [
					Google.init(),
					Github.init(),
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
								console.log(url);
								if (url.startsWith(import.meta.env.PRIMARY_API_URL ?? 'http://localhost:8080')) {
									return true;
								}
							} catch (e) {
								console.error(e);
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
			<Route path='home' element={<Home />} />
			<Route path='auth' element={<Auth />}> 
				<Route path='login' element={<Login />}/>
				<Route path='register' element={<Register />}/>
				<Route path='reset-password' element={<ResetPassword />}/>
				<Route path='callback/:providerId' element={<ThirdPartyCallback />} />
			</Route>
		</Route>
	)
);

const App = () => (
	<SuperTokensWrapper>
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	</SuperTokensWrapper>
);

export default App;