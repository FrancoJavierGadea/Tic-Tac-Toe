import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Background from './components/Background/Background'
import TicTacToe from './components/TicTacToe/TicTacToe';
import GameStatus from './components/GameStatus/GameStatus';
import MultiplayerProvider from './components/MutiplayerProvider/MultiplayerProvider';
import GameChat from './components/GameChat/GameChat';
import MutiplayerTicTacToe from './components/MultiplayerTicTacToe/MultiplayerTicTacToe';


function App() {

	
	return (<div className="App">
		<Background style={{minWidth: '100vw', minHeight: '100vh'}}>	

			<Container className="p-4">


				{/* <TicTacToe /> */}

				<MultiplayerProvider>
					
					<MutiplayerTicTacToe></MutiplayerTicTacToe>
					
				</MultiplayerProvider>

			</Container>

		</Background>
	</div>)
}

export default App
