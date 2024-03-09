import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

// Components
import LoginPage from './Pages/AuthPages/LoginPage'
import SignupPage from './Pages/AuthPages/SignupPage'
import CourseListingPage from './Pages/Course Pages/CourseListingPage'
import CreateCoursePage from './Pages/Course Pages/CreateCoursePage'
import Navbar from './Components/Navbar/Navbar'
import useUserContext from './hooks/useUserContext'
import DisplayCoursePage from './Pages/Course Pages/DisplayCoursePage'
import TeacherClassroom from './Pages/Classroom/TeacherClassroom'
import StudentClassroom from './Pages/Classroom/StudentClassroom'
import MyCourse from './Pages/Course Pages/MyCourse'
import Web from './Components/App Sidebar/app-sidebar'
import HomePage from './Pages/Home Page/HomePage'
import ShowGroups from './Pages/Subgroup Pages/Show-Subgroup'

export default function App() {

  const { user } = useUserContext();
  // const Navigate = useNavigate();

  return (
    <div className="app-div ">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/user/login" element={user ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/user/signup' element={user ? <Navigate to='/' /> : <SignupPage />} />
        <Route path='/home' element={!user ? <Navigate to='/user/login' /> : <Web child={<HomePage />} />} />
        <Route path='/subgroups/:id' element={!user ? <Navigate to='/user/login' /> : <Web child={<ShowGroups />} />} />
        <Route path='/' element={!user ? <Navigate to='/user/login' /> : <Navigate to='/home' />} />

      </Routes>
    </div>
  )
}