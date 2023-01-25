import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-purple/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Change, Forgot, Login, Register } from "./func/index";
import React from "react";
import {Home, Navbar} from "./pages/index";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

