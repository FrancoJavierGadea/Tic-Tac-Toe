

import Background from './components/Background/Background';
import TicTacToe from './components/TicTacToe/TicTacToe';
import { MultiplayerContext } from './components/Multiplayer/MultiplayerProvider';
import { useContext } from 'react';



function App() {

	const {isConnected, room, createGame, joinGame, userTurn} = useContext(MultiplayerContext);

	return (<div className="App" style={{display: 'flow-root'}}>

		<div className="bg-light d-flex">
			<div>Room: {room}</div>
			<div>Conectado: {isConnected.toString()}</div>
			<div>Turn: {userTurn}</div>
			<button onClick={() => createGame()}>create room</button>
			<button onClick={() => joinGame('1812')}>join room</button>
		</div>

		<TicTacToe />

	</div>)
}

export default App
