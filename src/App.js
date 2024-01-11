import "./styles.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { useState } from "react";

import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from "./Home";
import Countries from "./Components/Countries"
import Years from "./Components/Years"
import Rankings from "./Components/Rankings"
import Factors from "./Components/Factors"
import Login from "./User/Login";
import Register from "./User/Register"

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  return (
    <BrowserRouter>
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Container fluid className="pt-2">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route 
          path="/Login" 
          element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Countries" element={<Countries/>}/>
          <Route path="/Years" element={<Years/>}/>
          <Route path="/Rankings" element={<Rankings/>}/>
          <Route path="/Factors" element={<Factors/>}/>
        </Routes>
      </Container>
      <Footer/>  
      
    </div>
    </BrowserRouter>
  );
}

export default App;
