import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './components/Mailbox'
import Mailbox from './components/Mailbox'

function App() {

  return (
  <BrowserRouter>
      <Routes>
            <Route path='/'>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup/>}/>
            </Route>
            <Route  path='/inbox'>
            <Route index element={<Mailbox />} />

            </Route>
      </Routes>  
  </BrowserRouter>
  )
}

export default App
