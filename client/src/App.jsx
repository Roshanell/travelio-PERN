import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListTravels from "./components/ListTravels";

function App() {
	return (
		<div className="App">
			<MyNavBar />
			<ListTravels />
		</div>
	);
}

export default App;
