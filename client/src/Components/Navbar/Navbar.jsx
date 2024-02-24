import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext"

export default function Navbar() {

  const { user, dispatch } = useUserContext();

  function handleLogout() {
    dispatch({ type: 'logout' })
  }

  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b-[0.5px] border-b-slate-300" >
      <div className="">
        <div className="cursor-pointer text-2xl">
          UpSkill
        </div>
      </div>

      <div className="flex gap-4">

        {user && (
          <>
            {!user?.isStudent ? (
              <Link to="/course/add-new">
                Upload Course
              </Link>
            ) : (
              <Link to="/my-credits">
                My Credits
              </Link>
            )}
            <Link to="/classroom">
              Classroom
            </Link>
          </>
        )}
        {user?._id ? (
          <>
            <div className="cursor-pointer px-2 py-2 border-2 border-slate-500">
              {user.name}
            </div>

            <div className="cursor-pointer px-2 py-2 border-2 border-slate-500" onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link to="/user/login" className="cursor-pointer px-2 py-2 border-2 border-slate-700 text-slate-700 hover:bg-slate-200 duration-100">
              Log In
            </Link>
            <Link to="/user/signup" className="cursor-pointer px-2 py-2 border-2 border-slate-700 bg-slate-700 text-white hover:bg-slate-500">
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}