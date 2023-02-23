import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Background from './components/Background/Background';
import TicTacToe from './components/TicTacToe/TicTacToe';



function App() {


	return (
		<div className="App">
			<Background style={{minWidth: '100vw', minHeight: '100vh'}}>
			
				<div style={{display: 'flow-root'}}>

					<TicTacToe />
				</div>

			</Background>	
		</div>
	)
}

export default App
