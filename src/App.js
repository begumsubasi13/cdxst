import logo from './logo.svg';
import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './components/HomePage';
function App() {
  return (
    <div className="App">
      <Router>
          <HeaderComponent />   
            <div className="container">
              <Routes>             
                <Route  exact path="/homePage" element= {<HomePage/>} ></Route>                       
              </Routes>              
           </div>
           <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
