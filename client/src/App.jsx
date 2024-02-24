import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/AuthPages/LoginPage'
import SignupPage from './Pages/AuthPages/SignupPage'
import CourseListingPage from './Pages/Course Pages/CourseListingPage'
import CreateCoursePage from './Pages/Course Pages/CreateCoursePage'
import Navbar from './Components/Navbar/Navbar'

export default function App() {

  return (
    <div className="app-div">
      <Navbar />
      <Routes>
        <Route path="/user/login" element={<LoginPage />} />
        <Route path='/user/signup' element={<SignupPage />} />
        <Route path='/explore/courses' element={<CourseListingPage />} />
        <Route path='/courses/add-new' element={<CreateCoursePage />} />
      </Routes>
    </div>
  )
}