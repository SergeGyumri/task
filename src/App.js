import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import StartPage from './pages/StartPage'
import Chat from './pages/Chat'
import Admin from "./pages/Admin";
import Login from "./pages/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome"/>}/>
          <Route path="/welcome" element={<StartPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;