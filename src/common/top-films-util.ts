import { OperationVariables, QueryResult } from '@apollo/client';
import { EmailVerificationClaim } from 'supertokens-auth-react/recipe/emailverification';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { isEmailVerified } from 'supertokens-web-js/recipe/emailverification';
import { UserById } from '../types/auth/User';
import { UNKNOWN_ERROR_MESSAGE } from './constants';
import { TopFilmsError } from './top-films-error';

export class TopFilmsUtil {
	static getAuthErrorMessage(e: unknown): string {
		// Check super tokens error
		if (e instanceof Error && STGeneralError.isThisError(e)) {
			return e.message;
		}

		// Check top films error
		if (e instanceof TopFilmsError) {
			return e.message;
		}

		return UNKNOWN_ERROR_MESSAGE;
	}

	static async navigatePostSignInUp(res: QueryResult<UserById, OperationVariables>): Promise<string> {
		console.log('Is Email Verified isVerified()');
		console.log(EmailVerificationClaim.validators.isVerified());
		console.log('Is Email Verified isTrue()');
		console.log(EmailVerificationClaim.validators.isTrue());
		console.log('Is Email Verified isFalse()');
		console.log(EmailVerificationClaim.validators.isFalse());
		console.log('isEmailVerified()');
		console.log(await isEmailVerified());
		
		if (!await isEmailVerified()) {
			return '/auth/verify-email';
		}

		// Check for general error with response
		if (res.error) {
			return '/auth/login?error=metadata';
		}

		// Check if user metadata is present
		if (!res.data?.userById?.username || !res.data?.userById?.firstName || !res.data?.userById?.lastName) {
			return '/auth/user-information';
		}

		return '/home';
	}
}