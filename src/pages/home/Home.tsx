import axios from 'axios';

export default function Home() {
	const testSpring = async () => {
		const res = await axios.get((import.meta.env.PRIMARY_API_URL ?? 'http://localhost:8080') + '/test');
		console.log(res.data);
	};
	
	return (
		<>
			<h1>Here</h1>
			<button onClick={testSpring}>CLICK ME FOR SPRING API CALL</button>
		</>
	);
}