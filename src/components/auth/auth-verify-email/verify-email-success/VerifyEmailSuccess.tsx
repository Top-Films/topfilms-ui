import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthFormWrapper } from '../..';
import { RESET_PASSWORD_LOGIN_REDIRECT_TEXT } from '../../../../common/constants';
import classnames from '../verify-email.module.scss';

export default function VerifyEmailSuccess() {
	return (
		<AuthFormWrapper
			formHeader='Email Verification Success!'
			isLoading={false}
			errorMessage={''}
			loginOrRegisterText={RESET_PASSWORD_LOGIN_REDIRECT_TEXT}
			loginOrRegisterPath='/auth/login'
			enableThirdParty={false}
		>
			<div className={classnames.faIconContainer}>
				<FontAwesomeIcon icon={faCheck} size={'3x'}></FontAwesomeIcon>
			</div>

			<p className={classnames.textCenter}>Your email has been verified</p>
		</AuthFormWrapper>
	);
}