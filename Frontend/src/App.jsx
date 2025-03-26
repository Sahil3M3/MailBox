import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './components/Mailbox'
import Mailbox from './components/Mailbox'
import Inbox from './pages/Inbox'
import SentMail from './pages/SentMail'
import Message from './pages/Message'

function App() {

  return (
  <BrowserRouter>
      <Routes>
            <Route path='/'>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup/>}/>
            </Route>
            <Route path='/inbox' element={<Mailbox />}>
                <Route index element={<Inbox />} />
                <Route path='sent' element={<SentMail />} />
                <Route path=':id' element={<Message />} />   
                <Route path='sent/:id' element={<Message />} /> 
            </Route>
      </Routes>  
  </BrowserRouter>
  )
}




export default App
