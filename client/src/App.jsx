import logo from './logo.svg'
import './App.css'
import VideoGrid from './components/VideoGrid'
import Stream from './components/Stream'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/videos/:id' element={<Stream />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
