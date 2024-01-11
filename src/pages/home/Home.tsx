import axios from 'axios';

export default function Home() {
	const onClick = async () => {
		const data = await axios.get('http://localhost:8080/test');
		console.log(data.status);
		console.log(data.data);
	};

	return (
		<>
			<h1>LOGGED IN!</h1>
			<button onClick={onClick}>CLICK ME FOR API CALL</button>
		</>
	);
}