import './App.css';
import Columns from './components/Columns';

function App() {
  return (
    <div className="App">
      <Columns state={"Planned"} />
      <Columns state={"ongoing"} />
      <Columns state={"Done"} />
    </div>
  );
}

export default App;
