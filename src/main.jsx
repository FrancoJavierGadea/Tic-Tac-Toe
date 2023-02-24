import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'

import App from './App'
import Background from './components/Background/Background';
import MultiplayerProvider from './components/Multiplayer/MultiplayerProvider';

ReactDOM.createRoot(document.getElementById('root')).render(<>



		<Background style={{minWidth: '100vw', minHeight: '100vh'}}>
			<MultiplayerProvider>

				<App />

			</MultiplayerProvider>
		</Background>




</>)
