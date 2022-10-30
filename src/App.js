import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './_components/_pages/Register';
import Login from './_components/_pages/Login';
import Dashboard from './_components/_pages/Dashboard';
import { useSelector } from 'react-redux';
import PrivateRoute from './_components/_auth/PrivateRoute';
import HomePage from './_components/_pages/HomePage';
import Header from './_components/_common/Header';
import Footer from './_components/_common/Footer';
import AddList from './_components/_pages/AddList';
import EditList from './_components/_pages/EditList';

function App() {
  
  const userResponse = useSelector(state=>state.loginReducer);
  const { isLoggedIn } = userResponse; 
 
  return (
     <>
          <Router>
                <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={ isLoggedIn ? <Navigate to="/dashboard" /> : <Login /> } />  
                        <Route path="/register"  element={ isLoggedIn ? <Navigate to="/dashboard" /> : <Register /> } />
                        <Route path="/dashboard"  element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
                        <Route path="/addlist"  element={ <PrivateRoute><AddList /></PrivateRoute> } />
                        <Route path="/editlist/:id"  element={ <PrivateRoute><EditList /></PrivateRoute> } />
                    </Routes>
                <Footer />
          </Router>
     </>
  );
}

export default App;
