import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root=ReactDOM.createRoot(document.getElementById('raj'));

root.render(
	<>
		<h1 class="bg-primary p-5">Hi i am from index.js</h1>
		<App/>
	</>
)