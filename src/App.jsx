
import TicTacToe from './components/TicTacToe/TicTacToe';
import { MultiplayerContext } from './components/Multiplayer/MultiplayerProvider';
import { useContext } from 'react';
import GameControls from './components/GameControls/GameControls';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Notifications from './components/Nofitications/Notifications';



function App() {

	const {room} = useContext(MultiplayerContext);

	return (<div className="App" style={{display: 'flow-root'}}>
		{
			!room ? <CreateGameForm /> : <>

				<TicTacToe />

				<GameControls />
			</>
		}

		<Notifications />
	</div>)
}

export default App
