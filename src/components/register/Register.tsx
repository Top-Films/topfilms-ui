import { emailPasswordSignUp } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import AuthForm from '../auth-form/AuthForm';

export default function Register() {
	return (
		<AuthForm type={'REGISTER'} headerText='Register' signInOrUp={emailPasswordSignUp} navigateSignInUpRoute='/auth/login' navigateSignInUpText='Already have an account?' />
	);
}
