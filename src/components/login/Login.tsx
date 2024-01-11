import { emailPasswordSignIn } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import AuthForm from '../auth-form/AuthForm';

export default function Login() {
	return (
		<AuthForm type={'LOGIN'} headerText='Sign In' signInOrUp={emailPasswordSignIn} navigateSignInUpRoute='/auth/register' navigateSignInUpText="Don't have an account?" />
	);
}
