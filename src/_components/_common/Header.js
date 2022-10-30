import React from 'react'
import { Link, useNavigate  } from "react-router-dom"
import { userActions } from '../../_actions/userAction';
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../logo.svg';

function Header() {
  const user = useSelector(state=> state.loginReducer);
  const { isLoggedIn } = user; 
  const { first_name, last_name, email } = user?.user;
  
  // console.log(user);
 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const userLogout = () => {
       dispatch( userActions._logout() ).then(()=>{
            navigate('/login');
       }); 
  }
  
  return (
    <div className='pt-3 pb-3 light-bg'>
         <div className='container'>
               <div className='row justify-content-between align-items-center'>
                    <div className='col'>
                          <div className='xl'>
                               <Link to={'/'}><img width={80} src={logo} className="App-logo" alt="logo" /> Website Name</Link>
                          </div>
                    </div>
                    <div className='col'>
                          { isLoggedIn ? <>
                            <div className='d-flex gap-3 justify-content-end align-items-center'>
                                        <div>
                                            {email && email} - { isLoggedIn && first_name + ' ' + last_name }
                                        </div>
                                        <div>
                                            { isLoggedIn ? <>
                                                <div className='d-flex gap-3'> 
                                                    <button onClick={userLogout} className='btn btn-danger'>Log Out</button>
                                                </div>
                                            </> : <>
                                                <div className='d-flex gap-3'> 
                                                    <Link className='btn btn-primary' to={'/login'}>Login</Link> 
                                                    <Link className='btn btn-danger' to={'/register'}>Register</Link>
                                                </div>
                                            </> }
                                        </div>
                                </div>
                          </> : '' }
                    </div>
               </div>
         </div>
    </div>
  )
}

export default Header
