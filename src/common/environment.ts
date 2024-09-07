export class Environment {
	// Get frontend url depending on the env
	static frontendUrl(): string {
		return import.meta.env.PROD 
			? 'https://topfilms.io'
			: 'http://localhost:3000';
	}

	// Get primary api depending on the env
	static apiUrl(): string {
		return import.meta.env.PROD 
			? 'https://api.topfilms.io'
			: 'http://localhost:8080';
	}

	// True if dev environment
	static isDev(): boolean {
		return import.meta.env.DEV;
	}
}