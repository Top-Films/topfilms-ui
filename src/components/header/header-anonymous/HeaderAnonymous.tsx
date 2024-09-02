import { Button } from '@mantine/core';
import { useAuth } from 'oidc-react';

export default function HeaderAnonymous() {
	const auth = useAuth();

	// Show auth buttons for anonymous users
	return (
		<>
			<Button
				size='xs'
				variant='outline'
				onClick={() => auth.signIn()}
			>
				Sign In
			</Button>
			<Button 
				size='xs'
				onClick={() => auth.signIn()}
			>
				Register
			</Button>
		</>
	);
}