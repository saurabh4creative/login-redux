import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../_actions/userAction';
import { Link, useNavigate  } from "react-router-dom";

function Register() {
  const API_URL = process.env.REACT_APP__API_BASE_URL;     
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onClick', });
  const dispatch = useDispatch();
  const userResponse = useSelector(state=>state.registerReducer);
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
        dispatch( userActions._registerStart() );
        if( data ){
              await axios.get(`${API_URL}/users?email=${data.email}`).then((res)=>{
                   if( res.data.length === 0 ){ 
                          axios.post(`${API_URL}/users`, data).then((res)=>{
                              dispatch( userActions._registerSuccess(res.data) );
                              toast.success('User Registered Successfully'); 
                              setTimeout(()=>{
                                    navigate('/login');
                              },[3000]);
                          }).catch((err)=>{
                              dispatch( userActions._registerFailure(err.message) ); 
                          })
                   }
                   else{ 
                          dispatch( userActions._registerFailure('User Already Registered...') );
                   }
              }).catch((err)=>{
                   dispatch( userActions._registerFailure(err.message) );
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
                                         <h4>User Register</h4>

                                         <form className='pt-3' onSubmit={handleSubmit(onSubmit)}>
                                               <div className="mb-3">
                                                    <label className="form-label">First Name</label>
                                                    <input type="text" className="form-control"
                                                        {...register("first_name", { required: { value: true, message: "Please Enter the First Name..." } })}
                                                    />
                                               </div>
                                               <div className="mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" 
                                                        {...register("last_name", { required: { value: true, message: "Please Enter the Last Name..." } })}
                                                    />
                                               </div>
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
                                                    <label className="form-label">Confirm Password</label>
                                                    <input type="password" className="form-control" 
                                                        {...register("confirm_password", { required: {value: true, message: "Please Enter the Confirm Password..."} })}
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
                                         <p className='text-center'>Not Sign Ip <Link to={'/login'}>Sign In</Link></p>
                                   </div>
                             </div>
                       </div>
                </div>
          </div>
          <ToastContainer />
    </div>
  )
}

export default Register
