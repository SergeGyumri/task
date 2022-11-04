import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import StartPage from './pages/StartPage'
import Chat from './pages/Chat'
import Login from "./pages/login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register"/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/welcome" element={<StartPage/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/*" element={<Navigate to="/register"/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;