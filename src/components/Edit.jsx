import React, { useEffect, useState } from 'react'
import { getSingleUserAPI, updateUserAPI } from '../ApiServices/allAPI'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Edit() {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        name:"",email:"",phone:""
    })
    const {id} = useParams()
    const getUserData = async() =>{
       const result =  await getSingleUserAPI(id)
       if(result.status==200){
        setValues(result.data)
       }
    }

    const updateUser = async(e)=>{
        e.preventDefault()
        const result = await updateUserAPI(id,values)
        setValues(result.data)
        alert('User Details Updated SuccessFully')
        navigate('/')
    }


    useEffect(()=>{
        getUserData()
    },[])
  return (
    <div className='d-flex align-items-center justify-content-center w-100 vh-100'>
        <div className='container w-50 p-4 card shadow'>
            <form >
                <h1 className='text-center mb-3'>Edit User</h1>
                <div className="mb-3">
                    <input value={values.name} onChange={e=>setValues({...values,name:e.target.value})} type="text" placeholder='name' className='form-control text-black' />
                </div>
    
                <div className="mb-3">
                    <input value={values.email} onChange={e=>setValues({...values,email:e.target.value})} type="email" placeholder='email' className='form-control' />
                </div>
                
                <div className="mb-3">
                    <input value={values.phone} onChange={e=>setValues({...values,phone:e.target.value})} type="text" placeholder='phone' className='form-control' />
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={'/'} className="btn btn-primary">Back</Link>
                    <button onClick={updateUser} className="btn btn-success ms-3">Update</button>
                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default Edit