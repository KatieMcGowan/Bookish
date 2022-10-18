import './App.css';
import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./pages/Header";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clubs from './pages/Clubs/Clubs';
import MyClubs from './pages/MyClubs/MyClubs';
import NewClub from "./pages/NewClub/NewClub"
import EditClub from './pages/EditClub/EditClub';
import Nominate from "./pages/Nominate/Nominate"
import Club from './pages/Club/Club';
import Invites from "./pages/Invites/Invites"
import ManageMembers from './pages/ManageMembers/ManageMembers';
// import ProtectedRoutes from './pages/ProtectedRoutes';

const App = () => {
  const [id, setId] = useState()

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Landing/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route path={"/login"} element={<LogIn setId={setId}/>}/>
        <Route path={"/clubs"} element={<Clubs />}/> 
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path={"/home"} element={<Dashboard id={id}/>}/>
          <Route path={"/myclubs"} element={<MyClubs id={id }/>}/>
          <Route path={"/clubs/new"} element={<NewClub id={id}/>}/>
          <Route path={"/:clubid/edit"} element={<EditClub />}/>
          <Route path={"/:clubid/nominate"} element={<Nominate />}/>
          <Route path={"/:clubid"} element={<Club />}/>
          <Route path={"/myinvites"} element={<Invites />}/>
          <Route path={"/:clubid/managemembers"} element={<ManageMembers />}/>
        {/* </Route> */}
        {/* <Route path={"/home"} element={<Dashboard />}/>
        <Route path={"/myclubs"} element={<MyClubs />}/>
        <Route path={"/clubs/new"} element={<NewClub />}/>
        <Route path={"/:clubid/edit"} element={<EditClub />}/>
        <Route path={"/:clubid/nominate"} element={<Nominate />}/>
        <Route path={"/:clubid"} element={<Club />}/>
        <Route path={"/myinvites"} element={<Invites />}/>
        <Route path={"/:clubid/managemembers"} element={<ManageMembers />}/> */}
      </Routes>
    </div>
    );
}

export default App;
