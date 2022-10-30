import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div> 
          <div className='main-sec pt-5 pb-5'>
                <div className='container'>
                       <div className='row justify-content-center'>
                             <div className='col-lg-12'>
                                    <div className='d-flex gap-3'> 
                                        <Link className='btn btn-primary' to={'/login'}>Login</Link> 
                                        <Link className='btn btn-danger' to={'/register'}>Register</Link>
                                        <Link className='btn btn-success' to={'/dashboard'}>DashBoard</Link>
                                        <Link className='btn btn-success' to={'/addlist'}>Add Contact</Link>
                                    </div>
                             </div>
                       </div>
                </div>
          </div>                  
    </div>
  )
}

export default HomePage