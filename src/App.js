import './App.css';
import Home from "./homecomponent/Home.jsx"
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
              <Routes>
              <Route exact path='/' element={<Home />}></Route>
              </Routes>
      </Router>
    </>
  );
}

export default App;
