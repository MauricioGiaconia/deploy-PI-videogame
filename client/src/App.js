import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import NewGameForm from './components/NewGameForm/NewGameForm';
import Detail from './components/Detail/Detail';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from './redux/actions';
import axios from 'axios';  
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
      if (genres.length <= 0){
          dispatch(getGenres());
      }
  }, []);

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
