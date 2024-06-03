import { OperationVariables, QueryResult } from '@apollo/client';
import { isEmailVerified } from 'supertokens-auth-react/recipe/emailverification';
import STGeneralError from 'supertokens-web-js/lib/build/error';
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
		const isEmailVerifiedRes = await isEmailVerified();
		if (!isEmailVerifiedRes.isVerified) {
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