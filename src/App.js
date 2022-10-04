
import React, { useState} from "react"
import { Route, Routes } from "react-router-dom"
import './App.css';
import Header from "./pages/Header";
import Landing from "./pages/Landing";

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
      </Routes>
    </div>
    );
}

export default App;
