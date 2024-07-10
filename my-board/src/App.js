import logo from './logo.svg';
import './App.css';

function App() {
  let posts = 'Sample Sentence';
  return (
    <div className="App">
      <div className='black-nav'>
        <div>Sample</div>
      </div>
      <h4>{ posts }</h4>
    <div className="list">
      <h3>{ posts }</h3>
      <p>2024.7.10</p>
      <hr/>
    </div>
    </div>
  );
}

export default App;