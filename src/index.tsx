import React from 'react';
import ReactDOM from 'react-dom/client';

//	local styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

//	app component
import App from './app';


/*	Render app
/*	*	*	*	*	*	*	*	*	*	*/
ReactDOM.createRoot( document.getElementById('root')! ).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);