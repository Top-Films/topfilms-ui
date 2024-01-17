import axios from 'axios';
import { Environment } from '../../util/Environment';

export default function Home() {
	const testSpring = async () => {
		const res = await axios.get(Environment.apiUrl() + '/test');
		console.log(res.data);
	};
	
	return (
		<>
			<h1>Here</h1>
			<button onClick={testSpring}>CLICK ME FOR SPRING API CALL</button>
		</>
	);
}