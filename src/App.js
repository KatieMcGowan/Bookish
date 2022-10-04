
import React, { useState} from "react"
import { Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./pages/Header";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";

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
      </Routes>
    </div>
    );
}

export default App;
