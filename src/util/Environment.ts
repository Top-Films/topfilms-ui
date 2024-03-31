/**
 * Environment variable class that sets variables based on Node Environment
 */
export class Environment {
	// Get auth api url depending on the env
	static authUrl(): string {
		return import.meta.env.PROD 
			? 'https://auth.topfilms.co'
			: 'http://localhost:3001';
	}

	// Get frontend url depending on the env
	static frontendUrl(): string {
		return import.meta.env.PROD 
			? 'https://topfilms.co'
			: 'http://localhost:3000';
	}

	// Get primary api depending on the env
	static apiUrl(): string {
		return import.meta.env.PROD 
			? 'https://api.topfilms.co'
			: 'http://localhost:8080';
	}

	// Enable/Disable strict mode. Note: always false in prododuction
	// Useful for testing third party auth, sometimes API calls are made twice and invalidated in strict mode
	static strictMode(): boolean {
		return false;
	}
}