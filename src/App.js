
import './App.css';
import React, { useState} from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./pages/Header";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clubs from './pages/Clubs/Clubs';

const App = () => {
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
    userId: ""
  });

  return (
    <div>
      <Header loggedIn={loggedIn}/>
      <Routes>
        <Route exact path={"/"} element={<Landing/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route path={"/login"} element={<LogIn/>}/>
        <Route path={"/home"} element={<Dashboard />}/>
        <Route path={"/clubs"} element={<Clubs />}/> 
      </Routes>
    </div>
    );
}

export default App;
