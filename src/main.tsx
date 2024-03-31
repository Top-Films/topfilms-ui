import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global.scss';
import { Environment } from './util/Environment.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		{Environment.strictMode()
			? <React.StrictMode><App /></React.StrictMode>
			: <App />
		}
	</>
);