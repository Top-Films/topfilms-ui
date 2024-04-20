import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT } from '../../../../constants/constants';
import AuthFormWrapper from '../../auth-form-wrapper/AuthFormWrapper';
import classnames from '../auth-reset-password.module.scss';

// Notify user that the new password has been set
export default function ResetPasswordSuccess() {	
	return (
		<AuthFormWrapper
			formHeader='Reset Password Success!'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<div className={classnames.faIconContainer}>
				<FontAwesomeIcon icon={faCheck} size={'3x'}></FontAwesomeIcon>
			</div>

			<p className={classnames.textCenter}>Your new password has been set.</p>
		</AuthFormWrapper>
	);
}