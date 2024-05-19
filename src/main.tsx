import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Environment } from './common/environment.ts';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		{Environment.strictMode()
			? <React.StrictMode><App /></React.StrictMode>
			: <App />
		}
	</>
);