import React, {Component} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import StartPage from './pages/StartPage'
import Chat from './pages/Chat'
import Login from "./pages/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/welcome" element={<StartPage/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/*" element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;