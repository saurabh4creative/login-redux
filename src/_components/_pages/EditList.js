import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form" 
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom';

function EditList() {
    const API_URL = process.env.REACT_APP__API_BASE_URL;
    const { register, handleSubmit, formState: { errors } , reset } = useForm({ reValidateMode: 'onClick', });
    const errorLength  = Object.keys(errors).length;
    
    const {id} = useParams(); 
    const [ detail, setDetail ] = useState([]);
   

    useEffect(()=>{
        if(errorLength > 0){  
             for(var i in errors){
                 toast.error(errors[i].message);
             }    
        }
    }) 

    useEffect(()=>{
        axios.get(`${API_URL}/contacts/${id}`).then((res)=>{
            if( res.data ){
                setDetail(res.data); 
            }
        }).catch((err)=>{
            toast.error(err.message); 
        })
    }, [id, API_URL]);

    useEffect(()=>{
        reset(detail);
    }, [reset, detail])

    const onSubmit = async (data) => { 
        if( data ){
             const body = {
                 title : data.title,
                 contact_name : data.contact_name,
                 contact_number : data.contact_number, 
             };
             await axios.patch(`${API_URL}/contacts/${id}`, body).then((res)=>{
                  if( res.status ){
                      toast.success('List Added Successfullly'); 
                  }
             }).catch((err)=>{
                  toast.error(err.message); 
             })
        }
    }

    return (
         <> 
             <div className='main-sec pt-5 pb-5'>
                <div className='container'>
                       <div className='row justify-content-center'>
                             <div className='col-lg-4'>
                                   <div className='sec-form'>
                                         <h4>Edit Contact List</h4>

                                         <form className='pt-3' onSubmit={handleSubmit(onSubmit)}> 
                                               <div className="mb-3">
                                                    <label className="form-label">Title</label>
                                                    <input type="text" className="form-control"  
                                                        {...register("title", { required: { value: true, message: "Please Enter the Title..." } })} 
                                                    />
                                               </div>
                                               <div className="mb-3">
                                                    <label className="form-label">Contact Name</label>
                                                    <input type="text" className="form-control" 
                                                        {...register("contact_name", { required: { value: true, message: "Please Enter the Contact Name..." } })} 
                                                    />
                                               </div>
                                               <div className="mb-3">
                                                    <label className="form-label">Contact Number</label>
                                                    <input type="text" className="form-control" 
                                                        {...register("contact_number", { required: { value: true, message: "Please Enter the Contact Number..." } })} 
                                                    />
                                               </div>
                                                
                                               <div className="mb-3"> 
                                                    <button className='btn btn-primary d-block w-100' type='submit'>
                                                          Submit
                                                    </button>
                                               </div>
                                         </form> 
                                   </div>
                             </div>
                       </div>
                </div>
          </div>
          <ToastContainer />
         </>
    )
}

export default EditList
