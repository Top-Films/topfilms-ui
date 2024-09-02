import { ApolloError, OperationVariables, QueryResult } from '@apollo/client';
import { UserById } from '../types/auth/User';
import { UNKNOWN_ERROR_MESSAGE } from './constants';
import { TopFilmsError } from './top-films-error';

export class TopFilmsUtil {
	static getAuthErrorMessage(e: unknown): string {
		// Check top films error
		if (e instanceof TopFilmsError) {
			return e.message;
		}

		// Check apollo error
		if (e instanceof ApolloError) {
			return e.message;
		}

		return UNKNOWN_ERROR_MESSAGE;
	}

	static async navigatePostSignInUp(res: QueryResult<UserById, OperationVariables>): Promise<string> {
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