import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import {Outlet, Route, Routes} from'react-router-dom';
import MainPage from './pages/Mainpage';
import DeatailPage from './pages/Deatil';
import SearchPage from './pages/Search';


const Layout =()=>{
  return(
    <div>
      <Nav/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className='app'> 
      <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path=":movieId" element={<DeatailPage/>}/>
            <Route path='search' element={<SearchPage/>}/>
          </Route>
      </Routes>
   </div>
  );
}

export default App;
