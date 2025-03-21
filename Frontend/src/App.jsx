import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
  <BrowserRouter>
      <Routes>
            <Route path='/'>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup/>}/>
            </Route>
      </Routes>  
  </BrowserRouter>
  )
}

export default App
