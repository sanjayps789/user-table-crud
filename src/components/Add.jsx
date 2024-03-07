import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUserDataAPI } from '../ApiServices/allAPI'

function Add() {
  const navigate = useNavigate()
  const [addData,setAddData] = useState({
   name:"",email:"",phone:""
  })
  const setUserAddedData = (e) =>{
    const {value,name} = e.target
    setAddData({...addData,[name]:value})
  }

  const handleAdd = async(e)=>{
    e.preventDefault()
    const {name,email,phone} = addData
    if(!name || !email || !phone){
      alert("please fill the form completely")
    }else{
      const result = await addUserDataAPI(addData)
      if(result.status>=200 && result.status<300){
        alert("User data Added Successfully")
        navigate("/")
      }
    // console.log(result);
    }
    
  }
  console.log(addData);
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
      <div className='container w-50 p-4 card shadow'>
            <form >
                <h1 className='text-center mb-3'>Edit User</h1>
                <div className="mb-3">
                    <input name='name' onChange={e=>setUserAddedData(e)}  type="text" placeholder='name' className='form-control text-black' />
                </div>
    
                <div className="mb-3">
                    <input name='email' onChange={e=>setUserAddedData(e)}  type="email" placeholder='email' className='form-control' />
                </div>
                
                <div className="mb-3">
                    <input name='phone' onChange={e=>setUserAddedData(e)} type="text" placeholder='phone' className='form-control' />
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={'/'} className="btn btn-primary">Back</Link>
                    <button onClick={(e)=>handleAdd(e)} className="btn btn-success ms-3">Add</button>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default Add