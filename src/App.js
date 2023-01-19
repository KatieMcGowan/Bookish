import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import Clubs from './pages/Clubs/Clubs';
import MyClubs from './pages/MyClubs/MyClubs';
import NewClub from "./pages/NewClub/NewClub";
import EditClub from './pages/EditClub/EditClub';
import Nominate from "./pages/Nominate/Nominate";
import Club from './pages/Club/Club';
import NewBook from './pages/NewBook/NewBook';
import ProtectedRoutes from './pages/ProtectedRoutes';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Landing/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route path={"/login"} element={<LogIn />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path={"/home"} element={<Home />}/>
          <Route path={"/myclubs"} element={<MyClubs />}/>
          <Route path={"/clubs"} element={<Clubs />}/> 
          <Route path={"/clubs/new"} element={<NewClub />}/>
          <Route path={"/clubs/:clubid/edit"} element={<EditClub />}/>
          <Route path={"/clubs/:clubid/nominate"} element={<Nominate />}/>
          <Route path={"/clubs/:clubid/newbook"} element={<NewBook />}/>
          <Route path={"/clubs/:clubid"} element={<Club />}/> 
        </Route>
      </Routes>
    </div>
    );
}

export default App;