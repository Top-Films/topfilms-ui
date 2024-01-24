import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function HeaderAnonymous() {
	const navigate = useNavigate();

	// Show auth buttons for anonymous users
	return (
		<>
			<Button
				size='xs'
				variant='outline'
				onClick={() => navigate('/auth/login')}
			>
				Sign In
			</Button>
			<Button 
				size='xs'
				onClick={() => navigate('/auth/register')}
			>
				Register
			</Button>
		</>
	);
}