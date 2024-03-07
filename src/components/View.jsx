import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleUserAPI } from '../ApiServices/allAPI'

function View() {
    const {id} = useParams()
    const [user,setUser] = useState({})
    const fetchUserData = async() =>{
      const result =await  getSingleUserAPI(id)
      if(result.status==200){
        setUser(result.data);
      }
      else{
        console.log(result.response);
      }
    } 
    useEffect(()=>{
        fetchUserData()
    },[])
    console.log(user);
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className="card shadow  p-4">
            <h5>Name : {user?.name}</h5>
            <h5>Email : {user?.email}</h5>
            <h5>Phone : {user?.phone}</h5>
            <div className="d-flex justify-content-center">
                <Link to={'/'} className='btn btn-success me-3'>Back</Link>
                <Link to={`/edit/${user?.id}`} className="btn btn-warning">Edit</Link>
            </div>
        </div>
    </div>
  )
}

export default View