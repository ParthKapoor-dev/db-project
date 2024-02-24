import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './Pages/AuthPages/LoginPage'
import SignupPage from './Pages/AuthPages/SignupPage'
import CourseListingPage from './Pages/Course Pages/CourseListingPage'
import CreateCoursePage from './Pages/Course Pages/CreateCoursePage'
import Navbar from './Components/Navbar/Navbar'
import useUserContext from './hooks/useUserContext'

export default function App() {

  const { user } = useUserContext();
  const Navigate = useNavigate();

  return (
    <div className="app-div">
      <Navbar />
      <Routes>
        {/* <Route path='/' element={!user ? <Navigate to='/user/login' /> : <Navigate to='/explore/courses'/>} /> */}
        <Route path="/user/login" element={user ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/user/signup' element={user ? <Navigate to='/' /> : <SignupPage />} />
        <Route path='/explore/courses' element={!user ? <Navigate to='/user/login' /> : <CourseListingPage />} />
        <Route path='/courses/add-new' element={!user ? <Navigate to='/user/login' /> : <CreateCoursePage />} />
      </Routes>
    </div>
  )
}