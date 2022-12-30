import './App.css';
import Home from "./homecomponent/Home.jsx"
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Calender from "./homecomponent/Calender.jsx"
import Notes from './homecomponent/Notes';

function App() {
  return (
    <>
      <Router>
              <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/calender' element={<Calender />}></Route>
              <Route exact path='/notes' element={<Notes />}></Route>
              </Routes>
      </Router>
    </>
  );
}

export default App;
