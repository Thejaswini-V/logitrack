import Login from "./components/Login";
import Register from "./components/Register";
import Ilogin from "./components/Ilogin";
import Dlogin from "./components/Dlogin"
import Current from "./components/Current";
import Add from "./components/Add"
import Update from "./components/Update";
import Dashboard from "./components/Dashboard"
import Delpg from './components/Delpg';
import Pending from './components/pending'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/Register" element={<Register />} />
        <Route path="/Ilogin" element={<Ilogin/>} />
        <Route path="/Dlogin" element={<Dlogin/>} />
        <Route path="/current" element={<Current/>} />
        <Route path="/Add" element={<Add/>} />
        <Route path="/Update" element={<Update/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Delpg" element={<Delpg/>}/>
        <Route path="/Pending" element={<Pending/>}/>
      </Routes>
    </Router>
  );
}

export default App;
