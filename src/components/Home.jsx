import React, { useEffect, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'
import { getAllAPI, removeUserAPI } from '../ApiServices/allAPI'
import { Link } from 'react-router-dom'

function Home() {
  const [currentPage,setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const getALLData = async () => {
    const result = await getAllAPI()
    if (result.status==200) {
      setData(result.data)
    } else {
      console.log(result.response.data);
    }
  }
  useEffect(() => {
    getALLData()
  }, [])

  const handleDelete = async(id) =>{
    const confirm = window.confirm("Would you like to delete?")
    if(confirm){
      const result = await removeUserAPI(id)
      if(result.status==200){
      getALLData()
      }else{
        console.log(result.response.data);
      }
    }
    
  }
  console.log(data);
// sort By Name
  const handleSortByName = async() =>{
    const result = await getAllAPI()
    const sortedNameArray = result.data.sort((a,b)=>a.name.localeCompare(b.name))
    setData(sortedNameArray)
  }

  const handleSortById = async() =>{
    const result = await getAllAPI()
    const sortedIdArray = result.data.sort((a,b)=>a.id-b.id)
    setData(sortedIdArray)
  }

  const handleSearch = async(e) =>{
    setSearchKey(e.target.value)
    const result = await getAllAPI()
    const searchResult = result.data.filter(i=>i.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setData(searchResult)
  }

  // pagination
  const productsPerPage = 5;
  const lastIndex = currentPage * productsPerPage
  const firstIndex = lastIndex - productsPerPage
  const visibleproductsPerPage = data.slice(firstIndex,lastIndex)
  const totalPages = Math.ceil(data.length/productsPerPage)

  const handleNext = () =>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const handlePrev = () =>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }
  return (
    <div style={{minHeight:'100vh',minWidth:'100%'}}  className=' d-flex align-items-center justify-content-center flex-column py-5'>
      <div className="shadow p-3">
        <div className='container'>
         <div className='row'>
          <div className='col-lg-12'>
              <div  className="d-flex align-items-center my-2">
                <input value={searchKey} onChange={handleSearch} type="text" className='form-control me-2' placeholder='Search by Name' />
                <Link className='btn btn-sm btn-info me-2 py-1 px-4' to={'/add'}>Add +</Link>
                {/* <button onClick={handleSort} className="btn btn-sm btn-danger">SortByName</button> */}
      
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item>
                <button onClick={handleSortByName} className='btn btn-light'>SortByName</button>
                </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={handleSortById} className='btn btn-light'>SortById</button>
                </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
              </div>
              <Table responsive="md" striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th> Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ?
                    visibleproductsPerPage.map((user,index) => (
                      <tr key={index}>
                        <td>{user?.id}</td>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.phone}</td>
                        <td>
                          <Link to={`/view/${user?.id}`} className='btn btn-sm btn-success me-2'>View</Link>
                          <Link to={`/edit/${user?.id}`} className='btn btn-sm btn-warning me-2'>Edit</Link>
                          <button onClick={e=>handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                      </tr>
                    )) : <h1>Nothing to display</h1>
                  }
                </tbody>
               
              </Table>
              <div className="d-flex align-items-center justify-content-center mt-3 w-100">
           <button onClick={handlePrev} className="btn btn-sm btn-outline-dark">Prev</button>
           <span>{currentPage} of {totalPages}</span>
           <button onClick={handleNext} className="btn btn-sm btn-outline-dark">Next</button>
      
         </div>
          </div>
         </div>
        </div>
      </div>
    </div>
     
  )
}

export default Home