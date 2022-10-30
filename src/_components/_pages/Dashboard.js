import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react' 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Dashboard() {
  const API_URL = process.env.REACT_APP__API_BASE_URL;
  const data = useSelector(state => state.loginReducer);
  const { id } = data.user; 
  const dataFetchedRef = useRef(false);
  const [list, setList] = useState([]);
   
  useEffect(()=>{
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      
      axios.get(`${API_URL}/user/${id}/contacts?_expand=user`).then((res)=>{
            if( res.status === 200 ){
                  // toast.success('List Fetched Successfullly'); 
                  setList(res.data);
            }
            else{
                  toast.error('No Data Found'); 
            }
      }).catch((err)=>{
            toast.error(err.message); 
      });
  }, [id, API_URL]);   
  
  const deleteList = (id) => {
      if(id){ 
          axios.delete(`${API_URL}/contacts/${id}`).then((res)=>{
                if(res.status === 200){
                     const listDelete = list.filter((item)=> item.id !== id);
                     setList(listDelete);         
                     toast.success('Delete Successfully'); 
                }
          }).catch((err)=>{
                toast.error(err.message);
          })
      }
  }
  
  return (
      <div> 
            <div className='main-sec pt-5 pb-5'>
                  <div className='container'>
                        <div className='row justify-content-center'>
                              <div className='col-lg-12'>
                                    <div className='mb-4'> 
                                          <h4>Contact List</h4>
                                    </div>
                                    <div className='data-fetched'>
                                          <table className='table'>
                                                 <tbody>
                                                 {
                                                      list?.map((item)=>{
                                                            const {title, contact_name, contact_number, id} = item;

                                                            return (
                                                                  <tr key={item.id}>
                                                                        <td>{id}</td>
                                                                        <td>{title}</td>
                                                                        <td>{contact_name}</td>
                                                                        <td>{contact_number}</td>
                                                                        <td>
                                                                              <div className='d-flex gap-3'>
                                                                                    <Link onClick={()=>{deleteList(id)}} className='btn btn-danger'>
                                                                                           <i className='fa fa-trash'></i>
                                                                                    </Link>
                                                                                    <Link to={`/editlist/${id}`} className='btn btn-success'>
                                                                                           <i className='fa fa-edit'></i>
                                                                                    </Link>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      })
                                                 }  
                                                 </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>   
            <ToastContainer />
      </div>
  )
}

export default Dashboard
