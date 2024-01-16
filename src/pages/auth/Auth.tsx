import classnames from './auth.module.scss';
import AuthFormWrapper from '../../components/auth-form-wrapper/AuthFormWrapper';
import { useState } from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import RegisterForm from '../../components/register-form/Register';

export default function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<div className={classnames.container}>
			<AuthFormWrapper
				formHeader={isLogin ? 'Sign In' : 'Register'}
				setIsLoading={setIsLoading}
				isLoading={isLoading}
				setErrorMessage={setErrorMessage}
				errorMessage={errorMessage}
				setIsLogin={setIsLogin}
				isLogin={isLogin}
				loginOrRegisterText={isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
			>
				{isLogin 
					? <LoginForm setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />
					: <RegisterForm setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />
				}
			</AuthFormWrapper>
		</div>
	);
}