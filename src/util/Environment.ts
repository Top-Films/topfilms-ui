export class Environment {
	static getAuthAPIUrl(): string {
		return import.meta.env.PROD 
			? 'https://auth.topfilms.co'
			: 'http://localhost:3001';
	}

	static getFrontendUrl(): string {
		return import.meta.env.PROD 
			? 'https://topfilms.co'
			: 'http://localhost:3000';
	}

	static getAPIUrl(): string {
		return import.meta.env.PROD 
			? 'https://api.topfilms.co'
			: 'http://localhost:8080';
	}
}