export class Environment {
	// Get auth api url depending on the env
	static getAuthAPIUrl(): string {
		return import.meta.env.PROD 
			? 'https://auth.topfilms.co'
			: 'http://localhost:3001';
	}

	// Get frontend url depending on the env
	static getFrontendUrl(): string {
		return import.meta.env.PROD 
			? 'https://topfilms.co'
			: 'http://localhost:3000';
	}

	// Get primary api depending on the env
	static getAPIUrl(): string {
		return import.meta.env.PROD 
			? 'https://api.topfilms.co'
			: 'http://localhost:8080';
	}
}