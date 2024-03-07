import './App.css'
import { Route, Routes } from 'react-router-dom'
import Edit from './components/Edit'
import View from './components/View'
import Add from './components/Add'
import Home from './components/Home'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/view/:id' element={<View/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/add' element={<Add/>}/>

     </Routes>
    </>
  )
}

export default App
