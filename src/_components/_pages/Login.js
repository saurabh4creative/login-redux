import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_actions/userAction';
import { Link, useNavigate  } from "react-router-dom";

function Login() {
  const API_URL = process.env.REACT_APP__API_BASE_URL;   
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onClick', });
  const dispatch = useDispatch();
  const userResponse = useSelector(state=>state.loginReducer);
  const errorLength  = Object.keys(errors).length;
  const navigate = useNavigate();  
 
  useEffect(()=>{
       if(errorLength > 0){  
            for(var i in errors){
                toast.error(errors[i].message);
            }    
       }
  })
  
  const onSubmit = async (data) => {  
        dispatch( userActions._loginStart() );
        if( data ){
              await axios.get(`${API_URL}/users?email=${data.email}&password=${data.password}`).then((res)=>{
                   if( res.data.length > 0 ){ 
                          dispatch( userActions._loginSuccess(res.data[0]) );
                          toast.success('User Login Successfully...'); 
                          setTimeout(()=>{
                              navigate('/dashboard');
                          },[3000]);
                   }
                   else{ 
                          dispatch( userActions._loginFailure('User Not Found') );
                   }
              }).catch((err)=>{
                   dispatch( userActions._loginFailure(err.message) );
              }) 
        }   
  }; 

  useEffect(()=>{ 
       if( userResponse.error ){
            toast.error(userResponse.error);
       }  
  },[userResponse]); 
  
  return (
    <div>
          <div className='main-sec pt-5 pb-5'>
                <div className='container'>
                       <div className='row justify-content-center'>
                             <div className='col-lg-4'>
                                   <div className='sec-form'>
                                         <h4>User Login</h4>

                                         <form className='pt-3' onSubmit={handleSubmit(onSubmit)}> 
                                               <div className="mb-3">
                                                    <label className="form-label">Email Address</label>
                                                    <input type="email" className="form-control" 
                                                        {...register("email", { required: { value: true, message: "Please Enter the Email Address..." } })} 
                                                    />
                                               </div>
                                               <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" className="form-control" 
                                                        {...register("password", { required: {value: true, message: "Please Enter the Password..."} })}
                                                    />
                                               </div> 
                                               <div className="mb-3"> 
                                                    <button className='btn btn-primary d-block w-100' type='submit'>
                                                          { userResponse.isLoading ? <>
                                                               <i className="fas fa-circle-notch fa-spin"></i>
                                                          </> : <>
                                                               Submit 
                                                          </> }
                                                    </button>
                                               </div>
                                         </form>

                                         <p className='text-center'>Not Sign Up <Link to={'/register'}>Register</Link></p>
                                   </div>
                             </div>
                       </div>
                </div>
          </div>
          <ToastContainer />
    </div>
  )
}

export default Login
