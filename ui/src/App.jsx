import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import HomePage from './components/Home'
import Login from './components/Login'
import Chats from './components/chats/Chats'
import "./App.css" 
import Chat from './components/chats/Chat'
import SignUp from './components/SignUp'
import Forgot from './components/Forgot'
import ResetPassword from './components/ResetPassword'
import NewTrip from './components/trips/NewTrip'
import UpdateTrip from './components/trips/UpdateTrip'
import SocketProvider from './SocketProvider'
import TripList from './components/TripList'
import Profile from './components/Profile'
import VisitedView from './components/visitedView/VisitedView'



const App = () => {
  
    return (
      <Router>
         
           <Routes>
               <Route path='/' element={<HomePage/>}/>
               <Route path='/login' element={<Login/>}/>
               <Route path='/signup' element={<SignUp/>}/>
               <Route path='/forgot' element={<Forgot/>}/>
               <Route path='/new_trip' element={<NewTrip/>}/>
               <Route path='/profile' element={<Profile/>}/>
               <Route path='/trips' element={<TripList/>}/>
               <Route path='/trip-view/:id' element={<VisitedView/>}/>
               <Route path='/update_trip/:id' element={<UpdateTrip/>}/>
               <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
               <Route path='/chats' element={<Chats/>}/>
               <Route path='/chats/:id' element={ <SocketProvider> <Chat/> </SocketProvider>}/>
           </Routes>
           
      </Router>
    )
} 

export default App 