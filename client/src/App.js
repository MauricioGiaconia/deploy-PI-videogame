import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import NewGameForm from './components/NewGameForm/NewGameForm';
import Detail from './components/Detail/Detail';
import Footer from './components/Footer/Footer';
import axios from 'axios';  
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  

  return (
    <div className="App">
      <Nav></Nav>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/videogames' element={<Cards></Cards>} />
          <Route path='/newVideogame' element={<NewGameForm></NewGameForm>} />
          <Route path='/videogames/detail/:id' element={<Detail></Detail>}></Route>
        </Routes>

      <Footer></Footer>
      
      
    </div>
  );
}

export default App;
